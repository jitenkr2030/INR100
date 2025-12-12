import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Premium features configuration
const PREMIUM_FEATURES = [
  {
    type: "AI_ADVISOR",
    name: "AI Portfolio Advisor",
    description: "Get personalized investment recommendations from our AI engine",
    price: 199,
    billingCycle: "MONTHLY" as const,
    category: "AI Services",
  },
  {
    type: "MARKET_PREDICTIONS",
    name: "Market Predictions",
    description: "Access advanced market trend analysis and predictions",
    price: 99,
    billingCycle: "MONTHLY" as const,
    category: "AI Services",
  },
  {
    type: "RISK_ANALYSIS",
    name: "Risk Analysis Reports",
    description: "Comprehensive risk assessment and mitigation strategies",
    price: 149,
    billingCycle: "MONTHLY" as const,
    category: "Analytics",
  },
  {
    type: "TAX_OPTIMIZATION",
    name: "Tax Optimization",
    description: "AI-powered tax optimization strategies for your investments",
    price: 299,
    billingCycle: "ANNUAL" as const,
    category: "Financial Planning",
  },
  {
    type: "API_ACCESS",
    name: "API Access",
    description: "Full API access for developers and institutional users",
    price: 1999,
    billingCycle: "MONTHLY" as const,
    category: "Developer Tools",
  },
  {
    type: "ADVANCED_ANALYTICS",
    name: "Advanced Analytics",
    description: "Deep dive analytics with custom reports and insights",
    price: 299,
    billingCycle: "MONTHLY" as const,
    category: "Analytics",
  },
  {
    type: "PRIORITY_SUPPORT",
    name: "Priority Support",
    description: "24/7 priority customer support with dedicated account manager",
    price: 99,
    billingCycle: "MONTHLY" as const,
    category: "Support",
  },
  {
    type: "EXPERT_SESSIONS",
    name: "Expert Sessions",
    description: "1-on-1 sessions with investment experts and advisors",
    price: 999,
    billingCycle: "MONTHLY" as const,
    category: "Advisory",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get user's current premium features
    const userFeatures = await db.userPremiumFeature.findMany({
      where: {
        userId,
        status: "ACTIVE",
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        feature: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            billingCycle: true,
          },
        },
      },
    });

    // Get available premium features
    const availableFeatures = await db.premiumFeature.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    // Check which features are already included in user's subscription
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true },
    });

    const includedFeatures = getIncludedFeatures(user?.subscriptionTier || "BASIC");

    return NextResponse.json({
      currentFeatures: userFeatures,
      availableFeatures,
      includedFeatures,
      allFeatures: PREMIUM_FEATURES,
    });

  } catch (error) {
    console.error("Get premium features error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, featureId, paymentMethodId } = await request.json();

    if (!userId || !featureId) {
      return NextResponse.json(
        { error: "User ID and feature ID are required" },
        { status: 400 }
      );
    }

    // Get feature details
    const feature = await db.premiumFeature.findUnique({
      where: { id: featureId },
    });

    if (!feature || !feature.isActive) {
      return NextResponse.json(
        { error: "Feature not found or inactive" },
        { status: 404 }
      );
    }

    // Check if user already has this feature
    const existingFeature = await db.userPremiumFeature.findFirst({
      where: {
        userId,
        featureId,
        status: "ACTIVE",
        endDate: {
          gte: new Date(),
        },
      },
    });

    if (existingFeature) {
      return NextResponse.json(
        { error: "You already have this feature" },
        { status: 400 }
      );
    }

    // Check if feature is included in user's subscription
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true },
    });

    const includedFeatures = getIncludedFeatures(user?.subscriptionTier || "BASIC");
    if (includedFeatures.includes(feature.type)) {
      return NextResponse.json(
        { error: "This feature is already included in your subscription" },
        { status: 400 }
      );
    }

    // Calculate end date based on billing cycle
    const startDate = new Date();
    const endDate = new Date();
    
    switch (feature.billingCycle) {
      case "MONTHLY":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case "QUARTERLY":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "ANNUAL":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case "ONE_TIME":
        endDate.setFullYear(endDate.getFullYear() + 1); // 1 year access for one-time purchases
        break;
    }

    // Create user premium feature
    const userFeature = await db.userPremiumFeature.create({
      data: {
        userId,
        featureId,
        status: "ACTIVE",
        startDate,
        endDate,
      },
    });

    // Create fee record
    await db.fee.create({
      data: {
        userId,
        type: "PREMIUM_FEATURE",
        amount: feature.price,
        currency: "INR",
        description: `${feature.name} - ${feature.billingCycle}`,
        reference: userFeature.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      message: "Premium feature activated successfully",
      feature: {
        ...userFeature,
        featureDetails: feature,
      },
    });

  } catch (error) {
    console.error("Purchase premium feature error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const featureId = searchParams.get("featureId");

    if (!userId || !featureId) {
      return NextResponse.json(
        { error: "User ID and feature ID are required" },
        { status: 400 }
      );
    }

    // Cancel the premium feature
    const result = await db.userPremiumFeature.updateMany({
      where: {
        userId,
        featureId,
        status: "ACTIVE",
      },
      data: {
        status: "CANCELLED",
        endDate: new Date(),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Active feature not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Premium feature cancelled successfully",
    });

  } catch (error) {
    console.error("Cancel premium feature error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getIncludedFeatures(subscriptionTier: string): string[] {
  switch (subscriptionTier) {
    case "BASIC":
      return [];
    case "PREMIUM":
      return ["ADVANCED_ANALYTICS", "PRIORITY_SUPPORT"];
    case "PROFESSIONAL":
      return [
        "AI_ADVISOR",
        "MARKET_PREDICTIONS", 
        "RISK_ANALYSIS",
        "ADVANCED_ANALYTICS",
        "PRIORITY_SUPPORT",
        "API_ACCESS",
      ];
    default:
      return [];
  }
}