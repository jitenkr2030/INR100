"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Wallet,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from "lucide-react";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("30days");

  // Sample transaction data
  const transactions = [
    {
      id: "TXN001",
      type: "buy",
      asset: "RELIANCE",
      assetType: "Stock",
      quantity: 10,
      price: 2500,
      amount: 25000,
      fees: 25,
      total: 25025,
      status: "completed",
      date: "2024-12-12T14:30:00Z",
      orderId: "ORD001",
      paymentMethod: "UPI"
    },
    {
      id: "TXN002",
      type: "sell",
      asset: "TCS",
      assetType: "Stock",
      quantity: 5,
      price: 3200,
      amount: 16000,
      fees: 16,
      total: 15984,
      status: "completed",
      date: "2024-12-11T10:15:00Z",
      orderId: "ORD002",
      paymentMethod: "Net Banking"
    },
    {
      id: "TXN003",
      type: "buy",
      asset: "AXIS Bluechip Fund",
      assetType: "Mutual Fund",
      quantity: 100,
      price: 45,
      amount: 4500,
      fees: 0,
      total: 4500,
      status: "pending",
      date: "2024-12-10T16:45:00Z",
      orderId: "ORD003",
      paymentMethod: "UPI"
    },
    {
      id: "TXN004",
      type: "deposit",
      asset: "Wallet",
      assetType: "Wallet",
      quantity: 1,
      price: 5000,
      amount: 5000,
      fees: 0,
      total: 5000,
      status: "completed",
      date: "2024-12-09T09:20:00Z",
      orderId: "DEP001",
      paymentMethod: "Credit Card"
    },
    {
      id: "TXN005",
      type: "buy",
      asset: "Digital Gold",
      assetType: "Gold",
      quantity: 2,
      price: 6000,
      amount: 12000,
      fees: 60,
      total: 12060,
      status: "failed",
      date: "2024-12-08T14:30:00Z",
      orderId: "ORD004",
      paymentMethod: "Net Banking"
    },
    {
      id: "TXN006",
      type: "dividend",
      asset: "HDFCBANK",
      assetType: "Stock",
      quantity: 15,
      price: 15,
      amount: 225,
      fees: 0,
      total: 225,
      status: "completed",
      date: "2024-12-07T12:00:00Z",
      orderId: "DIV001",
      paymentMethod: "Bank Transfer"
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />;
      case "sell":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-blue-600" />;
      case "withdraw":
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      case "dividend":
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      default:
        return <Wallet className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const completedTransactions = filteredTransactions.filter(tx => tx.status === "completed");
  const pendingTransactions = filteredTransactions.filter(tx => tx.status === "pending");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-gray-600">
          View and manage all your investment transactions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold">{filteredTransactions.length}</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTransactions.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTransactions.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by asset name or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="dividend">Dividend</option>
              </select>

              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your transaction history for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{transaction.asset}</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.assetType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>ID: {transaction.id}</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    {getStatusIcon(transaction.status)}
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-1">
                    <p className="font-semibold">
                      {transaction.type === "sell" ? "+" : "-" }₹{transaction.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.quantity} units @ ₹{transaction.price}
                    </p>
                    {transaction.fees > 0 && (
                      <p className="text-xs text-gray-500">
                        Fee: ₹{transaction.fees}
                      </p>
                    )}
                  </div>
                </div>

                <div className="ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== "all" || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any transactions yet"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Details Modal would go here */}
      {/* Export functionality would be implemented here */}
    </div>
  );
}