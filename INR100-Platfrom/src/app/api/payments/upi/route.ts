import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, vpa, userId, description } = body;

    if (!amount || !vpa || !userId) {
      return NextResponse.json(
        { error: 'Amount, VPA, and user ID are required' },
        { status: 400 }
      );
    }

    // Validate VPA format
    if (!isValidVPA(vpa)) {
      return NextResponse.json(
        { error: 'Invalid VPA format' },
        { status: 400 }
      );
    }

    // Generate unique receipt ID
    const receipt = `upi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create Razorpay order specifically for UPI
    const razorpayOrder = await createUPIOrder({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt,
      method: 'upi',
      vpa,
      contact: '+919876543210', // User contact - should be dynamic
      email: 'user@example.com', // User email - should be dynamic
      notes: {
        payment_type: 'upi',
        vpa: vpa,
        description: description || 'UPI Payment for wallet deposit'
      }
    });

    // Store transaction in database
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type: 'DEPOSIT',
        amount,
        currency: 'INR',
        status: 'PENDING',
        reference: razorpayOrder.id,
        description: description || 'UPI Payment for wallet deposit',
        metadata: JSON.stringify({
          razorpay_order_id: razorpayOrder.id,
          payment_method: 'upi',
          vpa: vpa,
          receipt,
          upi_intent: true
        })
      }
    });

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: RAZORPAY_KEY_ID,
      method: 'upi',
      vpa: vpa,
      description: razorpayOrder.notes?.description,
      order: {
        id: transaction.id,
        receipt,
        type: 'upi'
      },
      upi: {
        vpa: vpa,
        flow: 'intent' // For UPI Intent flow
      }
    });

  } catch (error) {
    console.error('UPI payment error:', error);
    return NextResponse.json(
      { error: 'Failed to create UPI payment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vpa = searchParams.get('vpa');

    if (!vpa) {
      return NextResponse.json(
        { error: 'VPA is required' },
        { status: 400 }
      );
    }

    // Validate VPA format
    if (!isValidVPA(vpa)) {
      return NextResponse.json(
        { error: 'Invalid VPA format' },
        { status: 400 }
      );
    }

    // Check if VPA is valid using Razorpay's VPA validation API
    const isValid = await validateVPA(vpa);

    return NextResponse.json({
      success: true,
      vpa: vpa,
      isValid: isValid,
      bank: isValid ? await getBankDetails(vpa) : null
    });

  } catch (error) {
    console.error('VPA validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate VPA' },
      { status: 500 }
    );
  }
}

async function createUPIOrder(orderData: any) {
  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
  
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Razorpay UPI API error: ${error}`);
  }

  return await response.json();
}

async function validateVPA(vpa: string): Promise<boolean> {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    
    const response = await fetch(`https://api.razorpay.com/v1/upi/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vpa })
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true && data.valid === true;
  } catch (error) {
    console.error('VPA validation API error:', error);
    return false;
  }
}

async function getBankDetails(vpa: string): Promise<string | null> {
  try {
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    
    const response = await fetch(`https://api.razorpay.com/v1/upi/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vpa })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.bank_name || null;
  } catch (error) {
    console.error('Bank details fetch error:', error);
    return null;
  }
}

function isValidVPA(vpa: string): boolean {
  // Basic VPA format validation: username@bankcode
  const vpaRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  return vpaRegex.test(vpa) && vpa.length >= 3 && vpa.length <= 255;
}