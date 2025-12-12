import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const requestResetSchema = z.object({
  email: z.string().email(),
  method: z.enum(["email", "phone"])
});

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  type: z.enum(["password_reset", "email_verification", "phone_verification"])
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  otp: z.string().length(6)
});

// In-memory storage for OTP (in production, use Redis or database)
const otpStore = new Map<string, { code: string; expires: number; type: string }>();

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email (mock implementation)
async function sendEmailOTP(email: string, otp: string, type: string): Promise<void> {
  console.log(`Sending OTP ${otp} to ${email} for ${type}`);
  // In production, integrate with email service like SendGrid, AWS SES, etc.
}

// Send OTP via SMS (mock implementation)
async function sendSMSOTP(phone: string, otp: string): Promise<void> {
  console.log(`Sending OTP ${otp} to ${phone} via SMS`);
  // In production, integrate with SMS service like Twilio, AWS SNS, etc.
}

// Request password reset
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, method } = requestResetSchema.parse(body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, phoneNumber: true, isEmailVerified: true }
    });

    if (!user) {
      // For security, don't reveal if user exists
      return NextResponse.json({
        success: true,
        message: "If an account with this email exists, we've sent a password reset code."
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP (in production, use Redis or database with TTL)
    const otpKey = `${email}:password_reset`;
    otpStore.set(otpKey, {
      code: otp,
      expires,
      type: "password_reset"
    });

    // Send OTP based on method
    if (method === "email" && user.isEmailVerified) {
      await sendEmailOTP(email, otp, "password reset");
    } else if (method === "phone" && user.phoneNumber) {
      await sendSMSOTP(user.phoneNumber, otp);
    } else {
      // Fallback to email if phone not available
      await sendEmailOTP(email, otp, "password reset");
    }

    return NextResponse.json({
      success: true,
      message: "Password reset code sent successfully",
      method: method,
      expiresIn: 600 // 10 minutes in seconds
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Verify OTP endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, type } = verifyOtpSchema.parse(body);

    const otpKey = `${email}:${type}`;
    const storedOtp = otpStore.get(otpKey);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    if (storedOtp.expires < Date.now()) {
      otpStore.delete(otpKey);
      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    if (storedOtp.code !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // OTP is valid, remove it from store
    otpStore.delete(otpKey);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      token: `reset_token_${Date.now()}_${email}` // In production, use proper JWT tokens
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}