import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', type, description, metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Generate unique receipt ID
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      notes: {
        type,
        description,
        ...metadata
      }
    });

    // Store order in database
    const order = await prisma.transaction.create({
      data: {
        userId: metadata.userId,
        type: 'DEPOSIT',
        amount,
        currency,
        status: 'PENDING',
        reference: razorpayOrder.id,
        description: description || 'Payment for wallet deposit',
        metadata: JSON.stringify({
          razorpay_order_id: razorpayOrder.id,
          receipt,
          ...metadata
        })
      }
    });

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: RAZORPAY_KEY_ID,
      description: razorpayOrder.notes?.description,
      order: {
        id: order.id,
        receipt,
        type
      }
    });

  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

async function createRazorpayOrder(orderData: any) {
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
    throw new Error(`Razorpay API error: ${error}`);
  }

  return await response.json();
}