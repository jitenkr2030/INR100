import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface PremiumContentRequest {
  title: string;
  description: string;
  type: "COURSE" | "WEBINAR" | "RESEARCH_REPORT" | "CERTIFICATION";
  content: string;
  price: number;
  instructor?: string;
  duration?: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const instructor = searchParams.get("instructor");

    const where: any = { isActive: true };
    if (type) where.type = type;
    if (category) where.category = category;
    if (instructor) where.instructor = instructor;

    // Get available premium content
    const content = await db.premiumContent.findMany({
      where,
      orderBy: [
        { createdAt: "desc" },
        { price: "asc" },
      ],
    });

    // If userId is provided, get user's purchases
    let userPurchases: any[] = [];
    if (userId) {
      userPurchases = await db.premiumContentPurchase.findMany({
        where: {
          userId,
          status: "COMPLETED",
          ...(type && { content: { type } }),
        },
        include: {
          content: {
            select: {
              id: true,
              title: true,
              type: true,
              price: true,
            },
          },
        },
      });
    }

    // Group content by type
    const contentByType = content.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, typeof content>);

    return NextResponse.json({
      content,
      contentByType,
      userPurchases,
      filters: {
        userId,
        type,
        category,
        instructor,
      },
    });

  } catch (error) {
    console.error("Get premium content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PremiumContentRequest = await request.json();
    const { title, description, type, content, price, instructor, duration } = body;

    if (!title || !description || !type || !content || price === undefined) {
      return NextResponse.json(
        { error: "Title, description, type, content, and price are required" },
        { status: 400 }
      );
    }

    // Create premium content
    const premiumContent = await db.premiumContent.create({
      data: {
        title,
        description,
        type,
        content,
        price,
        currency: "INR",
        instructor,
        duration,
      },
    });

    return NextResponse.json({
      message: "Premium content created successfully",
      content: premiumContent,
    });

  } catch (error) {
    console.error("Create premium content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, ...updateData } = body;

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const content = await db.premiumContent.update({
      where: { id: contentId },
      data: updateData,
    });

    return NextResponse.json({
      message: "Premium content updated successfully",
      content,
    });

  } catch (error) {
    console.error("Update premium content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get("contentId");

    if (!contentId) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    await db.premiumContent.update({
      where: { id: contentId },
      data: { isActive: false },
    });

    return NextResponse.json({
      message: "Premium content deactivated successfully",
    });

  } catch (error) {
    console.error("Delete premium content error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}