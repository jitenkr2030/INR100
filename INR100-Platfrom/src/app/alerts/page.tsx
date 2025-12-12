"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  BellOff, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Search,
  Filter
} from "lucide-react";
import { usePriceAlerts, useStockPrice, useMarketData } from "@/hooks/useMarketData";

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  type: 'price' | 'change' | 'volume';
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
  message?: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
    type: 'price' as 'price' | 'change' | 'volume'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'triggered'>('all');

  const { alerts: priceAlerts, setAlert, removeAlert } = usePriceAlerts();
  const { data: marketData } = useMarketData({ symbols: Object.keys(priceAlerts) });

  // Mock alerts data - in production, fetch from database
  useEffect(() => {
    const mockAlerts: PriceAlert[] = [
      {
        id: '1',
        symbol: 'RELIANCE',
        targetPrice: 2600,
        condition: 'above',
        type: 'price',
        isActive: true,
        createdAt: '2024-12-10T10:00:00Z'
      },
      {
        id: '2',
        symbol: 'HDFCBANK',
        targetPrice: 1700,
        condition: 'below',
        type: 'price',
        isActive: true,
        createdAt: '2024-12-11T14:30:00Z'
      },
      {
        id: '3',
        symbol: 'TCS',
        targetPrice: 5,
        condition: 'above',
        type: 'change',
        isActive: false,
        createdAt: '2024-12-09T09:15:00Z',
        triggeredAt: '2024-12-12T11:20:00Z',
        message: 'TCS price increased by 5%'
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const getConditionText = (alert: PriceAlert) => {
    switch (alert.type) {
      case 'price':
        return `${alert.condition} ${formatPrice(alert.targetPrice)}`;
      case 'change':
        return `${alert.condition} ${alert.targetPrice}% change`;
      case 'volume':
        return `${alert.condition} ${alert.targetPrice} volume`;
      default:
        return '';
    }
  };

  const getAlertStatusColor = (alert: PriceAlert) => {
    if (!alert.isActive) return 'bg-gray-100 text-gray-800';
    if (alert.triggeredAt) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getAlertStatusIcon = (alert: PriceAlert) => {
    if (!alert.isActive) return <BellOff className="w-4 h-4" />;
    if (alert.triggeredAt) return <CheckCircle className="w-4 h-4" />;
    return <Bell className="w-4 h-4" />;
  };

  const handleAddAlert = () => {
    if (!newAlert.symbol || !newAlert.targetPrice) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol.toUpperCase(),
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      type: newAlert.type,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setAlerts(prev => [...prev, alert]);
    setAlert(alert.symbol, alert.targetPrice);
    setNewAlert({ symbol: '', targetPrice: '', condition: 'above', type: 'price' });
    setShowAddForm(false);
  };

  const handleToggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const handleDeleteAlert = (alertId: string) => {
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      removeAlert(alert.symbol);
    }
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
      (filterActive === 'active' && alert.isActive && !alert.triggeredAt) ||
      (filterActive === 'triggered' && alert.triggeredAt);
    return matchesSearch && matchesFilter;
  });

  const activeAlerts = alerts.filter(a => a.isActive && !a.triggeredAt).length;
  const triggeredAlerts = alerts.filter(a => a.triggeredAt).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Price Alerts</h1>
          <p className="text-gray-600">
            Get notified when your stocks reach target prices or move significantly
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <Badge variant="outline">
            {activeAlerts} Active
          </Badge>
          <Badge variant="outline">
            {triggeredAlerts} Triggered
          </Badge>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Alert
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-green-600">{activeAlerts}</p>
              </div>
              <Bell className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Triggered Today</p>
                <p className="text-2xl font-bold text-blue-600">{triggeredAlerts}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-purple-600">{alerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
            <CardDescription>Set up a price alert for your stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Stock Symbol</label>
                <Input
                  placeholder="e.g., RELIANCE"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Condition</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, condition: e.target.value as 'above' | 'below' }))}
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Target Value</label>
                <Input
                  type="number"
                  placeholder="Price or percentage"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleAddAlert} disabled={!newAlert.symbol || !newAlert.targetPrice}>
                  Create Alert
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'triggered'].map((filter) => (
                <Button
                  key={filter}
                  variant={filterActive === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterActive(filter as any)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Alerts</CardTitle>
          <CardDescription>
            Manage and monitor your price alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterActive !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first price alert to get started'
                }
              </p>
              {!searchTerm && filterActive === 'all' && (
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Alert
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => {
                const currentPrice = marketData?.stocks?.find((s: any) => s.symbol === alert.symbol)?.price;
                const priceDifference = currentPrice ? Math.abs(currentPrice - alert.targetPrice) : 0;
                const isCloseToTrigger = priceDifference < (alert.targetPrice * 0.02); // Within 2%

                return (
                  <div key={alert.id} className={`flex items-center justify-between p-4 border rounded-lg ${
                    alert.triggeredAt ? 'bg-blue-50 border-blue-200' : 
                    isCloseToTrigger ? 'bg-yellow-50 border-yellow-200' : 'hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${getAlertStatusColor(alert)}`}>
                        {getAlertStatusIcon(alert)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{alert.symbol}</h4>
                          {currentPrice && (
                            <Badge variant="outline" className="text-xs">
                              {formatPrice(currentPrice)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Alert when price {getConditionText(alert)}
                        </p>
                        {alert.message && (
                          <p className="text-sm text-blue-600 font-medium">{alert.message}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Created: {new Date(alert.createdAt).toLocaleDateString()}</span>
                          {alert.triggeredAt && (
                            <span>Triggered: {new Date(alert.triggeredAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isCloseToTrigger && !alert.triggeredAt && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          Near Target
                        </Badge>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleAlert(alert.id)}
                        disabled={!!alert.triggeredAt}
                      >
                        {alert.isActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Types Guide */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Alert Types</CardTitle>
          <CardDescription>Different types of alerts you can set</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Price Alerts
              </h4>
              <p className="text-sm text-gray-600">
                Get notified when a stock reaches a specific price level (above or below)
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Change Alerts
              </h4>
              <p className="text-sm text-gray-600">
                Get notified when a stock moves up or down by a certain percentage
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Volume Alerts
              </h4>
              <p className="text-sm text-gray-600">
                Get notified when trading volume exceeds a certain threshold
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}