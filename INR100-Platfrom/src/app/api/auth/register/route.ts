import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().optional(),
  panNumber: z.string().optional(),
  aadhaarNumber: z.string().optional(),
  occupation: z.string().optional(),
  annualIncome: z.string().optional(),
  riskProfile: z.enum(["CONSERVATIVE", "MODERATE", "AGGRESSIVE"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { phone: validatedData.phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        password: hashedPassword,
        panNumber: validatedData.panNumber,
        aadhaarNumber: validatedData.aadhaarNumber,
        riskProfile: validatedData.riskProfile,
        isVerified: false, // Will be verified via OTP
      }
    });

    // Create wallet for the user
    await db.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
        currency: "INR"
      }
    });

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Registration successful. Please verify your OTP.",
      user: userWithoutPassword,
      requiresOTP: true
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}