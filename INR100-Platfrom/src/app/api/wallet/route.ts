import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      );
    }

    // Calculate total deposits and withdrawals
    const [totalDeposits, totalWithdrawals] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId,
          walletId: wallet.id,
          type: 'DEPOSIT',
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          walletId: wallet.id,
          type: 'WITHDRAWAL',
          status: 'COMPLETED'
        },
        _sum: { amount: true }
      })
    ]);

    // Get recent transactions with pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const allTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        walletId: wallet.id
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    const totalTransactions = await prisma.transaction.count({
      where: {
        userId,
        walletId: wallet.id
      }
    });

    return NextResponse.json({
      success: true,
      wallet: {
        id: wallet.id,
        balance: wallet.balance,
        currency: wallet.currency,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
        statistics: {
          totalDeposits: totalDeposits._sum.amount || 0,
          totalWithdrawals: totalWithdrawals._sum.amount || 0,
          transactionCount: totalTransactions
        }
      },
      transactions: {
        data: allTransactions,
        pagination: {
          page,
          limit,
          total: totalTransactions,
          pages: Math.ceil(totalTransactions / limit)
        }
      }
    });

  } catch (error) {
    console.error('Wallet fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, amount, description, metadata } = body;

    if (!userId || !type || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get or create wallet
    const wallet = await prisma.wallet.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        balance: 0,
        currency: 'INR'
      }
    });

    // For withdrawals, check if user has sufficient balance
    if (type === 'WITHDRAWAL' && wallet.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        walletId: wallet.id,
        type,
        amount,
        currency: 'INR',
        status: 'PENDING',
        description: description || `${type.toLowerCase()} transaction`,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });

    // Update wallet balance for deposits
    if (type === 'DEPOSIT') {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            increment: amount
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      transaction
    });

  } catch (error) {
    console.error('Wallet operation error:', error);
    return NextResponse.json(
      { error: 'Failed to process wallet operation' },
      { status: 500 }
    );
  }
}