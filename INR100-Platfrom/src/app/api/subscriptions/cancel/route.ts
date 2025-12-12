import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId, subscriptionId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Cancel user's active subscription
    const subscription = await db.subscription.updateMany({
      where: {
        userId: userId,
        status: "ACTIVE",
        ...(subscriptionId && { id: subscriptionId }),
      },
      data: {
        status: "CANCELLED",
        autoRenew: false,
      },
    });

    if (subscription.count === 0) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    // Update user's subscription tier to BASIC
    await db.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: "BASIC",
        subscriptionExpiresAt: null,
      },
    });

    return NextResponse.json({
      message: "Subscription cancelled successfully",
    });

  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}