'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Loader2, 
  RefreshCw, 
  ExternalLink,
  AlertCircle,
  Smartphone,
  CreditCard,
  Building2
} from 'lucide-react';

interface PaymentStatus {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  amount: number;
  currency: string;
  method: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    payment_method?: string;
    bank?: string;
    vpa?: string;
    wallet?: string;
  };
}

interface PaymentStatusTrackerProps {
  orderId: string;
  onStatusChange?: (status: PaymentStatus) => void;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PaymentStatusTracker: React.FC<PaymentStatusTrackerProps> = ({
  orderId,
  onStatusChange,
  autoRefresh = true,
  refreshInterval = 5000
}) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchPaymentStatus();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh && paymentStatus?.status === 'PENDING') {
      interval = setInterval(fetchPaymentStatus, refreshInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderId, autoRefresh, refreshInterval, paymentStatus?.status]);

  const fetchPaymentStatus = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/payments/status/${orderId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus(data.payment);
        setLastUpdated(new Date());
        onStatusChange?.(data.payment);
      } else {
        setError(data.error || 'Failed to fetch payment status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'PROCESSING':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 25;
      case 'PROCESSING':
        return 75;
      case 'COMPLETED':
        return 100;
      case 'FAILED':
      case 'CANCELLED':
        return 0;
      default:
        return 0;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return <Smartphone className="h-4 w-4" />;
      case 'netbanking':
        return <Building2 className="h-4 w-4" />;
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading && !paymentStatus) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading payment status...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            Error Loading Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchPaymentStatus} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!paymentStatus) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Payment status not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payment Status</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchPaymentStatus}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Order ID: {paymentStatus.id}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(paymentStatus.status)}
            <Badge className={getStatusColor(paymentStatus.status)}>
              {paymentStatus.status}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              {formatCurrency(paymentStatus.amount, paymentStatus.currency)}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              {getMethodIcon(paymentStatus.method)}
              <span className="ml-1 capitalize">{paymentStatus.method}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{getProgressValue(paymentStatus.status)}%</span>
          </div>
          <Progress value={getProgressValue(paymentStatus.status)} className="h-2" />
        </div>

        {/* Payment Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Reference:</span>
            <span className="font-mono">{paymentStatus.reference}</span>
          </div>
          
          {paymentStatus.metadata.bank && (
            <div className="flex justify-between">
              <span className="text-gray-600">Bank:</span>
              <span>{paymentStatus.metadata.bank}</span>
            </div>
          )}
          
          {paymentStatus.metadata.vpa && (
            <div className="flex justify-between">
              <span className="text-gray-600">UPI ID:</span>
              <span className="font-mono">{paymentStatus.metadata.vpa}</span>
            </div>
          )}
          
          {paymentStatus.metadata.wallet && (
            <div className="flex justify-between">
              <span className="text-gray-600">Wallet:</span>
              <span>{paymentStatus.metadata.wallet}</span>
            </div>
          )}
        </div>

        {/* Razorpay Links */}
        {paymentStatus.metadata.razorpay_order_id && (
          <div className="pt-3 border-t">
            <div className="space-y-2">
              <a
                href={`https://dashboard.razorpay.com/app/orders/${paymentStatus.metadata.razorpay_order_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
              >
                <span>View in Razorpay Dashboard</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              {paymentStatus.metadata.razorpay_payment_id && (
                <a
                  href={`https://dashboard.razorpay.com/app/payments/${paymentStatus.metadata.razorpay_payment_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                >
                  <span>View Payment Details</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-3 border-t space-y-1 text-xs text-gray-500">
          <div>Created: {formatDateTime(paymentStatus.createdAt)}</div>
          {lastUpdated && paymentStatus.status !== 'PENDING' && (
            <div>Updated: {formatDateTime(paymentStatus.updatedAt)}</div>
          )}
        </div>

        {/* Auto-refresh notice */}
        {autoRefresh && paymentStatus.status === 'PENDING' && (
          <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Auto-refreshing every {refreshInterval / 1000}s
          </div>
        )}
      </CardContent>
    </Card>
  );
};