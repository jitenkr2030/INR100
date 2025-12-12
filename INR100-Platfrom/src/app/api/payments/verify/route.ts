import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification parameters' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (razorpay_signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await fetchPaymentDetails(razorpay_payment_id);
    
    if (!paymentDetails || paymentDetails.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Update transaction status in database
    const transaction = await prisma.transaction.findFirst({
      where: {
        reference: razorpay_order_id,
        status: 'PENDING'
      }
    });

    if (transaction) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'COMPLETED',
          metadata: JSON.stringify({
            ...JSON.parse(transaction.metadata || '{}'),
            razorpay_payment_id: razorpay_payment_id,
            razorpay_verified_at: new Date().toISOString(),
            payment_method: paymentDetails.method,
            bank: paymentDetails.bank,
            wallet: paymentDetails.wallet,
            vpa: paymentDetails.vpa
          })
        }
      });

      // Update wallet balance
      await prisma.wallet.upsert({
        where: { userId: transaction.userId },
        update: {
          balance: {
            increment: transaction.amount
          }
        },
        create: {
          userId: transaction.userId,
          balance: transaction.amount,
          currency: transaction.currency
        }
      });
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: paymentDetails.id,
        order_id: paymentDetails.order_id,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        method: paymentDetails.method,
        status: paymentDetails.status,
        captured: paymentDetails.captured,
        created_at: paymentDetails.created_at,
        bank: paymentDetails.bank,
        wallet: paymentDetails.wallet,
        vpa: paymentDetails.vpa
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

async function fetchPaymentDetails(paymentId: string) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
  
  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch payment details: ${error}`);
  }

  return await response.json();
}