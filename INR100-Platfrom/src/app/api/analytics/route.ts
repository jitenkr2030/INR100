import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface AnalyticsRequest {
  startDate?: string;
  endDate?: string;
  type?: "revenue" | "subscriptions" | "fees" | "commissions" | "content";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const type = searchParams.get("type");

    // Set default date range to last 30 days if not provided
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);
    
    const defaultEndDate = new Date();

    const start = startDate ? new Date(startDate) : defaultStartDate;
    const end = endDate ? new Date(endDate) : defaultEndDate;

    // Build date filter
    const dateFilter = {
      createdAt: {
        gte: start,
        lte: end,
      },
    };

    let analytics: any = {};

    if (!type || type === "revenue") {
      analytics.revenue = await getRevenueAnalytics(dateFilter);
    }

    if (!type || type === "subscriptions") {
      analytics.subscriptions = await getSubscriptionAnalytics(dateFilter);
    }

    if (!type || type === "fees") {
      analytics.fees = await getFeeAnalytics(dateFilter);
    }

    if (!type || type === "commissions") {
      analytics.commissions = await getCommissionAnalytics(dateFilter);
    }

    if (!type || type === "content") {
      analytics.content = await getContentAnalytics(dateFilter);
    }

    // Get overall summary
    analytics.summary = await getOverallSummary(dateFilter);

    return NextResponse.json({
      analytics,
      period: {
        start,
        end,
      },
    });

  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getRevenueAnalytics(dateFilter: any) {
  // Get subscription revenue
  const subscriptionRevenue = await db.subscription.aggregate({
    where: {
      ...dateFilter,
      status: "ACTIVE",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get fee revenue
  const feeRevenue = await db.fee.aggregate({
    where: {
      ...dateFilter,
      status: "PAID",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get premium content revenue
  const contentRevenue = await db.premiumContentPurchase.aggregate({
    where: {
      ...dateFilter,
      status: "COMPLETED",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get commission revenue (paid to partners)
  const commissionExpense = await db.commission.aggregate({
    where: {
      ...dateFilter,
      status: "PAID",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get revenue by day for trend analysis
  const dailyRevenue = await db.$queryRaw`
    SELECT 
      DATE(createdAt) as date,
      SUM(CASE WHEN type = 'SUBSCRIPTION' THEN amount ELSE 0 END) as subscription_revenue,
      SUM(CASE WHEN type IN ('BROKERAGE', 'SPREAD', 'MANAGEMENT') THEN amount ELSE 0 END) as fee_revenue,
      SUM(CASE WHEN type = 'PREMIUM_FEATURE' THEN amount ELSE 0 END) as content_revenue
    FROM fees 
    WHERE createdAt >= ${start} AND createdAt <= ${end} AND status = 'PAID'
    GROUP BY DATE(createdAt)
    ORDER BY date
  ` as Array<{
    date: string;
    subscription_revenue: number;
    fee_revenue: number;
    content_revenue: number;
  }>;

  return {
    total: {
      subscriptions: subscriptionRevenue._sum.amount || 0,
      fees: feeRevenue._sum.amount || 0,
      content: contentRevenue._sum.amount || 0,
      commissions: commissionExpense._sum.amount || 0,
      net: (subscriptionRevenue._sum.amount || 0) + 
            (feeRevenue._sum.amount || 0) + 
            (contentRevenue._sum.amount || 0) - 
            (commissionExpense._sum.amount || 0),
    },
    counts: {
      subscriptions: subscriptionRevenue._count._all,
      fees: feeRevenue._count._all,
      content: contentRevenue._count._all,
      commissions: commissionExpense._count._all,
    },
    daily: dailyRevenue,
  };
}

async function getSubscriptionAnalytics(dateFilter: any) {
  // Get subscriptions by tier
  const byTier = await db.subscription.groupBy({
    by: ["tier"],
    where: {
      ...dateFilter,
      status: "ACTIVE",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get subscriptions by plan type
  const byPlanType = await db.subscription.groupBy({
    by: ["planType"],
    where: {
      ...dateFilter,
      status: "ACTIVE",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get new subscriptions vs cancellations
  const newSubscriptions = await db.subscription.count({
    where: {
      ...dateFilter,
    },
  });

  const cancelledSubscriptions = await db.subscription.count({
    where: {
      ...dateFilter,
      status: "CANCELLED",
    },
  });

  return {
    byTier: byTier.reduce((acc, item) => {
      acc[item.tier] = {
        revenue: item._sum.amount || 0,
        count: item._count._all,
      };
      return acc;
    }, {} as Record<string, { revenue: number; count: number }>),
    byPlanType: byPlanType.reduce((acc, item) => {
      acc[item.planType] = {
        revenue: item._sum.amount || 0,
        count: item._count._all,
      };
      return acc;
    }, {} as Record<string, { revenue: number; count: number }>),
    churn: {
      new: newSubscriptions,
      cancelled: cancelledSubscriptions,
      rate: newSubscriptions > 0 ? (cancelledSubscriptions / newSubscriptions) * 100 : 0,
    },
  };
}

async function getFeeAnalytics(dateFilter: any) {
  // Get fees by type
  const byType = await db.fee.groupBy({
    by: ["type"],
    where: {
      ...dateFilter,
      status: "PAID",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
    _avg: {
      amount: true,
    },
  });

  // Get fees by status
  const byStatus = await db.fee.groupBy({
    by: ["status"],
    where: {
      ...dateFilter,
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  return {
    byType: byType.reduce((acc, item) => {
      acc[item.type] = {
        total: item._sum.amount || 0,
        count: item._count._all,
        average: item._avg.amount || 0,
      };
      return acc;
    }, {} as Record<string, { total: number; count: number; average: number }>),
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = {
        total: item._sum.amount || 0,
        count: item._count._all,
      };
      return acc;
    }, {} as Record<string, { total: number; count: number }>),
  };
}

async function getCommissionAnalytics(dateFilter: any) {
  // Get commissions by partner type
  const byPartnerType = await db.commission.groupBy({
    by: ["type"],
    where: {
      ...dateFilter,
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get commissions by status
  const byStatus = await db.commission.groupBy({
    by: ["status"],
    where: {
      ...dateFilter,
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get top performing partners
  const topPartners = await db.commission.groupBy({
    by: ["partnerId"],
    where: {
      ...dateFilter,
      status: "PAID",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
    take: 10,
  });

  return {
    byType: byPartnerType.reduce((acc, item) => {
      acc[item.type] = {
        total: item._sum.amount || 0,
        count: item._count._all,
      };
      return acc;
    }, {} as Record<string, { total: number; count: number }>),
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = {
        total: item._sum.amount || 0,
        count: item._count._all,
      };
      return acc;
    }, {} as Record<string, { total: number; count: number }>),
    topPartners,
  };
}

async function getContentAnalytics(dateFilter: any) {
  // Get content purchases by type
  const byType = await db.premiumContentPurchase.groupBy({
    by: ["contentId"],
    where: {
      ...dateFilter,
      status: "COMPLETED",
    },
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  // Get content with purchase counts
  const contentStats = await db.premiumContent.findMany({
    where: {
      isActive: true,
    },
    include: {
      purchases: {
        where: {
          ...dateFilter,
          status: "COMPLETED",
        },
        select: {
          id: true,
          amount: true,
          purchasedAt: true,
        },
      },
    },
    orderBy: {
      purchases: {
        _count: "desc",
      },
    },
    take: 20,
  });

  const contentWithStats = contentStats.map(content => ({
    id: content.id,
    title: content.title,
    type: content.type,
    price: content.price,
    purchases: content.purchases.length,
    revenue: content.purchases.reduce((sum, p) => sum + p.amount, 0),
  }));

  return {
    byType,
    topContent: contentWithStats,
  };
}

async function getOverallSummary(dateFilter: any) {
  // Get total users
  const totalUsers = await db.user.count({
    where: {
      createdAt: {
        lte: dateFilter.createdAt.lte,
      },
    },
  });

  // Get active users (last 30 days)
  const activeUsers = await db.user.count({
    where: {
      lastLoginAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  // Get total revenue
  const totalRevenue = await db.fee.aggregate({
    where: {
      ...dateFilter,
      status: "PAID",
    },
    _sum: {
      amount: true,
    },
  });

  // Get average revenue per user
  const arpu = totalUsers > 0 ? (totalRevenue._sum.amount || 0) / totalUsers : 0;

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
    },
    revenue: {
      total: totalRevenue._sum.amount || 0,
      arpu: Math.round(arpu * 100) / 100,
    },
  };
}