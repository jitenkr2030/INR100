import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ManagedPortfolioRequest {
  userId: string;
  portfolioId: string;
  strategy: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE" | "CUSTOM";
  portfolioValue: number;
}

interface FeeCalculation {
  annualFeeRate: number;
  monthlyFee: number;
  annualFee: number;
  setupFee: number;
  totalFirstYearFee: number;
  feeBreakdown: {
    managementFee: number;
    setupFee: number;
    userDiscount: number;
    effectiveRate: number;
  };
}

// Asset management fee configuration
const MANAGEMENT_FEE_CONFIG = {
  strategies: {
    CONSERVATIVE: { rate: 0.005, setupFee: 0 }, // 0.5% annual
    BALANCED: { rate: 0.0075, setupFee: 0 }, // 0.75% annual
    AGGRESSIVE: { rate: 0.01, setupFee: 0 }, // 1% annual
    CUSTOM: { rate: 0.015, setupFee: 1000 }, // 1.5% annual + ₹1000 setup
  },
  userDiscounts: {
    BASIC: 0, // No discount
    PREMIUM: 0.1, // 10% discount
    PROFESSIONAL: 0.2, // 20% discount
  },
  minimumFee: {
    monthly: 100, // Minimum ₹100 per month
    annual: 1200, // Minimum ₹1200 per year
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: ManagedPortfolioRequest = await request.json();
    const { userId, portfolioId, strategy, portfolioValue } = body;

    if (!userId || !portfolioId || !strategy || !portfolioValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user's subscription tier for discount calculation
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

    // Calculate management fees
    const feeCalculation = calculateManagementFees(
      strategy,
      portfolioValue,
      user.subscriptionTier
    );

    return NextResponse.json({
      success: true,
      feeCalculation,
      userTier: user.subscriptionTier,
      strategy,
      portfolioValue,
    });

  } catch (error) {
    console.error("Management fee calculation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    // Get user's managed portfolios
    const managedPortfolios = await db.managedPortfolio.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        portfolio: {
          select: {
            id: true,
            name: true,
            totalValue: true,
          },
        },
        fees: {
          where: {
            status: "PAID",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 12, // Last 12 months
        },
      },
    });

    // Calculate total fees paid and projected annual fees
    let totalFeesPaid = 0;
    let projectedAnnualFees = 0;

    const portfolioDetails = managedPortfolios.map(mp => {
      const feesPaid = mp.fees.reduce((sum, fee) => sum + fee.amount, 0);
      totalFeesPaid += feesPaid;
      
      const annualFee = mp.portfolio.totalValue * mp.feeRate;
      projectedAnnualFees += annualFee;

      return {
        id: mp.id,
        portfolioId: mp.portfolio.id,
        portfolioName: mp.portfolio.name,
        strategy: mp.strategy,
        feeRate: mp.feeRate,
        portfolioValue: mp.portfolio.totalValue,
        annualFee: Math.round(annualFee * 100) / 100,
        monthlyFee: Math.round((annualFee / 12) * 100) / 100,
        feesPaid: Math.round(feesPaid * 100) / 100,
        startedAt: mp.startedAt,
      };
    });

    // Get user's discount rate
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true },
    });

    const discountRate = MANAGEMENT_FEE_CONFIG.userDiscounts[
      user?.subscriptionTier as keyof typeof MANAGEMENT_FEE_CONFIG.userDiscounts
    ] || 0;

    return NextResponse.json({
      managedPortfolios: portfolioDetails,
      totalFeesPaid: Math.round(totalFeesPaid * 100) / 100,
      projectedAnnualFees: Math.round(projectedAnnualFees * 100) / 100,
      userTier: user?.subscriptionTier,
      discountRate: discountRate * 100,
      availableStrategies: Object.entries(MANAGEMENT_FEE_CONFIG.strategies).map(([key, config]) => ({
        strategy: key,
        rate: config.rate * 100,
        setupFee: config.setupFee,
        description: getStrategyDescription(key),
      })),
    });

  } catch (error) {
    console.error("Get managed portfolios error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function calculateManagementFees(
  strategy: string,
  portfolioValue: number,
  userTier: string
): FeeCalculation {
  const strategyConfig = MANAGEMENT_FEE_CONFIG.strategies[
    strategy as keyof typeof MANAGEMENT_FEE_CONFIG.strategies
  ] || MANAGEMENT_FEE_CONFIG.strategies.CONSERVATIVE;

  // Calculate base annual fee
  let annualFee = portfolioValue * strategyConfig.rate;
  
  // Apply minimum fee
  annualFee = Math.max(annualFee, MANAGEMENT_FEE_CONFIG.minimumFee.annual);

  // Apply user discount
  const discountRate = MANAGEMENT_FEE_CONFIG.userDiscounts[
    userTier as keyof typeof MANAGEMENT_FEE_CONFIG.userDiscounts
  ] || 0;
  
  const discountAmount = annualFee * discountRate;
  const finalAnnualFee = annualFee - discountAmount;
  const monthlyFee = finalAnnualFee / 12;

  return {
    annualFeeRate: strategyConfig.rate * (1 - discountRate),
    monthlyFee: Math.round(monthlyFee * 100) / 100,
    annualFee: Math.round(finalAnnualFee * 100) / 100,
    setupFee: strategyConfig.setupFee,
    totalFirstYearFee: Math.round((finalAnnualFee + strategyConfig.setupFee) * 100) / 100,
    feeBreakdown: {
      managementFee: Math.round(finalAnnualFee * 100) / 100,
      setupFee: strategyConfig.setupFee,
      userDiscount: Math.round(discountAmount * 100) / 100,
      effectiveRate: strategyConfig.rate * (1 - discountRate),
    },
  };
}

function getStrategyDescription(strategy: string): string {
  switch (strategy) {
    case "CONSERVATIVE":
      return "Low-risk strategy focusing on capital preservation with steady returns";
    case "BALANCED":
      return "Moderate risk strategy balancing growth and stability";
    case "AGGRESSIVE":
      return "High-risk strategy targeting maximum growth potential";
    case "CUSTOM":
      return "Tailored strategy designed specifically for your goals";
    default:
      return "Standard investment strategy";
  }
}