import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface AdvertisementRequest {
  title: string;
  description?: string;
  imageUrl?: string;
  targetUrl: string;
  type: "FUND_PROMOTION" | "EDUCATIONAL_CONTENT" | "TOOL_SPONSORSHIP" | "BRAND_AWARENESS";
  position: "HOME_BANNER" | "DASHBOARD_SIDEBAR" | "INVESTMENT_PAGE" | "LEARNING_SECTION" | "COMMUNITY_FEED";
  startDate: string;
  endDate: string;
  budget: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get("position");
    const type = searchParams.get("type");
    const isActive = searchParams.get("isActive");

    const where: any = {};
    if (position) where.position = position;
    if (type) where.type = type;
    if (isActive !== null) where.isActive = isActive === "true";

    // Get current date for filtering active ads
    const now = new Date();
    if (isActive === "true") {
      where.startDate = { lte: now };
      where.endDate = { gte: now };
    }

    const advertisements = await db.advertisement.findMany({
      where,
      orderBy: [
        { createdAt: "desc" },
        { budget: "desc" },
      ],
    });

    // Calculate performance metrics for each ad
    const adsWithMetrics = await Promise.all(
      advertisements.map(async (ad) => {
        const ctr = ad.clicks > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
        const cpc = ad.clicks > 0 ? ad.spent / ad.clicks : 0;
        const budgetUtilization = ad.budget > 0 ? (ad.spent / ad.budget) * 100 : 0;
        
        return {
          ...ad,
          metrics: {
            ctr: Math.round(ctr * 100) / 100,
            cpc: Math.round(cpc * 100) / 100,
            budgetUtilization: Math.round(budgetUtilization * 100) / 100,
            remainingBudget: Math.max(0, ad.budget - ad.spent),
          },
        };
      })
    );

    // Group by position
    const byPosition = advertisements.reduce((acc, ad) => {
      if (!acc[ad.position]) acc[ad.position] = [];
      acc[ad.position].push(ad);
      return acc;
    }, {} as Record<string, typeof advertisements>);

    // Group by type
    const byType = advertisements.reduce((acc, ad) => {
      if (!acc[ad.type]) acc[ad.type] = [];
      acc[ad.type].push(ad);
      return acc;
    }, {} as Record<string, typeof advertisements>);

    return NextResponse.json({
      advertisements: adsWithMetrics,
      byPosition,
      byType,
      filters: {
        position,
        type,
        isActive,
      },
    });

  } catch (error) {
    console.error("Get advertisements error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AdvertisementRequest = await request.json();
    const { 
      title, 
      description, 
      imageUrl, 
      targetUrl, 
      type, 
      position, 
      startDate, 
      endDate, 
      budget 
    } = body;

    if (!title || !targetUrl || !type || !position || !startDate || !endDate || !budget) {
      return NextResponse.json(
        { error: "Title, target URL, type, position, dates, and budget are required" },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 }
      );
    }

    // Create advertisement
    const advertisement = await db.advertisement.create({
      data: {
        title,
        description,
        imageUrl,
        targetUrl,
        type,
        position,
        startDate: start,
        endDate: end,
        budget,
        spent: 0,
        clicks: 0,
        impressions: 0,
      },
    });

    return NextResponse.json({
      message: "Advertisement created successfully",
      advertisement: {
        id: advertisement.id,
        title: advertisement.title,
        type: advertisement.type,
        position: advertisement.position,
        budget: advertisement.budget,
        startDate: advertisement.startDate,
        endDate: advertisement.endDate,
        status: "ACTIVE",
      },
    });

  } catch (error) {
    console.error("Create advertisement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { adId, ...updateData } = body;

    if (!adId) {
      return NextResponse.json(
        { error: "Advertisement ID is required" },
        { status: 400 }
      );
    }

    // Handle date conversion
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const advertisement = await db.advertisement.update({
      where: { id: adId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Advertisement updated successfully",
      advertisement,
    });

  } catch (error) {
    console.error("Update advertisement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adId = searchParams.get("adId");

    if (!adId) {
      return NextResponse.json(
        { error: "Advertisement ID is required" },
        { status: 400 }
      );
    }

    await db.advertisement.delete({
      where: { id: adId },
    });

    return NextResponse.json({
      message: "Advertisement deleted successfully",
    });

  } catch (error) {
    console.error("Delete advertisement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Track ad impressions
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { adId, userId, ipAddress } = body;

    if (!adId) {
      return NextResponse.json(
        { error: "Advertisement ID is required" },
        { status: 400 }
      );
    }

    // Check if ad exists and is active
    const ad = await db.advertisement.findUnique({
      where: { id: adId },
    });

    if (!ad || !ad.isActive) {
      return NextResponse.json(
        { error: "Advertisement not found or inactive" },
        { status: 404 }
      );
    }

    // Check if ad is within date range
    const now = new Date();
    if (now < ad.startDate || now > ad.endDate) {
      return NextResponse.json(
        { error: "Advertisement is not currently active" },
        { status: 400 }
      );
    }

    // Check budget
    if (ad.spent >= ad.budget) {
      return NextResponse.json(
        { error: "Advertisement budget exhausted" },
        { status: 400 }
      );
    }

    // Update impression count
    await db.advertisement.update({
      where: { id: adId },
      data: {
        impressions: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Impression tracked successfully",
    });

  } catch (error) {
    console.error("Track impression error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}