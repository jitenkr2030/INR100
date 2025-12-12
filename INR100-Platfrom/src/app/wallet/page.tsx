"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { 
  Wallet, 
  Plus, 
  Minus, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Smartphone,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  History,
  Gift,
  Shield,
  Zap,
  QrCode,
  Copy,
  Download,
  Upload,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";

interface WalletData {
  id: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  statistics: {
    totalDeposits: number;
    totalWithdrawals: number;
    transactionCount: number;
  };
}

interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'INVESTMENT' | 'DIVIDEND' | 'REWARD' | 'REFUND' | 'FEE';
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  reference: string;
  description: string;
  createdAt: string;
  metadata: string;
}

interface PaymentOrder {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  key: string;
  description: string;
  method: string;
  vpa?: string;
}

export default function WalletPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [upiVPA, setUpiVPA] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentOrder, setPaymentOrder] = useState<PaymentOrder | null>(null);

  useEffect(() => {
    if (user) {
      fetchWalletData();
    }
  }, [user]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/wallet?userId=${user?.id}`);
      const data = await response.json();
      
      if (data.success) {
        setWalletData(data.wallet);
        setTransactions(data.transactions.data);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async () => {
    if (!addAmount || parseFloat(addAmount) <= 0 || !selectedPaymentMethod) {
      return;
    }

    setLoadingPayment(true);
    try {
      let response;
      if (selectedPaymentMethod === 'upi') {
        response = await fetch('/api/payments/upi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(addAmount),
            vpa: upiVPA,
            userId: user?.id,
            description: 'Wallet deposit via UPI'
          })
        });
      } else {
        response = await fetch('/api/payments/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(addAmount),
            currency: 'INR',
            type: 'wallet_deposit',
            description: 'Wallet deposit',
            metadata: { userId: user?.id, method: selectedPaymentMethod }
          })
        });
      }

      const data = await response.json();
      
      if (data.success) {
        setPaymentOrder(data);
        initializeRazorpay(data);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Failed to create payment order. Please try again.');
    } finally {
      setLoadingPayment(false);
    }
  };

  const initializeRazorpay = (orderData: PaymentOrder) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'INR100 Platform',
        description: orderData.description,
        order_id: orderData.order_id,
        prefill: {
          email: user?.email,
          contact: user?.phone || '+919876543210'
        },
        theme: {
          color: '#3B82F6'
        },
        method: {
          upi: selectedPaymentMethod === 'upi',
          netbanking: selectedPaymentMethod === 'netbanking',
          card: selectedPaymentMethod === 'card',
          wallet: selectedPaymentMethod === 'wallet'
        },
        handler: function (response: any) {
          verifyPayment(response);
        }
      };

      // @ts-ignore
      const rzp = new Razorpay(options);
      rzp.open();
    };
    document.head.appendChild(script);
  };

  const verifyPayment = async (response: any) => {
    try {
      const verificationResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
      });

      const data = await verificationResponse.json();
      
      if (data.success) {
        alert('Payment successful! Your wallet has been credited.');
        fetchWalletData();
        setAddAmount('');
        setUpiVPA('');
        setPaymentOrder(null);
        setActiveTab('overview');
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock payment methods
  const paymentMethods = [
    {
      id: "1",
      type: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using any UPI app",
      isAvailable: true,
      fees: 0,
      minAmount: 100,
      maxAmount: 100000
    },
    {
      id: "2",
      type: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "Direct bank transfer",
      isAvailable: true,
      fees: 0,
      minAmount: 500,
      maxAmount: 500000
    },
    {
      id: "3",
      type: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Pay using cards",
      isAvailable: true,
      fees: 1.5,
      minAmount: 100,
      maxAmount: 200000
    },
    {
      id: "4",
      type: "wallet",
      name: "Wallet Transfer",
      icon: Wallet,
      description: "Transfer from other wallets",
      isAvailable: false,
      fees: 0,
      minAmount: 100,
      maxAmount: 50000
    }
  ];

  // Mock quick actions
  const quickActions = [
    { title: "Add Money", icon: Plus, description: "Load your wallet", color: "bg-green-100 text-green-600" },
    { title: "Withdraw", icon: Minus, description: "Get your money", color: "bg-red-100 text-red-600" },
    { title: "Invest", icon: TrendingUp, description: "Start investing", color: "bg-blue-100 text-blue-600" },
    { title: "History", icon: History, description: "View transactions", color: "bg-purple-100 text-purple-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit": return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "withdrawal": return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case "investment": return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "reward": return <Gift className="h-4 w-4 text-purple-600" />;
      default: return <Wallet className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleWithdrawMoney = () => {
    if (!withdrawAmount) return;
    // In real app, this would initiate withdrawal process
    alert('Withdrawal feature will be available soon. Please contact support for immediate assistance.');
  };

  if (loading) {
    return (
      <DashboardLayout user={{
        name: user?.name || "User",
        email: user?.email || "",
        avatar: user?.avatar || "",
        level: user?.level || 1,
        xp: user?.xp || 0,
        nextLevelXp: 3000,
        walletBalance: 0,
        notifications: 3
      }}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={{
      name: user?.name || "User",
      email: user?.email || "",
      avatar: user?.avatar || "",
      level: user?.level || 1,
      xp: user?.xp || 0,
      nextLevelXp: 3000,
      walletBalance: walletData?.balance || 0,
      notifications: 3
    }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Wallet className="h-8 w-8 text-green-600" />
              <span>My Wallet</span>
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your funds, add money, withdraw, and track transactions
            </p>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-blue-600">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-white mb-4 md:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-medium opacity-90">Available Balance</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-4xl font-bold">
                  {showBalance ? formatCurrency(walletData?.balance || 0) : '••••••'}
                </div>
                <div className="text-sm opacity-75 mt-1">
                  Last updated: {walletData?.updatedAt ? new Date(walletData.updatedAt).toLocaleTimeString() : 'Never'}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="secondary" 
                  className="bg-white text-green-600 hover:bg-gray-100"
                  onClick={() => setActiveTab("add")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600"
                  onClick={() => setActiveTab("withdraw")}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(walletData?.statistics.totalDeposits || 0)}
              </div>
              <div className="text-sm text-gray-600">Total Deposits</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(walletData?.statistics.totalWithdrawals || 0)}
              </div>
              <div className="text-sm text-gray-600">Total Withdrawals</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {walletData?.statistics.transactionCount || 0}
              </div>
              <div className="text-sm text-gray-600">Transactions</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {transactions.filter(t => t.status === 'PENDING').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="add">Add Money</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Transactions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Transactions</span>
                </CardTitle>
                <CardDescription>Your latest wallet activities</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Wallet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No transactions yet</p>
                    <p className="text-sm text-gray-400">Add money to your wallet to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTransactionIcon(transaction.type.toLowerCase())}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{transaction.type.toLowerCase()}</div>
                            <div className="text-sm text-gray-600">{transaction.description}</div>
                            <div className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</div>
                            {transaction.reference && (
                              <div className="text-xs text-gray-400">Ref: {transaction.reference}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${
                            transaction.type === 'DEPOSIT' || transaction.type === 'REWARD' ? "text-green-600" : "text-red-600"
                          }`}>
                            {transaction.type === 'DEPOSIT' || transaction.type === 'REWARD' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </div>
                          <Badge className={getStatusColor(transaction.status.toLowerCase())}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Money Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-green-600" />
                    <span>Add Money to Wallet</span>
                  </CardTitle>
                  <CardDescription>Load your wallet instantly using various payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      min={100}
                      max={100000}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Min: ₹100</span>
                      <span>Max: ₹1,00,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Payment Method
                    </label>
                    <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="h-4 w-4" />
                            <span>UPI</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="netbanking">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Net Banking</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="card">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Debit/Credit Card</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPaymentMethod === 'upi' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        UPI ID (VPA)
                      </label>
                      <Input
                        placeholder="username@bankcode"
                        value={upiVPA}
                        onChange={(e) => setUpiVPA(e.target.value)}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Enter your UPI ID (e.g., username@paytm, username@okicici)
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod && (
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        {(() => {
                          const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
                          if (!method) return null;
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <method.icon className="h-5 w-5" />
                                <span className="font-medium">{method.name}</span>
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                              <div className="flex justify-between text-sm">
                                <span>Processing Fee:</span>
                                <span className={method.fees > 0 ? "text-orange-600" : "text-green-600"}>
                                  {method.fees > 0 ? `${method.fees}%` : "Free"}
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  )}

                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={handleAddMoney}
                    disabled={loadingPayment || !addAmount || !selectedPaymentMethod || (selectedPaymentMethod === 'upi' && !upiVPA)}
                  >
                    {loadingPayment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add ₹{addAmount ? parseInt(addAmount).toLocaleString('en-IN') : '0'}
                  </Button>

                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Secured by 256-bit encryption • SEBI compliant</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Amounts */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Amounts</CardTitle>
                  <CardDescription>Choose from popular amounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[500, 1000, 2500, 5000, 10000, 25000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setAddAmount(amount.toString())}
                        className="justify-center"
                      >
                        ₹{amount.toLocaleString('en-IN')}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Payment Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Instant processing</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>No hidden charges</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>24/7 availability</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Multiple payment options</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Withdraw Money Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Minus className="h-5 w-5 text-red-600" />
                    <span>Withdraw Money</span>
                  </CardTitle>
                  <CardDescription>Transfer money from your wallet to your bank account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min={100}
                      max={walletData.balance}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Available: {formatCurrency(walletData?.balance || 0)}</span>
                      <span>Min: ₹100</span>
                    </div>
                  </div>

                  <Card className="border border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium text-orange-800">Processing Time</div>
                          <div className="text-sm text-orange-700">
                            Withdrawals are processed within 24-48 hours
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={handleWithdrawMoney}
                    disabled={!withdrawAmount || parseInt(withdrawAmount) > (walletData?.balance || 0)}
                  >
                    Withdraw ₹{withdrawAmount ? parseInt(withdrawAmount).toLocaleString('en-IN') : '0'}
                  </Button>

                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>All withdrawals are secure and compliant with regulations</span>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Account */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Linked Bank Account</CardTitle>
                  <CardDescription>Your withdrawals will be credited to this account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">HDFC Bank</div>
                          <div className="text-sm text-gray-600">**** **** **** 1234</div>
                          <div className="text-xs text-gray-500">IFSC: HDFC0001234</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Primary
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium">Withdrawal Limits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Transaction:</span>
                        <span className="font-medium">₹50,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Daily Limit:</span>
                        <span className="font-medium">₹1,00,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Monthly Limit:</span>
                        <span className="font-medium">₹5,00,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Transaction History</span>
                </CardTitle>
                <CardDescription>Complete history of all your wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No transactions yet</p>
                    <p className="text-sm text-gray-400">Your transaction history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTransactionIcon(transaction.type.toLowerCase())}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{transaction.type.toLowerCase()}</div>
                            <div className="text-sm text-gray-600">{transaction.description}</div>
                            <div className="text-xs text-gray-500">
                              {formatDate(transaction.createdAt)} {transaction.reference && `• Ref: ${transaction.reference}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${
                            transaction.type === 'DEPOSIT' || transaction.type === 'REWARD' ? "text-green-600" : "text-red-600"
                          }`}>
                            {transaction.type === 'DEPOSIT' || transaction.type === 'REWARD' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </div>
                          <div className="flex items-center justify-end mt-1">
                            <Badge className={getStatusColor(transaction.status.toLowerCase())}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}