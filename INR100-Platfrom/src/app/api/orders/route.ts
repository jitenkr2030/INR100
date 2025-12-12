import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface OrderRequest {
  userId: string;
  assetId: string;
  orderType: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  price?: number; // For limit orders
}

// Fee configuration (same as in fees API)
const FEE_CONFIG = {
  brokerage: {
    STOCK: { rate: 0.001, minimum: 10 },
    MUTUAL_FUND: { rate: 0, minimum: 0 },
    ETF: { rate: 0.0025, minimum: 5 },
    GOLD: { rate: 0.005, minimum: 25 },
    GLOBAL: { rate: 0.0015, minimum: 15 },
  },
  spread: {
    STOCK: { rate: 0.002 },
    MUTUAL_FUND: { rate: 0.001 },
    ETF: { rate: 0.0015 },
    GOLD: { rate: 0.003 },
    GLOBAL: { rate: 0.0025 },
  },
  currencyConversion: {
    rate: 0.005,
  },
  userDiscounts: {
    BASIC: 0,
    PREMIUM: 0.25,
    PROFESSIONAL: 0.5,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();
    const { userId, assetId, orderType, type, quantity, price } = body;

    if (!userId || !assetId || !orderType || !type || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user and asset details
    const [user, asset] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true, wallet: true },
      }),
      db.asset.findUnique({
        where: { id: assetId },
      }),
    ]);

    if (!user || !asset) {
      return NextResponse.json(
        { error: "User or asset not found" },
        { status: 404 }
      );
    }

    // Calculate order amount
    const currentPrice = asset.currentPrice || (price || 0);
    const orderAmount = quantity * currentPrice;

    // Calculate fees
    const fees = calculateOrderFees(
      asset.type,
      orderType,
      orderAmount,
      user.subscriptionTier
    );

    const totalAmount = orderType === "BUY" 
      ? orderAmount + fees.totalFee 
      : orderAmount - fees.totalFee;

    // Check wallet balance for BUY orders
    if (orderType === "BUY") {
      if (!user.wallet || user.wallet.balance < totalAmount) {
        return NextResponse.json(
          { error: "Insufficient wallet balance" },
          { status: 400 }
        );
      }
    }

    // Check if user has enough holdings for SELL orders
    if (orderType === "SELL") {
      const holding = await db.holding.findFirst({
        where: {
          portfolio: {
            userId: userId,
          },
          assetId: assetId,
        },
      });

      if (!holding || holding.quantity < quantity) {
        return NextResponse.json(
          { error: "Insufficient holdings" },
          { status: 400 }
        );
      }
    }

    // Create the order
    const order = await db.order.create({
      data: {
        userId,
        assetId,
        type,
        orderType,
        quantity,
        price: currentPrice,
        totalAmount: orderAmount,
        brokerageFee: fees.brokerageFee,
        spreadFee: fees.spreadFee,
        totalFee: fees.totalFee,
        status: "PENDING",
      },
    });

    // Create fee record
    await db.fee.create({
      data: {
        userId,
        type: "BROKERAGE",
        amount: fees.brokerageFee,
        currency: "INR",
        description: `Brokerage fee for ${orderType} order`,
        reference: order.id,
        status: "PENDING",
      },
    });

    await db.fee.create({
      data: {
        userId,
        type: "SPREAD",
        amount: fees.spreadFee,
        currency: "INR",
        description: `Spread fee for ${orderType} order`,
        reference: order.id,
        status: "PENDING",
      },
    });

    // For market orders, execute immediately
    if (type === "MARKET") {
      // Update wallet balance
      if (orderType === "BUY") {
        await db.wallet.update({
          where: { userId },
          data: {
            balance: {
              decrement: totalAmount,
            },
          },
        });
      } else {
        await db.wallet.update({
          where: { userId },
          data: {
            balance: {
              increment: totalAmount,
            },
          },
        });
      }

      // Update order status
      await db.order.update({
        where: { id: order.id },
        data: {
          status: "EXECUTED",
          executedAt: new Date(),
        },
      });

      // Update portfolio/holdings
      await updatePortfolioHoldings(userId, assetId, quantity, orderType, currentPrice);

      // Mark fees as paid
      await db.fee.updateMany({
        where: {
          reference: order.id,
        },
        data: {
          status: "PAID",
        },
      });
    }

    return NextResponse.json({
      message: "Order created successfully",
      order: {
        ...order,
        feeBreakdown: fees,
        totalAmount,
        willExecuteImmediately: type === "MARKET",
      },
    });

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function calculateOrderFees(
  assetType: string,
  orderType: "BUY" | "SELL",
  amount: number,
  userTier: string
) {
  const assetTypeUpper = assetType.toUpperCase() as keyof typeof FEE_CONFIG.brokerage;
  
  const brokerageConfig = FEE_CONFIG.brokerage[assetTypeUpper] || FEE_CONFIG.brokerage.STOCK;
  const spreadConfig = FEE_CONFIG.spread[assetTypeUpper] || FEE_CONFIG.spread.STOCK;
  
  let brokerageFee = Math.max(
    amount * brokerageConfig.rate,
    brokerageConfig.minimum
  );

  const spreadFee = amount * spreadConfig.rate;

  let currencyConversionFee = 0;
  if (assetTypeUpper === "GLOBAL") {
    currencyConversionFee = amount * FEE_CONFIG.currencyConversion.rate;
  }

  const discountRate = FEE_CONFIG.userDiscounts[userTier as keyof typeof FEE_CONFIG.userDiscounts] || 0;
  
  brokerageFee = brokerageFee * (1 - discountRate);
  const finalSpreadFee = spreadFee * (1 - discountRate);
  const finalCurrencyFee = currencyConversionFee * (1 - discountRate);
  
  const totalFee = brokerageFee + finalSpreadFee + finalCurrencyFee;

  return {
    brokerageFee: Math.round(brokerageFee * 100) / 100,
    spreadFee: Math.round(finalSpreadFee * 100) / 100,
    totalFee: Math.round(totalFee * 100) / 100,
  };
}

