import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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

    // Get user's current subscription
    const subscription = await db.subscription.findFirst({
      where: {
        userId: userId,
        status: "ACTIVE",
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get available subscription plans
    const plans = [
      {
        tier: "BASIC",
        name: "Basic",
        price: 0,
        currency: "INR",
        features: [
          "Up to 5 transactions/month",
          "Basic portfolio tracking",
          "Limited AI insights",
        ],
        limitations: [
          "No advanced analytics",
          "No priority support",
          "No API access",
        ],
      },
      {
        tier: "PREMIUM",
        name: "Premium",
        price: 99,
        currency: "INR",
        features: [
          "Unlimited transactions",
          "Advanced AI insights",
          "Priority customer support",
          "Advanced analytics",
          "Portfolio optimization",
        ],
        limitations: [
          "No 1-on-1 advisor sessions",
          "No custom portfolio strategies",
          "No API access",
        ],
      },
      {
        tier: "PROFESSIONAL",
        name: "Professional",
        price: 299,
        currency: "INR",
        features: [
          "Everything in Premium",
          "1-on-1 advisor sessions",
          "Custom portfolio strategies",
          "API access",
          "White-label reports",
          "Dedicated account manager",
        ],
        limitations: [],
      },
    ];

    // Get annual plan pricing
    const annualPlans = plans.map(plan => ({
      ...plan,
      annualPrice: plan.price * 12,
      annualSavings: plan.price > 0 ? plan.price * 3 : 0, // 3 months free for annual
      isAnnual: true,
    }));

    return NextResponse.json({
      currentSubscription: subscription,
      monthlyPlans: plans,
      annualPlans: annualPlans,
    });

  } catch (error) {
    console.error("Get subscriptions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, tier, planType, paymentMethodId } = await request.json();

    if (!userId || !tier || !planType) {
      return NextResponse.json(
        { error: "User ID, tier, and plan type are required" },
        { status: 400 }
      );
    }

    // Calculate pricing
    const pricing = {
      BASIC: { monthly: 0, annual: 0 },
      PREMIUM: { monthly: 99, annual: 999 },
      PROFESSIONAL: { monthly: 299, annual: 2999 },
    };

    const amount = pricing[tier][planType.toLowerCase()];
    const startDate = new Date();
    const endDate = new Date();
    
    if (planType === "ANNUAL") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // Cancel any existing active subscriptions
    await db.subscription.updateMany({
      where: {
        userId: userId,
        status: "ACTIVE",
      },
      data: {
        status: "CANCELLED",
        autoRenew: false,
      },
    });

    // Create new subscription
    const subscription = await db.subscription.create({
      data: {
        userId: userId,
        tier: tier,
        planType: planType,
        amount: amount,
        currency: "INR",
        status: amount === 0 ? "ACTIVE" : "PENDING",
        startDate: startDate,
        endDate: endDate,
        autoRenew: amount > 0,
      },
    });

    // Update user's subscription tier
    await db.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: tier,
        subscriptionExpiresAt: endDate,
      },
    });

    // Create fee record for paid subscriptions
    if (amount > 0) {
      await db.fee.create({
        data: {
          userId: userId,
          type: "SUBSCRIPTION",
          amount: amount,
          currency: "INR",
          description: `${tier} subscription - ${planType}`,
          reference: subscription.id,
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({
      message: "Subscription created successfully",
      subscription: {
        ...subscription,
        isFree: amount === 0,
        requiresPayment: amount > 0,
      },
    });

  } catch (error) {
    console.error("Create subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}