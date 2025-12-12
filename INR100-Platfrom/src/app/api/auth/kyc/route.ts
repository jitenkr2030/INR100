import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const kycSchema = z.object({
  userId: z.string(),
  panNumber: z.string().min(10, "PAN must be 10 characters").max(10, "PAN must be 10 characters"),
  aadhaarNumber: z.string().min(12, "Aadhaar must be 12 digits").max(12, "Aadhaar must be 12 digits"),
  dateOfBirth: z.string(),
  occupation: z.string(),
  annualIncome: z.string(),
  riskProfile: z.enum(["CONSERVATIVE", "MODERATE", "AGGRESSIVE"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = kycSchema.parse(body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: validatedData.userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user with KYC information
    const updatedUser = await db.user.update({
      where: { id: validatedData.userId },
      data: {
        panNumber: validatedData.panNumber,
        aadhaarNumber: validatedData.aadhaarNumber,
        riskProfile: validatedData.riskProfile,
        kycStatus: "UNDER_REVIEW"
      }
    });

    // Create KYC documents (in a real app, you would upload actual documents)
    await db.kYCDocument.createMany({
      data: [
        {
          userId: validatedData.userId,
          type: "PAN_CARD",
          documentUrl: "/documents/pan-card-placeholder.jpg",
          status: "PENDING"
        },
        {
          userId: validatedData.userId,
          type: "AADHAAR_FRONT",
          documentUrl: "/documents/aadhaar-front-placeholder.jpg",
          status: "PENDING"
        },
        {
          userId: validatedData.userId,
          type: "AADHAAR_BACK",
          documentUrl: "/documents/aadhaar-back-placeholder.jpg",
          status: "PENDING"
        }
      ]
    });

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "KYC information submitted successfully. Under review.",
      user: userWithoutPassword
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("KYC submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get KYC status
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
      select: {
        id: true,
        kycStatus: true,
        panNumber: true,
        aadhaarNumber: true,
        riskProfile: true,
        kycDocuments: {
          select: {
            type: true,
            status: true,
            verifiedAt: true,
            rejectionReason: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      kycStatus: user.kycStatus,
      panNumber: user.panNumber,
      aadhaarNumber: user.aadhaarNumber,
      riskProfile: user.riskProfile,
      documents: user.kycDocuments
    });

  } catch (error) {
    console.error("Get KYC status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}