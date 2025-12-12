import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PurchaseRequest {
  userId: string;
  contentId: string;
  paymentMethodId?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const contentId = searchParams.get("contentId");
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const where: any = { userId };
    if (contentId) where.contentId = contentId;
    if (status) where.status = status;

    const purchases = await db.premiumContentPurchase.findMany({
      where,
      include: {
        content: {
          select: {
            id: true,
            title: true,
            type: true,
            description: true,
            price: true,
            instructor: true,
            duration: true,
          },
        },
      },
      orderBy: {
        purchasedAt: "desc",
      },
    });

    // Calculate total spent
    const totalSpent = purchases
      .filter(p => p.status === "COMPLETED")
      .reduce((sum, p) => sum + p.amount, 0);

    // Group by content type
    const byType = purchases.reduce((acc, purchase) => {
      const type = purchase.content.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(purchase);
      return acc;
    }, {} as Record<string, typeof purchases>);

    return NextResponse.json({
      purchases,
      totalSpent,
      byType,
      filters: {
        userId,
        contentId,
        status,
      },
    });

  } catch (error) {
    console.error("Get purchases error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PurchaseRequest = await request.json();
    const { userId, contentId, paymentMethodId } = body;

    if (!userId || !contentId) {
      return NextResponse.json(
        { error: "User ID and content ID are required" },
        { status: 400 }
      );
    }

    // Get content details
    const content = await db.premiumContent.findUnique({
      where: { id: contentId },
    });

    if (!content || !content.isActive) {
      return NextResponse.json(
        { error: "Content not found or inactive" },
        { status: 404 }
      );
    }

    // Check if user already purchased this content
    const existingPurchase = await db.premiumContentPurchase.findFirst({
      where: {
        userId,
        contentId,
        status: "COMPLETED",
        ...(content.type !== "WEBINAR" && {
          expiresAt: {
            gte: new Date(),
          },
        }),
      },
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You have already purchased this content" },
        { status: 400 }
      );
    }

    // Calculate expiration date
    let expiresAt: Date | undefined;
    const now = new Date();
    
    switch (content.type) {
      case "COURSE":
        expiresAt = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()); // 1 year access
        break;
      case "WEBINAR":
        // Webinars typically don't expire or have short access period
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        break;
      case "CERTIFICATION":
        expiresAt = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()); // 2 years access
        break;
      case "RESEARCH_REPORT":
        expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
        break;
    }

    // Create purchase record
    const purchase = await db.premiumContentPurchase.create({
      data: {
        userId,
        contentId,
        amount: content.price,
        currency: "INR",
        status: "COMPLETED", // In real app, this would be PENDING until payment confirmation
        purchasedAt: now,
        expiresAt,
      },
    });

    // Create fee record
    await db.fee.create({
      data: {
        userId,
        type: "PREMIUM_FEATURE",
        amount: content.price,
        currency: "INR",
        description: `Purchase of ${content.title} (${content.type})`,
        reference: purchase.id,
        status: "PAID",
      },
    });

    return NextResponse.json({
      message: "Content purchased successfully",
      purchase: {
        id: purchase.id,
        contentId: purchase.contentId,
        amount: purchase.amount,
        status: purchase.status,
        purchasedAt: purchase.purchasedAt,
        expiresAt: purchase.expiresAt,
        content: {
          title: content.title,
          type: content.type,
          description: content.description,
        },
      },
    });

  } catch (error) {
    console.error("Purchase content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { purchaseId, status } = body;

    if (!purchaseId || !status) {
      return NextResponse.json(
        { error: "Purchase ID and status are required" },
        { status: 400 }
      );
    }

    const purchase = await db.premiumContentPurchase.update({
      where: { id: purchaseId },
      data: { status },
    });

    return NextResponse.json({
      message: "Purchase status updated successfully",
      purchase: {
        id: purchase.id,
        status: purchase.status,
      },
    });

  } catch (error) {
    console.error("Update purchase error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Check if user has access to specific content
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const contentId = searchParams.get("contentId");

    if (!userId || !contentId) {
      return NextResponse.json(
        { error: "User ID and content ID are required" },
        { status: 400 }
      );
    }

    const purchase = await db.premiumContentPurchase.findFirst({
      where: {
        userId,
        contentId,
        status: "COMPLETED",
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
      },
    });

    const hasAccess = !!purchase;

    return NextResponse.json({
      hasAccess,
      purchase: hasAccess ? {
        id: purchase.id,
        purchasedAt: purchase.purchasedAt,
        expiresAt: purchase.expiresAt,
      } : null,
    });

  } catch (error) {
    console.error("Check access error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}