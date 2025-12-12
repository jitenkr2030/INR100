import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find transaction by Razorpay order ID or internal transaction ID
    let transaction = await prisma.transaction.findFirst({
      where: {
        OR: [
          { reference: orderId },
          { id: orderId }
        ]
      },
      include: {
        user: {
          select: { name: true, email: true }
        },
        wallet: {
          select: { id: true, balance: true }
        }
      }
    });

    // If not found by order ID, try to find by metadata
    if (!transaction) {
      transaction = await prisma.transaction.findFirst({
        where: {
          metadata: {
            contains: `"razorpay_order_id":"${orderId}"`
          }
        },
        include: {
          user: {
            select: { name: true, email: true }
          },
          wallet: {
            select: { id: true, balance: true }
          }
        }
      });
    }

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Parse metadata to get Razorpay details
    let metadata = {};
    try {
      metadata = transaction.metadata ? JSON.parse(transaction.metadata) : {};
    } catch (error) {
      console.error('Error parsing transaction metadata:', error);
    }

    // If payment is completed, fetch latest wallet balance
    let currentWalletBalance = transaction.wallet?.balance || 0;
    if (transaction.status === 'COMPLETED' && transaction.walletId) {
      const wallet = await prisma.wallet.findUnique({
        where: { id: transaction.walletId },
        select: { balance: true }
      });
      currentWalletBalance = wallet?.balance || 0;
    }

    // Determine payment method from metadata or transaction type
    let paymentMethod = 'unknown';
    if (metadata.payment_method) {
      paymentMethod = metadata.payment_method;
    } else if (metadata.vpa) {
      paymentMethod = 'upi';
    } else if (metadata.bank) {
      paymentMethod = 'netbanking';
    } else if (transaction.type === 'DEPOSIT') {
      paymentMethod = 'card'; // Default for deposits
    }

    // Calculate progress based on status
    let progress = 0;
    switch (transaction.status) {
      case 'P = 25;
ENDING':
        progress        break;
      case 'COMPLETED':
        progress = 100;
        break;
      case 'FAILED':
      case 'CANCELLED':
        progress = 0;
        break;
      default:
        progress = 50;
    }

    const paymentStatus = {
      id: transaction.id,
      status: transaction.status,
      amount: transaction.amount,
      currency: transaction.currency,
      method: paymentMethod,
      reference: transaction.reference || transaction.id,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      metadata: {
        razorpay_order_id: metadata.razorpay_order_id,
        razorpay_payment_id: metadata.razorpay_payment_id,
        razorpay_signature: metadata.razorpay_signature,
        payment_method: metadata.payment_method,
        bank: metadata.bank,
        vpa: metadata.vpa,
        wallet: metadata.wallet,
        fee: transaction.fee,
        description: transaction.description
      },
      user: transaction.user,
      walletBalance: currentWalletBalance,
      progress: progress
    };

    return NextResponse.json({
      success: true,
      payment: paymentStatus
    });

  } catch (error) {
    console.error('Payment status fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;
    const body = await request.json();
    const { action, status } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        OR: [
          { reference: orderId },
          { id: orderId }
        ]
      }
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    let updatedTransaction;

    switch (action) {
      case 'retry':
        // Reset transaction to pending for retry
        updatedTransaction = await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'PENDING',
            metadata: JSON.stringify({
              ...JSON.parse(transaction.metadata || '{}'),
              retry_count: (JSON.parse(transaction.metadata || '{}').retry_count || 0) + 1,
              last_retry_at: new Date().toISOString()
            })
          }
        });
        break;

      case 'cancel':
        // Cancel the transaction
        if (transaction.status === 'PENDING') {
          updatedTransaction = await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
              status: 'CANCELLED',
              metadata: JSON.stringify({
                ...JSON.parse(transaction.metadata || '{}'),
                cancelled_at: new Date().toISOString(),
                cancellation_reason: body.reason || 'User cancelled'
              })
            }
          });
        } else {
          return NextResponse.json(
            { error: 'Cannot cancel transaction that is not pending' },
            { status: 400 }
          );
        }
        break;

      case 'update_status':
        // Update transaction status (admin only)
        if (!status || !['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'].includes(status)) {
          return NextResponse.json(
            { error: 'Valid status is required' },
            { status: 400 }
          );
        }

        updatedTransaction = await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: status,
            metadata: JSON.stringify({
              ...JSON.parse(transaction.metadata || '{}'),
              status_updated_at: new Date().toISOString(),
              status_updated_by: 'admin'
            })
          }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      transaction: updatedTransaction,
      message: `Transaction ${action} successful`
    });

  } catch (error) {
    console.error('Payment status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}