'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Smartphone, 
  Building2, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  QrCode,
  Copy
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'upi' | 'netbanking' | 'card';
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  isAvailable: boolean;
  fees: number;
  minAmount: number;
  maxAmount: number;
  features: string[];
}

interface UPIValidatorProps {
  vpa: string;
  onVPAChange: (vpa: string) => void;
  onValidationChange: (isValid: boolean) => void;
}

const UPIValidator: React.FC<UPIValidatorProps> = ({ vpa, onVPAChange, onValidationChange }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    bankName?: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (vpa && isValidVPA(vpa)) {
      validateVPA(vpa);
    } else {
      setValidationResult(null);
      onValidationChange(false);
    }
  }, [vpa]);

  const validateVPA = async (upiId: string) => {
    setIsValidating(true);
    try {
      const response = await fetch(`/api/payments/upi?vpa=${encodeURIComponent(upiId)}`);
      const data = await response.json();
      
      if (data.success) {
        setValidationResult({
          isValid: data.isValid,
          bankName: data.bank,
          error: data.isValid ? undefined : 'Invalid UPI ID'
        });
        onValidationChange(data.isValid);
      } else {
        setValidationResult({
          isValid: false,
          error: 'Validation failed'
        });
        onValidationChange(false);
      }
    } catch (error) {
      setValidationResult({
        isValid: false,
        error: 'Validation service unavailable'
      });
      onValidationChange(false);
    } finally {
      setIsValidating(false);
    }
  };

  const isValidVPA = (upiId: string): boolean => {
    const vpaRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return vpaRegex.test(upiId) && upiId.length >= 3 && upiId.length <= 255;
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="vpa">UPI ID (VPA)</Label>
        <div className="relative">
          <Input
            id="vpa"
            placeholder="username@bankcode"
            value={vpa}
            onChange={(e) => onVPAChange(e.target.value)}
            className={validationResult?.isValid ? 'border-green-500' : validationResult ? 'border-red-500' : ''}
          />
          {isValidating && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
          )}
          {validationResult?.isValid && !isValidating && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
      </div>

      {validationResult && (
        <Alert className={validationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {validationResult.isValid ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Valid UPI ID {validationResult.bankName && `• ${validationResult.bankName}`}
              </AlertDescription>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {validationResult.error}
              </AlertDescription>
            </>
          )}
        </Alert>
      )}

      <div className="text-xs text-gray-500">
        <p>Examples:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVPAChange('user@paytm')}
            className="h-6 px-2 text-xs"
          >
            user@paytm
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVPAChange('user@okicici')}
            className="h-6 px-2 text-xs"
          >
            user@okicici
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVPAChange('user@gpay')}
            className="h-6 px-2 text-xs"
          >
            user@gpay
          </Button>
        </div>
      </div>
    </div>
  );
};

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  vpa: string;
  onVPAChange: (vpa: string) => void;
  onValidationChange: (isValid: boolean) => void;
  onPayment: () => void;
  isProcessing: boolean;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
  amount,
  onAmountChange,
  vpa,
  onVPAChange,
  onValidationChange,
  onPayment,
  isProcessing
}) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      type: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Pay using any UPI app',
      isAvailable: true,
      fees: 0,
      minAmount: 100,
      maxAmount: 100000,
      features: ['Instant processing', 'No charges', '24/7 available']
    },
    {
      id: 'netbanking',
      type: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'Direct bank transfer',
      isAvailable: true,
      fees: 0,
      minAmount: 500,
      maxAmount: 500000,
      features: ['Secure transfer', 'All banks supported', 'Bank-level security']
    },
    {
      id: 'card',
      type: 'card',
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Pay using cards',
      isAvailable: true,
      fees: 1.5,
      minAmount: 100,
      maxAmount: 200000,
      features: ['All cards accepted', 'EMI available', 'Secure payment']
    }
  ];

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);

  const getTotalAmount = () => {
    const baseAmount = parseFloat(amount) || 0;
    const fees = selectedPaymentMethod ? (baseAmount * selectedPaymentMethod.fees / 100) : 0;
    return baseAmount + fees;
  };

  const isFormValid = () => {
    const baseAmount = parseFloat(amount) || 0;
    if (!selectedPaymentMethod || baseAmount < selectedPaymentMethod.minAmount || baseAmount > selectedPaymentMethod.maxAmount) {
      return false;
    }
    if (selectedMethod === 'upi' && !vpa) {
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div>
        <Label htmlFor="amount">Amount (₹)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          min={selectedPaymentMethod?.minAmount || 100}
          max={selectedPaymentMethod?.maxAmount || 100000}
        />
        {selectedPaymentMethod && (
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Min: ₹{selectedPaymentMethod.minAmount.toLocaleString()}</span>
            <span>Max: ₹{selectedPaymentMethod.maxAmount.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Payment Method Selection */}
      <div>
        <Label>Payment Method</Label>
        <div className="grid gap-3 mt-2">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id}
              className={`cursor-pointer transition-all ${
                selectedMethod === method.id 
                  ? 'ring-2 ring-blue-500 border-blue-500' 
                  : 'hover:border-gray-300'
              } ${!method.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
 => method.isAvailable && onMethodChange(method.id)}
            >
              <CardContent className="              onClick={()p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <method.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={method.fees > 0 ? 'secondary' : 'default'} className={method.fees === 0 ? 'bg-green-100 text-green-800' : ''}>
                      {method.fees > 0 ? `${method.fees}% fee` : 'Free'}
                    </Badge>
                    {!method.isAvailable && (
                      <div className="text-xs text-gray-500 mt-1">Coming Soon</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* UPI Validator */}
      {selectedMethod === 'upi' && (
        <UPIValidator
          vpa={vpa}
          onVPAChange={onVPAChange}
          onValidationChange={onValidationChange}
        />
      )}

      {/* Payment Summary */}
      {selectedPaymentMethod && amount && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span>₹{parseFloat(amount || '0').toLocaleString()}</span>
              </div>
              {selectedPaymentMethod.fees > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Processing fee ({selectedPaymentMethod.fees}%):</span>
                  <span>₹{(parseFloat(amount || '0') * selectedPaymentMethod.fees / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span>₹{getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
        <Shield className="h-4 w-4" />
        <span>Secured by 256-bit encryption • SEBI compliant • PCI DSS certified</span>
      </div>

      {/* Pay Button */}
      <Button
        onClick={onPayment}
        disabled={!isFormValid() || isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        size="lg"
      >
        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Pay ₹{getTotalAmount().toFixed(2)}
      </Button>
    </div>
  );
};