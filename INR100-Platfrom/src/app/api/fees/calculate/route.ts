import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface FeeCalculationRequest {
  userId: string;
  assetType: string;
  orderType: "BUY" | "SELL";
  amount: number;
  quantity?: number;
  price?: number;
}

interface FeeBreakdown {
  brokerageFee: number;
  spreadFee: number;
  totalFee: number;
  netAmount: number;
  feeDetails: {
    brokerage: {
      rate: number;
      amount: number;
      minimum: number;
    };
    spread: {
      rate: number;
      amount: number;
    };
    currencyConversion?: {
      rate: number;
      amount: number;
    };
  };
}

// Fee configuration
const FEE_CONFIG = {
  brokerage: {
    STOCK: { rate: 0.001, minimum: 10 }, // 0.1% min ₹10
    MUTUAL_FUND: { rate: 0, minimum: 0 }, // 0% for direct plans
    ETF: { rate: 0.0025, minimum: 5 }, // 0.25% min ₹5
    GOLD: { rate: 0.005, minimum: 25 }, // 0.5% min ₹25
    GLOBAL: { rate: 0.0015, minimum: 15 }, // 0.15% min ₹15
  },
  spread: {
    STOCK: { rate: 0.002 }, // 0.2%
    MUTUAL_FUND: { rate: 0.001 }, // 0.1%
    ETF: { rate: 0.0015 }, // 0.15%
    GOLD: { rate: 0.003 }, // 0.3%
    GLOBAL: { rate: 0.0025 }, // 0.25%
  },
  currencyConversion: {
    rate: 0.005, // 0.5% for global assets
  },
  userDiscounts: {
    BASIC: 0, // No discount
    PREMIUM: 0.25, // 25% discount on fees
    PROFESSIONAL: 0.5, // 50% discount on fees
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: FeeCalculationRequest = await request.json();
    const { userId, assetType, orderType, amount, quantity, price } = body;

    if (!userId || !assetType || !orderType || !amount) {
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

    // Calculate fees
    const feeBreakdown = calculateFees(
      assetType,
      orderType,
      amount,
      user.subscriptionTier,
      quantity,
      price
    );

    return NextResponse.json({
      success: true,
      feeBreakdown,
      userTier: user.subscriptionTier,
      discountApplied: FEE_CONFIG.userDiscounts[user.subscriptionTier],
    });

  } catch (error) {
    console.error("Fee calculation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function calculateFees(
  assetType: string,
  orderType: "BUY" | "SELL",
  amount: number,
  userTier: string,
  quantity?: number,
  price?: number
): FeeBreakdown {
  const assetTypeUpper = assetType.toUpperCase() as keyof typeof FEE_CONFIG.brokerage;
  
  // Get base fees
  const brokerageConfig = FEE_CONFIG.brokerage[assetTypeUpper] || FEE_CONFIG.brokerage.STOCK;
  const spreadConfig = FEE_CONFIG.spread[assetTypeUpper] || FEE_CONFIG.spread.STOCK;
  
  // Calculate brokerage fee
  let brokerageFee = Math.max(
    amount * brokerageConfig.rate,
    brokerageConfig.minimum
  );

  // Calculate spread fee
  const spreadFee = amount * spreadConfig.rate;

  // Calculate currency conversion fee for global assets
  let currencyConversionFee = 0;
  if (assetTypeUpper === "GLOBAL") {
    currencyConversionFee = amount * FEE_CONFIG.currencyConversion.rate;
  }

  // Apply user discount
  const discountRate = FEE_CONFIG.userDiscounts[userTier as keyof typeof FEE_CONFIG.userDiscounts] || 0;
  const totalFeesBeforeDiscount = brokerageFee + spreadFee + currencyConversionFee;
  const discountAmount = totalFeesBeforeDiscount * discountRate;
  
  brokerageFee = brokerageFee * (1 - discountRate);
  const finalSpreadFee = spreadFee * (1 - discountRate);
  const finalCurrencyFee = currencyConversionFee * (1 - discountRate);
  
  const totalFee = brokerageFee + finalSpreadFee + finalCurrencyFee;
  const netAmount = orderType === "BUY" ? amount + totalFee : amount - totalFee;

  return {
    brokerageFee: Math.round(brokerageFee * 100) / 100,
    spreadFee: Math.round(finalSpreadFee * 100) / 100,
    totalFee: Math.round(totalFee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    feeDetails: {
      brokerage: {
        rate: brokerageConfig.rate * 100,
        amount: Math.round(brokerageFee * 100) / 100,
        minimum: brokerageConfig.minimum,
      },
      spread: {
        rate: spreadConfig.rate * 100,
        amount: Math.round(finalSpreadFee * 100) / 100,
      },
      ...(currencyConversionFee > 0 && {
        currencyConversion: {
          rate: FEE_CONFIG.currencyConversion.rate * 100,
          amount: Math.round(finalCurrencyFee * 100) / 100,
        },
      }),
    },
  };
}

// Endpoint to get fee configuration and user discounts
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

    const discountRate = FEE_CONFIG.userDiscounts[user.subscriptionTier as keyof typeof FEE_CONFIG.userDiscounts] || 0;

    return NextResponse.json({
      feeConfig: FEE_CONFIG,
      userTier: user.subscriptionTier,
      discountRate: discountRate * 100,
      effectiveRates: Object.entries(FEE_CONFIG.brokerage).reduce((acc, [asset, config]) => {
        acc[asset] = {
          brokerage: config.rate * (1 - discountRate),
          spread: (FEE_CONFIG.spread[asset as keyof typeof FEE_CONFIG.spread] || FEE_CONFIG.spread.STOCK).rate * (1 - discountRate),
        };
        return acc;
      }, {} as Record<string, { brokerage: number; spread: number }>),
    });

  } catch (error) {
    console.error("Get fee config error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}