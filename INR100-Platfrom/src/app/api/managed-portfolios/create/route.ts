import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface CreateManagedPortfolioRequest {
  userId: string;
  portfolioId: string;
  strategy: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE" | "CUSTOM";
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateManagedPortfolioRequest = await request.json();
    const { userId, portfolioId, strategy } = body;

    if (!userId || !portfolioId || !strategy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user details
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has required subscription tier
    if (user.subscriptionTier === "BASIC") {
      return NextResponse.json(
        { error: "Managed portfolios require Premium or Professional subscription" },
        { status: 403 }
      );
    }

    // Get portfolio details
    const portfolio = await db.portfolio.findUnique({
      where: { id: portfolioId },
      include: {
        user: {
          select: { id: true },
        },
      },
    });

    if (!portfolio || portfolio.userId !== userId) {
      return NextResponse.json(
        { error: "Portfolio not found or access denied" },
        { status: 404 }
      );
    }

    // Check if portfolio is already managed
    const existingManaged = await db.managedPortfolio.findFirst({
      where: {
        portfolioId,
        isActive: true,
      },
    });

    if (existingManaged) {
      return NextResponse.json(
        { error: "Portfolio is already under management" },
        { status: 400 }
      );
    }

    // Get fee configuration
    const feeConfig = getFeeConfig(strategy, user.subscriptionTier);

    // Create managed portfolio
    const managedPortfolio = await db.managedPortfolio.create({
      data: {
        userId,
        portfolioId,
        strategy,
        feeRate: feeConfig.effectiveRate,
        startedAt: new Date(),
      },
    });

    // Create setup fee if applicable
    if (feeConfig.setupFee > 0) {
      await db.fee.create({
        data: {
          userId,
          type: "MANAGEMENT",
          amount: feeConfig.setupFee,
          currency: "INR",
          description: `Setup fee for ${strategy} managed portfolio`,
          reference: managedPortfolio.id,
          status: "PENDING",
          managedPortfolioId: managedPortfolio.id,
        },
      });
    }

    return NextResponse.json({
      message: "Managed portfolio created successfully",
      managedPortfolio: {
        id: managedPortfolio.id,
        strategy: managedPortfolio.strategy,
        feeRate: managedPortfolio.feeRate,
        setupFee: feeConfig.setupFee,
        estimatedMonthlyFee: Math.round((portfolio.totalValue * feeConfig.effectiveRate / 12) * 100) / 100,
        estimatedAnnualFee: Math.round((portfolio.totalValue * feeConfig.effectiveRate) * 100) / 100,
      },
    });

  } catch (error) {
    console.error("Create managed portfolio error:", error);
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
    const portfolioId = searchParams.get("portfolioId");

    if (!userId || !portfolioId) {
      return NextResponse.json(
        { error: "User ID and portfolio ID are required" },
        { status: 400 }
      );
    }

    // Deactivate managed portfolio
    const result = await db.managedPortfolio.updateMany({
      where: {
        userId,
        portfolioId,
        isActive: true,
      },
      data: {
        isActive: false,
        endedAt: new Date(),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Active managed portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Managed portfolio deactivated successfully",
    });

  } catch (error) {
    console.error("Deactivate managed portfolio error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getFeeConfig(strategy: string, userTier: string) {
  const baseConfig = {
    CONSERVATIVE: { rate: 0.005, setupFee: 0 },
    BALANCED: { rate: 0.0075, setupFee: 0 },
    AGGRESSIVE: { rate: 0.01, setupFee: 0 },
    CUSTOM: { rate: 0.015, setupFee: 1000 },
  };

  const discounts = {
    BASIC: 0,
    PREMIUM: 0.1,
    PROFESSIONAL: 0.2,
  };

  const config = baseConfig[strategy as keyof typeof baseConfig] || baseConfig.CONSERVATIVE;
  const discount = discounts[userTier as keyof typeof discounts] || 0;

  return {
    baseRate: config.rate,
    setupFee: config.setupFee,
    discountRate: discount,
    effectiveRate: config.rate * (1 - discount),
  };
}