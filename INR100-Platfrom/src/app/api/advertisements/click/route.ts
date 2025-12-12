import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface AdClickRequest {
  adId: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AdClickRequest = await request.json();
    const { adId, userId, ipAddress, userAgent } = body;

    if (!adId) {
      return NextResponse.json(
        { error: "Advertisement ID is required" },
        { status: 400 }
      );
    }

    // Check if ad exists and is active
    const ad = await db.advertisement.findUnique({
      where: { id: adId },
    });

    if (!ad || !ad.isActive) {
      return NextResponse.json(
        { error: "Advertisement not found or inactive" },
        { status: 404 }
      );
    }

    // Check if ad is within date range
    const now = new Date();
    if (now < ad.startDate || now > ad.endDate) {
      return NextResponse.json(
        { error: "Advertisement is not currently active" },
        { status: 400 }
      );
    }

    // Calculate cost per click (simplified - in real app this would be more complex)
    const cpc = ad.budget > 0 && ad.impressions > 0 ? ad.budget / ad.impressions : 0.1; // Default ₹0.1 per click
    const newSpent = ad.spent + cpc;

    // Check budget
    if (newSpent > ad.budget) {
      return NextResponse.json(
        { error: "Advertisement budget exhausted" },
        { status: 400 }
      );
    }

    // Update ad metrics
    await db.advertisement.update({
      where: { id: adId },
      data: {
        clicks: {
          increment: 1,
        },
        spent: newSpent,
      },
    });

    // Log click event (in a real app, you might want to store this in a separate analytics table)
    console.log(`Ad click tracked: Ad ${adId}, User ${userId || 'anonymous'}, IP ${ipAddress || 'unknown'}`);

    return NextResponse.json({
      message: "Click tracked successfully",
      targetUrl: ad.targetUrl,
      cost: Math.round(cpc * 100) / 100,
    });

  } catch (error) {
    console.error("Track ad click error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get ad performance analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adId = searchParams.get("adId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!adId) {
      return NextResponse.json(
        { error: "Advertisement ID is required" },
        { status: 400 }
      );
    }

    // Get ad details
    const ad = await db.advertisement.findUnique({
      where: { id: adId },
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Advertisement not found" },
        { status: 404 }
      );
    }

    // Calculate performance metrics
    const ctr = ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
    const cpc = ad.clicks > 0 ? ad.spent / ad.clicks : 0;
    const cpm = ad.impressions > 0 ? (ad.spent / ad.impressions) * 1000 : 0;
    const budgetUtilization = ad.budget > 0 ? (ad.spent / ad.budget) * 100 : 0;

    // Calculate daily performance (simplified - in real app you'd have a proper analytics table)
    const daysRunning = Math.ceil((Math.min(new Date(), ad.endDate).getTime() - ad.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const avgDailyImpressions = daysRunning > 0 ? ad.impressions / daysRunning : 0;
    const avgDailyClicks = daysRunning > 0 ? ad.clicks / daysRunning : 0;
    const avgDailySpend = daysRunning > 0 ? ad.spent / daysRunning : 0;

    // Project end-of-campaign metrics
    const totalDays = Math.ceil((ad.endDate.getTime() - ad.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const projectedImpressions = avgDailyImpressions * totalDays;
    const projectedClicks = avgDailyClicks * totalDays;
    const projectedSpend = Math.min(avgDailySpend * totalDays, ad.budget);

    const performance = {
      current: {
        impressions: ad.impressions,
        clicks: ad.clicks,
        spent: Math.round(ad.spent * 100) / 100,
        ctr: Math.round(ctr * 100) / 100,
        cpc: Math.round(cpc * 100) / 100,
        cpm: Math.round(cpm * 100) / 100,
        budgetUtilization: Math.round(budgetUtilization * 100) / 100,
        remainingBudget: Math.round((ad.budget - ad.spent) * 100) / 100,
      },
      daily: {
        impressions: Math.round(avgDailyImpressions * 100) / 100,
        clicks: Math.round(avgDailyClicks * 100) / 100,
        spend: Math.round(avgDailySpend * 100) / 100,
      },
      projected: {
        impressions: Math.round(projectedImpressions),
        clicks: Math.round(projectedClicks),
        spend: Math.round(projectedSpend * 100) / 100,
        finalBudgetUtilization: Math.round((projectedSpend / ad.budget) * 100) / 100,
      },
      campaign: {
        startDate: ad.startDate,
        endDate: ad.endDate,
        totalDays,
        daysRemaining: Math.ceil((ad.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
        budget: ad.budget,
      },
    };

    return NextResponse.json({
      ad: {
        id: ad.id,
        title: ad.title,
        type: ad.type,
        position: ad.position,
        targetUrl: ad.targetUrl,
      },
      performance,
    });

  } catch (error) {
    console.error("Get ad performance error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}