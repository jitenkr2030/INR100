import { GET, POST } from '@/app/api/payments/create-order/route';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    transaction: {
      create: jest.fn(),
    },
  })),
}));

// Mock environment variables
process.env.RAZORPAY_KEY_ID = 'test_key_id';
process.env.RAZORPAY_KEY_SECRET = 'test_key_secret';

// Mock fetch for Razorpay API
global.fetch = jest.fn();

describe('/api/payments/create-order', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it('creates a payment order successfully', async () => {
    const mockRazorpayResponse = {
      id: 'order_test123',
      amount: 100000, // Amount in paise
      currency: 'INR',
      receipt: 'rcpt_1234567890',
      status: 'created',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRazorpayResponse),
    });

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        description: 'Test payment',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.order_id).toBe('order_test123');
    expect(data.amount).toBe(100000);
    expect(data.key).toBe('test_key_id');
  });

  it('returns error for invalid amount', async () => {
    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 0,
        currency: 'INR',
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('returns error for missing amount', async () => {
    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        currency: 'INR',
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('handles Razorpay API errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: () => Promise.resolve('Bad Request'),
    });

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to create payment order');
  });

  it('stores transaction in database', async () => {
    const mockRazorpayResponse = {
      id: 'order_test123',
      amount: 100000,
      currency: 'INR',
      receipt: 'rcpt_1234567890',
      status: 'created',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRazorpayResponse),
    });

    const mockPrismaClient = {
      transaction: {
        create: jest.fn().mockResolvedValue({
          id: 'txn123',
          userId: 'user123',
          type: 'DEPOSIT',
          amount: 1000,
          currency: 'INR',
          status: 'PENDING',
          reference: 'order_test123',
        }),
      },
    };

    // Mock Prisma client
    jest.mocked(require('@prisma/client').PrismaClient).mockImplementation(() => mockPrismaClient);

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        description: 'Test payment',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockPrismaClient.transaction.create).toHaveBeenCalledWith({
      data: {
        userId: 'user123',
        type: 'DEPOSIT',
        amount: 1000,
        currency: 'INR',
        status: 'PENDING',
        reference: 'order_test123',
        description: 'Test payment',
        metadata: expect.stringContaining('razorpay_order_id'),
      },
    });
  });

  it('uses default currency when not provided', async () => {
    const mockRazorpayResponse = {
      id: 'order_test123',
      amount: 100000,
      currency: 'INR',
      receipt: 'rcpt_1234567890',
      status: 'created',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRazorpayResponse),
    });

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.currency).toBe('INR');
  });

  it('handles network errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to create payment order');
  });

  it('includes metadata in transaction record', async () => {
    const mockRazorpayResponse = {
      id: 'order_test123',
      amount: 100000,
      currency: 'INR',
      receipt: 'rcpt_1234567890',
      status: 'created',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRazorpayResponse),
    });

    const metadata = {
      userId: 'user123',
      paymentMethod: 'upi',
      customField: 'customValue',
    };

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        description: 'Test payment',
        metadata,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.order.metadata).toMatchObject(metadata);
  });

  it('generates unique receipt ID', async () => {
    const mockRazorpayResponse = {
      id: 'order_test123',
      amount: 100000,
      currency: 'INR',
      receipt: 'rcpt_1234567890',
      status: 'created',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRazorpayResponse),
    });

    const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1000,
        currency: 'INR',
        type: 'wallet_deposit',
        metadata: { userId: 'user123' },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    // Verify that fetch was called with correct order data
    expect(fetch).toHaveBeenCalledWith(
      'https://api.razorpay.com/v1/orders',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': expect.stringContaining('Basic'),
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('receipt'),
      })
    );
  });
});