async function updatePortfolioHoldings(
  userId: string,
  assetId: string,
  quantity: number,
  orderType: "BUY" | "SELL",
  price: number
) {
  // Get or create user's default portfolio
  let portfolio = await db.portfolio.findFirst({
    where: {
      userId,
      isPublic: false,
    },
  });

  if (!portfolio) {
    portfolio = await db.portfolio.create({
      data: {
        userId,
        name: "My Portfolio",
        description: "Default investment portfolio",
        isPublic: false,
        totalValue: 0,
        totalInvested: 0,
        totalReturns: 0,
        riskLevel: 3,
      },
    });
  }

  // Update or create holding
  const existingHolding = await db.holding.findFirst({
    where: {
      portfolioId: portfolio.id,
      assetId,
    },
  });

  if (existingHolding) {
    if (orderType === "BUY") {
      const newQuantity = existingHolding.quantity + quantity;
      const newAvgBuyPrice = (existingHolding.avgBuyPrice * existingHolding.quantity + price * quantity) / newQuantity;
      const newTotalValue = newQuantity * price;
      const newTotalInvested = existingHolding.totalInvested + (price * quantity);
      const newReturns = newTotalValue - newTotalInvested;
      const newReturnsPercent = (newReturns / newTotalInvested) * 100;

      await db.holding.update({
        where: { id: existingHolding.id },
        data: {
          quantity: newQuantity,
          avgBuyPrice: newAvgBuyPrice,
          currentPrice: price,
          totalValue: newTotalValue,
          totalInvested: newTotalInvested,
          returns: newReturns,
          returnsPercent: newReturnsPercent,
        },
      });
    } else {
      const newQuantity = existingHolding.quantity - quantity;
      
      if (newQuantity === 0) {
        await db.holding.delete({
          where: { id: existingHolding.id },
        });
      } else {
        const newTotalValue = newQuantity * price;
        const newReturns = newTotalValue - existingHolding.totalInvested;
        const newReturnsPercent = (newReturns / existingHolding.totalInvested) * 100;

        await db.holding.update({
          where: { id: existingHolding.id },
          data: {
            quantity: newQuantity,
            currentPrice: price,
            totalValue: newTotalValue,
            returns: newReturns,
            returnsPercent: newReturnsPercent,
          },
        });
      }
    }
  } else if (orderType === "BUY") {
    const totalValue = quantity * price;
    const totalInvested = quantity * price;
    const returns = 0;
    const returnsPercent = 0;

    await db.holding.create({
      data: {
        portfolioId: portfolio.id,
        assetId,
        quantity,
        avgBuyPrice: price,
        currentPrice: price,
        totalValue,
        totalInvested,
        returns,
        returnsPercent,
      },
    });
  }

  // Update portfolio totals
  const holdings = await db.holding.findMany({
    where: { portfolioId: portfolio.id },
  });

  const portfolioTotalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  const portfolioTotalInvested = holdings.reduce((sum, h) => sum + h.totalInvested, 0);
  const portfolioTotalReturns = portfolioTotalValue - portfolioTotalInvested;

  await db.portfolio.update({
    where: { id: portfolio.id },
    data: {
      totalValue: portfolioTotalValue,
      totalInvested: portfolioTotalInvested,
      totalReturns: portfolioTotalReturns,
    },
  });
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

    const orders = await db.order.findMany({
      where: { userId },
      include: {
        asset: {
          select: {
            id: true,
            symbol: true,
            name: true,
            type: true,
            currentPrice: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to last 50 orders
    });

    return NextResponse.json({
      orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}