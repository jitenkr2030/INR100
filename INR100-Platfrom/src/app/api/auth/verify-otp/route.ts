import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// In a real application, you would store OTPs in a database with expiration
// For demo purposes, we'll use a simple in-memory store and accept any 6-digit OTP
const otpStore = new Map<string, { otp: string; expiresAt: Date }>();

export async function POST(request: NextRequest) {
  try {
    const { email, phone, otp } = await request.json();

    if (!otp) {
      return NextResponse.json(
        { error: "OTP is required" },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      );
    }

    // For demo purposes, accept any 6-digit OTP
    // In production, you would validate against stored OTP
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "Invalid OTP format" },
        { status: 400 }
      );
    }

    // Find user by email or phone
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user verification status
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { isVerified: true }
    });

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "OTP verified successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Endpoint to send OTP
export async function PUT(request: NextRequest) {
  try {
    const { email, phone } = await request.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 }
      );
    }

    // Find user by email or phone
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone }
        ]
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate OTP (in production, use a proper OTP service)
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP (in production, use a proper database or cache)
    const key = email || phone;
    otpStore.set(key, { otp: generatedOtp, expiresAt });

    // In production, you would send the OTP via SMS or email
    console.log(`OTP for ${key}: ${generatedOtp}`);

    return NextResponse.json({
      message: "OTP sent successfully",
      // For demo purposes, return the OTP
      demoOtp: generatedOtp
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}