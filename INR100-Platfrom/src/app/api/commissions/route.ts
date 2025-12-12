import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface CommissionRequest {
  userId?: string;
  partnerId?: string;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const partnerId = searchParams.get("partnerId");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build where clause
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (partnerId) where.partnerId = partnerId;
    if (type) where.type = type;
    if (status) where.status = status;
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Get commissions with related data
    const commissions = await db.commission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        partner: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // Limit to last 100 records
    });

    // Calculate summary statistics
    const summary = await calculateCommissionSummary(where);

    return NextResponse.json({
      commissions,
      summary,
      filters: {
        userId,
        partnerId,
        type,
        status,
        startDate,
        endDate,
      },
    });

  } catch (error) {
    console.error("Get commissions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      partnerId, 
      type, 
      amount, 
      percentage, 
      reference,
      description 
    } = body;

    if (!partnerId || !type || !amount) {
      return NextResponse.json(
        { error: "Partner ID, type, and amount are required" },
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

    // Calculate commission amount if percentage is provided
    let commissionAmount = amount;
    if (percentage) {
      commissionAmount = amount * (percentage / 100);
    }

    // Create commission record
    const commission = await db.commission.create({
      data: {
        userId,
        partnerId,
        type,
        amount: commissionAmount,
        currency: "INR",
        percentage,
        reference,
        description: description || `${type} commission`,
        status: "PENDING",
      },
    });

    // Update affiliate link stats if applicable
    if (reference && type === "AFFILIATE_SIGNUP") {
      await db.affiliateLink.updateMany({
        where: {
          id: reference,
        },
        data: {
          conversions: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({
      message: "Commission recorded successfully",
      commission: {
        id: commission.id,
        type: commission.type,
        amount: commission.amount,
        percentage: commission.percentage,
        status: commission.status,
        createdAt: commission.createdAt,
      },
    });

  } catch (error) {
    console.error("Create commission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { commissionId, status, settledAt } = body;

    if (!commissionId || !status) {
      return NextResponse.json(
        { error: "Commission ID and status are required" },
        { status: 400 }
      );
    }

    // Update commission status
    const commission = await db.commission.update({
      where: { id: commissionId },
      data: {
        status,
        settledAt: status === "PAID" ? (settledAt || new Date()) : null,
      },
    });

    return NextResponse.json({
      message: "Commission updated successfully",
      commission: {
        id: commission.id,
        status: commission.status,
        settledAt: commission.settledAt,
      },
    });

  } catch (error) {
    console.error("Update commission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function calculateCommissionSummary(where: any) {
  const summary = await db.commission.groupBy({
    by: ["status"],
    where,
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  const totalSummary = await db.commission.aggregate({
    where,
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  const typeSummary = await db.commission.groupBy({
    by: ["type"],
    where,
    _sum: {
      amount: true,
    },
    _count: {
      _all: true,
    },
  });

  return {
    byStatus: summary.reduce((acc, item) => {
      acc[item.status] = {
        count: item._count._all,
        amount: item._sum.amount || 0,
      };
      return acc;
    }, {} as Record<string, { count: number; amount: number }>),
    total: {
      count: totalSummary._count._all,
      amount: totalSummary._sum.amount || 0,
    },
    byType: typeSummary.reduce((acc, item) => {
      acc[item.type] = {
        count: item._count._all,
        amount: item._sum.amount || 0,
      };
      return acc;
    }, {} as Record<string, { count: number; amount: number }>),
  };
}