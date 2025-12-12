import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    console.log('Received webhook event:', event.event);

    // Handle different event types
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity);
        break;
      
      case 'payment.authorized':
        await handlePaymentAuthorized(event.payload.payment.entity);
        break;
      
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity);
        break;
      
      default:
        console.log('Unhandled event type:', event.event);
    }

    return NextResponse.json({ status: 'ok' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    // Find transaction by Razorpay order ID
    const transaction = await prisma.transaction.findFirst({
      where: {
        reference: payment.order_id,
        status: 'PENDING'
      },
      include: {
        user: true,
        wallet: true
      }
    });

    if (!transaction) {
      console.error('Transaction not found for payment:', payment.id);
      return;
    }

    // Update transaction status
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: 'COMPLETED',
        metadata: JSON.stringify({
          ...JSON.parse(transaction.metadata || '{}'),
          razorpay_payment_id: payment.id,
          razorpay_captured_at: new Date().toISOString(),
          payment_method: payment.method,
          bank: payment.bank,
          wallet: payment.wallet,
          vpa: payment.vpa,
          email: payment.email,
          contact: payment.contact
        })
      }
    });

    // Update or create wallet
    const wallet = await prisma.wallet.upsert({
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

    // Create wallet transaction record
    await prisma.transaction.create({
      data: {
        userId: transaction.userId,
        walletId: wallet.id,
        type: 'DEPOSIT',
        amount: transaction.amount,
        currency: transaction.currency,
        status: 'COMPLETED',
        reference: payment.id,
        description: `Wallet deposit via ${payment.method}`,
        metadata: JSON.stringify({
          razorpay_payment_id: payment.id,
          payment_method: payment.method,
          bank: payment.bank,
          wallet: payment.wallet,
          vpa: payment.vpa
        })
      }
    });

    console.log(`Payment captured successfully: ${payment.id} for order ${payment.order_id}`);

  } catch (error) {
    console.error('Error handling payment capture:', error);
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    // Update transaction status to failed
    const transaction = await prisma.transaction.findFirst({
      where: {
        reference: payment.order_id,
        status: 'PENDING'
      }
    });

    if (transaction) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
          metadata: JSON.stringify({
            ...JSON.parse(transaction.metadata || '{}'),
            razorpay_payment_id: payment.id,
            razorpay_failed_at: new Date().toISOString(),
            failure_reason: payment.error_description
          })
        }
      });
    }

    console.log(`Payment failed: ${payment.id} for order ${payment.order_id}`);

  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePaymentAuthorized(payment: any) {
  console.log(`Payment authorized: ${payment.id} for order ${payment.order_id}`);
  // This is for 3DS payments that need additional verification
}

async function handleOrderPaid(order: any) {
  console.log(`Order paid: ${order.id} with amount ${order.amount}`);
  // Additional processing if needed
}