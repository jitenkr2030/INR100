import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
  resetToken: z.string()
});

// In-memory token store (in production, use Redis or database)
const resetTokens = new Map<string, { email: string; expires: number }>();

// Generate reset token
function generateResetToken(email: string): string {
  const token = `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${Buffer.from(email).toString('base64')}`;
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
  
  resetTokens.set(token, { email, expires });
  return token;
}

// Verify reset token
function verifyResetToken(token: string): { email: string } | null {
  const stored = resetTokens.get(token);
  
  if (!stored) {
    return null;
  }
  
  if (stored.expires < Date.now()) {
    resetTokens.delete(token);
    return null;
  }
  
  return { email: stored.email };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword, resetToken } = resetPasswordSchema.parse(body);

    // Verify reset token
    const tokenData = verifyResetToken(resetToken);
    if (!tokenData || tokenData.email !== email) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user's password
    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    // Remove used reset token
    resetTokens.delete(resetToken);

    // Optionally, invalidate all existing sessions
    // This would require session management implementation

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
      email: user.email
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Verify reset token endpoint (for checking if token is valid)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resetToken = searchParams.get("token");

    if (!resetToken) {
      return NextResponse.json(
        { error: "Reset token is required" },
        { status: 400 }
      );
    }

    const tokenData = verifyResetToken(resetToken);
    
    if (!tokenData) {
      return NextResponse.json(
        { valid: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: tokenData.email
    });

  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Request password reset (initial step)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = z.object({ email: z.string().email() }).parse(body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, email: true, isEmailVerified: true }
    });

    // For security, don't reveal if user exists or not
    const response = {
      success: true,
      message: "If an account with this email exists, we've sent password reset instructions."
    };

    if (!user) {
      return NextResponse.json(response);
    }

    // Generate reset token
    const resetToken = generateResetToken(email);

    // In production, send email with reset link
    // const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    // await sendPasswordResetEmail(email, resetLink);

    console.log(`Password reset requested for ${email}. Token: ${resetToken}`);

    return NextResponse.json({
      ...response,
      // In development, return token for testing
      ...(process.env.NODE_ENV === "development" && { resetToken })
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
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