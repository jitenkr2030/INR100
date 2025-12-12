import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

interface AffiliateLinkRequest {
  partnerId: string;
  userId?: string;
  type: "DEMAT_ACCOUNT" | "CREDIT_CARD" | "INSURANCE" | "EDUCATIONAL_COURSE";
  commission: number;
  targetUrl: string;
  description?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const partnerId = searchParams.get("partnerId");
    const type = searchParams.get("type");
    const code = searchParams.get("code");

    const where: any = {};
    if (userId) where.userId = userId;
    if (partnerId) where.partnerId = partnerId;
    if (type) where.type = type;
    if (code) where.code = code;

    const affiliateLinks = await db.affiliateLink.findMany({
      where,
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        clickEvents: {
          select: {
            id: true,
            createdAt: true,
            converted: true,
            commission: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      affiliateLinks,
      filters: {
        userId,
        partnerId,
        type,
        code,
      },
    });

  } catch (error) {
    console.error("Get affiliate links error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AffiliateLinkRequest = await request.json();
    const { partnerId, userId, type, commission, targetUrl, description } = body;

    if (!partnerId || !type || !commission || !targetUrl) {
      return NextResponse.json(
        { error: "Partner ID, type, commission, and target URL are required" },
        { status: 400 }
      );
    }

    // Validate partner exists
    const partner = await db.partner.findUnique({
      where: { id: partnerId },
    });

    if (!partner || !partner.isActive) {
      return NextResponse.json(
        { error: "Partner not found or inactive" },
        { status: 404 }
      );
    }

    // Generate unique affiliate code
    const code = generateAffiliateCode(type, partner.name);

    // Create affiliate link
    const affiliateLink = await db.affiliateLink.create({
      data: {
        partnerId,
        userId,
        code,
        url: targetUrl,
        type,
        commission,
        description,
      },
    });

    return NextResponse.json({
      message: "Affiliate link created successfully",
      affiliateLink: {
        id: affiliateLink.id,
        code: affiliateLink.code,
        url: affiliateLink.url,
        type: affiliateLink.type,
        commission: affiliateLink.commission,
        clickCount: affiliateLink.clickCount,
        conversions: affiliateLink.conversions,
      },
    });

  } catch (error) {
    console.error("Create affiliate link error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkId, isActive, commission } = body;

    if (!linkId) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (isActive !== undefined) updateData.isActive = isActive;
    if (commission !== undefined) updateData.commission = commission;

    const affiliateLink = await db.affiliateLink.update({
      where: { id: linkId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Affiliate link updated successfully",
      affiliateLink: {
        id: affiliateLink.id,
        isActive: affiliateLink.isActive,
        commission: affiliateLink.commission,
      },
    });

  } catch (error) {
    console.error("Update affiliate link error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Track affiliate clicks
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, userId, ipAddress, userAgent } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Affiliate code is required" },
        { status: 400 }
      );
    }

    // Find affiliate link
    const affiliateLink = await db.affiliateLink.findUnique({
      where: { code },
    });

    if (!affiliateLink || !affiliateLink.isActive) {
      return NextResponse.json(
        { error: "Affiliate link not found or inactive" },
        { status: 404 }
      );
    }

    // Record click event
    const clickEvent = await db.affiliateClick.create({
      data: {
        linkId: affiliateLink.id,
        userId,
        ipAddress,
        userAgent,
      },
    });

    // Update click count
    await db.affiliateLink.update({
      where: { id: affiliateLink.id },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Click tracked successfully",
      clickEvent: {
        id: clickEvent.id,
        linkId: affiliateLink.id,
        targetUrl: affiliateLink.url,
      },
    });

  } catch (error) {
    console.error("Track affiliate click error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateAffiliateCode(type: string, partnerName: string): string {
  const prefix = type.substring(0, 3).toUpperCase();
  const partnerShort = partnerName.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${partnerShort}${random}`;
}