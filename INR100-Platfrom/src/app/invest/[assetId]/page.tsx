"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Clock, 
  DollarSign, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Info,
  Sparkles,
  Award,
  Target,
  Calendar,
  Percent,
  PieChart,
  Activity,
  Shield,
  Users,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function AssetDetailPage({ params }: { params: { assetId: string } }) {
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentType, setInvestmentType] = useState("lumpsum");
  const [sipFrequency, setSipFrequency] = useState("monthly");

  // Mock asset data - in real app this would come from API
  const asset = {
    id: params.assetId,
    name: "Axis Bluechip Fund",
    symbol: "AXISBLUECHIP",
    type: "mutual_fund",
    category: "Large Cap",
    price: 45.67,
    previousPrice: 44.82,
    change: 0.85,
    changePercent: 1.90,
    minInvestment: 100,
    maxInvestment: 100000,
    description: "Axis Bluechip Fund is an open-ended equity scheme predominantly investing in large cap stocks. The fund aims to generate long-term capital appreciation by investing in a diversified portfolio of equity and equity-related instruments.",
    keyFeatures: [
      "Invests in top 100 companies by market cap",
      "Experienced fund management team",
      "Consistent performance track record",
      "Tax efficient under Section 80C"
    ],
    riskLevel: "Moderate",
    suggestedInvestmentHorizon: "3-5 years",
    nav: 45.67,
    expenseRatio: 1.85,
    fundSize: 28450,
    inceptionDate: "2010-01-01",
    returns: {
      "1D": 0.85,
      "1W": 2.45,
      "1M": 5.67,
      "3M": 8.90,
      "6M": 12.34,
      "1Y": 18.50,
      "3Y": 22.75,
      "5Y": 15.60
    },
    topHoldings: [
      { name: "Reliance Industries", percentage: 8.5, sector: "Energy" },
      { name: "HDFC Bank", percentage: 7.2, sector: "Banking" },
      { name: "ICICI Bank", percentage: 6.8, sector: "Banking" },
      { name: "TCS", percentage: 6.2, sector: "Technology" },
      { name: "Infosys", percentage: 5.4, sector: "Technology" }
    ],
    sectorAllocation: [
      { name: "Banking & Financial", percentage: 28.5 },
      { name: "Technology", percentage: 18.2 },
      { name: "Energy", percentage: 12.8 },
      { name: "Consumer Goods", percentage: 10.5 },
      { name: "Healthcare", percentage: 8.7 },
      { name: "Others", percentage: 21.3 }
    ],
    fundManager: {
      name: "Mr. Jinesh Gopani",
      experience: "15+ years",
      qualification: "CFA, MBA"
    }
  };

  const calculateUnits = () => {
    return investmentAmount / asset.price;
  };

  const estimatedReturns = () => {
    const annualReturn = asset.returns["1Y"];
    const years = investmentType === "lumpsum" ? 1 : 1;
    return investmentAmount * (1 + annualReturn / 100) ** years - investmentAmount;
  };

  return (
    <DashboardLayout user={{
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      avatar: "/placeholder-avatar.jpg",
      level: 5,
      xp: 2500,
      nextLevelXp: 3000,
      walletBalance: 15000,
      notifications: 3
    }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{asset.name}</h1>
              <Badge className="bg-blue-100 text-blue-800">
                {asset.category}
              </Badge>
              <Badge variant="outline">
                {asset.type === "mutual_fund" ? "Mutual Fund" : "Stock"}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{asset.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Symbol:</span>
                <span className="font-medium">{asset.symbol}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Risk:</span>
                <Badge variant={asset.riskLevel === "Low" ? "secondary" : asset.riskLevel === "Moderate" ? "default" : "destructive"}>
                  {asset.riskLevel}
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Suggested Horizon:</span>
                <span className="font-medium">{asset.suggestedInvestmentHorizon}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Current Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">₹{asset.price.toLocaleString('en-IN')}</div>
              <div className={`flex items-center ${
                asset.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {asset.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {asset.change >= 0 ? '+' : ''}{asset.change} ({asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%)
                </span>
                <span className="text-gray-500 ml-2">Today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Min/Max Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum:</span>
                  <span className="font-medium">₹{asset.minInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum:</span>
                  <span className="font-medium">₹{asset.maxInvestment.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">1Y Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                +{asset.returns["1Y"]}%
              </div>
              <div className="text-sm text-gray-600">
                Outperformed benchmark by 3.2%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Panel */}
          <Card className="border-0 shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Invest Now</span>
              </CardTitle>
              <CardDescription>Start investing from ₹100</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Investment Type
                </label>
                <Select value={investmentType} onValueChange={setInvestmentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lumpsum">Lumpsum</SelectItem>
                    <SelectItem value="sip">SIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {investmentType === "sip" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    SIP Frequency
                  </label>
                  <Select value={sipFrequency} onValueChange={setSipFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Investment Amount (₹)
                </label>
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  min={asset.minInvestment}
                  max={asset.maxInvestment}
                  className="text-lg"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Min: ₹{asset.minInvestment}</span>
                  <span>Max: ₹{asset.maxInvestment}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Units you'll get:</span>
                  <span className="font-medium">{calculateUnits().toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Est. returns (1Y):</span>
                  <span className="font-medium text-green-600">
                    +₹{estimatedReturns().toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-3">
                Invest ₹{investmentAmount.toLocaleString('en-IN')}
              </Button>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure transaction • SEBI compliant</span>
              </div>
            </CardContent>
          </Card>

          {/* Asset Details */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {asset.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Fund Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {asset.fundManager.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{asset.fundManager.name}</div>
                        <div className="text-sm text-gray-600">{asset.fundManager.experience} experience</div>
                        <div className="text-sm text-gray-600">{asset.fundManager.qualification}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(asset.returns).map(([period, returns]) => (
                        <div key={period} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">{period}</div>
                          <div className={`text-lg font-bold ${
                            returns >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {returns >= 0 ? '+' : ''}{returns}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Top Holdings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {asset.topHoldings.map((holding, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-sm text-gray-600">{holding.sector}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{holding.percentage}%</div>
                            <Progress value={holding.percentage} className="w-20 h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Sector Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {asset.sectorAllocation.map((sector, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{sector.name}</span>
                            <span className="text-sm text-gray-600">{sector.percentage}%</span>
                          </div>
                          <Progress value={sector.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Fund Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">NAV</div>
                        <div className="font-medium">₹{asset.nav}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Expense Ratio</div>
                        <div className="font-medium">{asset.expenseRatio}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Fund Size</div>
                        <div className="font-medium">₹{asset.fundSize.toLocaleString('en-IN')} Cr.</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Inception Date</div>
                        <div className="font-medium">{new Date(asset.inceptionDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}