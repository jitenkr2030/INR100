"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  FileText, 
  Code, 
  BarChart3, 
  Headphones, 
  Users,
  CheckCircle,
  XCircle,
  Star,
  Crown,
  Zap,
  Calendar,
  CreditCard
} from "lucide-react";

interface PremiumFeature {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  billingCycle: string;
  category: string;
  isActive: boolean;
}

interface UserPremiumFeature {
  id: string;
  featureId: string;
  status: string;
  startDate: string;
  endDate: string;
  feature: PremiumFeature;
}

export default function PremiumFeaturesPage() {
  const [currentFeatures, setCurrentFeatures] = useState<UserPremiumFeature[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<PremiumFeature[]>([]);
  const [includedFeatures, setIncludedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  // Demo user ID - in real app, get from authentication
  const userId = "demo-user-id";

  useEffect(() => {
    fetchPremiumFeatures();
  }, []);

  const fetchPremiumFeatures = async () => {
    try {
      const response = await fetch(`/api/premium-features?userId=${userId}`);
      const data = await response.json();
      
      setCurrentFeatures(data.currentFeatures || []);
      setAvailableFeatures(data.availableFeatures || []);
      setIncludedFeatures(data.includedFeatures || []);
    } catch (error) {
      console.error("Error fetching premium features:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseFeature = async (featureId: string) => {
    setPurchasing(featureId);
    try {
      const response = await fetch('/api/premium-features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          featureId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchPremiumFeatures();
        alert("Premium feature activated successfully!");
      } else {
        alert(data.error || "Purchase failed");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("An error occurred during purchase");
    } finally {
      setPurchasing(null);
    }
  };

  const handleCancelFeature = async (featureId: string) => {
    if (!confirm("Are you sure you want to cancel this feature?")) {
      return;
    }

    try {
      const response = await fetch(`/api/premium-features?userId=${userId}&featureId=${featureId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        await fetchPremiumFeatures();
        alert("Feature cancelled successfully");
      } else {
        alert(data.error || "Cancellation failed");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("An error occurred during cancellation");
    }
  };

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case "AI_ADVISOR":
        return <Brain className="h-6 w-6" />;
      case "MARKET_PREDICTIONS":
        return <TrendingUp className="h-6 w-6" />;
      case "RISK_ANALYSIS":
        return <Shield className="h-6 w-6" />;
      case "TAX_OPTIMIZATION":
        return <FileText className="h-6 w-6" />;
      case "API_ACCESS":
        return <Code className="h-6 w-6" />;
      case "ADVANCED_ANALYTICS":
        return <BarChart3 className="h-6 w-6" />;
      case "PRIORITY_SUPPORT":
        return <Headphones className="h-6 w-6" />;
      case "EXPERT_SESSIONS":
        return <Users className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI Services":
        return "bg-purple-100 text-purple-800";
      case "Analytics":
        return "bg-blue-100 text-blue-800";
      case "Financial Planning":
        return "bg-green-100 text-green-800";
      case "Developer Tools":
        return "bg-orange-100 text-orange-800";
      case "Support":
        return "bg-red-100 text-red-800";
      case "Advisory":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatBillingCycle = (cycle: string) => {
    switch (cycle) {
      case "MONTHLY":
        return "/month";
      case "QUARTERLY":
        return "/quarter";
      case "ANNUAL":
        return "/year";
      case "ONE_TIME":
        return "one-time";
      default:
        return "";
    }
  };

  const isFeatureOwned = (featureType: string) => {
    return currentFeatures.some(f => f.feature.type === featureType) || 
           includedFeatures.includes(featureType);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading premium features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premium Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock powerful AI-driven insights and advanced tools to supercharge your investment journey.
          </p>
        </div>

        {/* Current Features Alert */}
        {(currentFeatures || []).length > 0 && (
          <div className="mb-8">
            <Alert className="border-green-200 bg-green-50">
              <Crown className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                You have {(currentFeatures || []).length} active premium feature{(currentFeatures || []).length > 1 ? 's' : ''}!
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Included Features Alert */}
        {(includedFeatures || []).length > 0 && (
          <div className="mb-8">
            <Alert className="border-blue-200 bg-blue-50">
              <Star className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                {(includedFeatures || []).length} feature{(includedFeatures || []).length > 1 ? 's are' : ' is'} included in your subscription plan.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Features by Category */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-4">
              <TabsTrigger value="all">All Features</TabsTrigger>
              <TabsTrigger value="ai">AI Services</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableFeatures.map((feature) => {
                const isOwned = isFeatureOwned(feature.type);
                const userFeature = currentFeatures.find(f => f.feature.id === feature.id);
                
                return (
                  <Card 
                    key={feature.id} 
                    className={`relative ${isOwned ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
                  >
                    {isOwned && (
                      <div className="absolute -top-3 right-4">
                        <Badge className="bg-green-500 text-white">
                          {includedFeatures.includes(feature.type) ? "Included" : "Active"}
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                            {getFeatureIcon(feature.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <Badge className={`text-xs ${getCategoryColor(feature.category)}`}>
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl font-bold">₹{feature.price}</span>
                          <span className="text-gray-500 ml-1">
                            {formatBillingCycle(feature.billingCycle)}
                          </span>
                        </div>
                        {feature.billingCycle === "MONTHLY" && (
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            Monthly
                          </Badge>
                        )}
                      </div>

                      {isOwned ? (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {includedFeatures.includes(feature.type) 
                              ? "Included in your subscription" 
                              : `Active until ${new Date(userFeature!.endDate).toLocaleDateString()}`
                            }
                          </div>
                          
                          {!includedFeatures.includes(feature.type) && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCancelFeature(feature.id)}
                              className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Cancel Feature
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button 
                          className={`w-full ${
                            purchasing === feature.id 
                              ? "bg-gray-300 cursor-not-allowed" 
                              : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          }`}
                          onClick={() => handlePurchaseFeature(feature.id)}
                          disabled={purchasing === feature.id}
                        >
                          {purchasing === feature.id ? (
                            <>
                              <CreditCard className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Activate Now
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableFeatures
                .filter(f => f.category === "AI Services")
                .map((feature) => {
                  const isOwned = isFeatureOwned(feature.type);
                  return (
                    <Card key={feature.id} className={`relative ${isOwned ? 'ring-2 ring-green-500' : ''}`}>
                      {isOwned && (
                        <div className="absolute -top-3 right-4">
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            {getFeatureIcon(feature.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <Badge className="text-xs bg-purple-100 text-purple-800">
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-bold">₹{feature.price}</span>
                            <span className="text-gray-500 ml-1">
                              {formatBillingCycle(feature.billingCycle)}
                            </span>
                          </div>
                        </div>

                        {isOwned ? (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Active
                          </div>
                        ) : (
                          <Button 
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => handlePurchaseFeature(feature.id)}
                            disabled={purchasing === feature.id}
                          >
                            {purchasing === feature.id ? "Processing..." : "Activate Now"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableFeatures
                .filter(f => f.category === "Analytics")
                .map((feature) => {
                  const isOwned = isFeatureOwned(feature.type);
                  return (
                    <Card key={feature.id} className={`relative ${isOwned ? 'ring-2 ring-green-500' : ''}`}>
                      {isOwned && (
                        <div className="absolute -top-3 right-4">
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getFeatureIcon(feature.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <Badge className="text-xs bg-blue-100 text-blue-800">
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-bold">₹{feature.price}</span>
                            <span className="text-gray-500 ml-1">
                              {formatBillingCycle(feature.billingCycle)}
                            </span>
                          </div>
                        </div>

                        {isOwned ? (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Active
                          </div>
                        ) : (
                          <Button 
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                            onClick={() => handlePurchaseFeature(feature.id)}
                            disabled={purchasing === feature.id}
                          >
                            {purchasing === feature.id ? "Processing..." : "Activate Now"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {availableFeatures
                .filter(f => f.category === "Support" || f.category === "Advisory")
                .map((feature) => {
                  const isOwned = isFeatureOwned(feature.type);
                  return (
                    <Card key={feature.id} className={`relative ${isOwned ? 'ring-2 ring-green-500' : ''}`}>
                      {isOwned && (
                        <div className="absolute -top-3 right-4">
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            {getFeatureIcon(feature.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            <Badge className={`text-xs ${getCategoryColor(feature.category)}`}>
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-bold">₹{feature.price}</span>
                            <span className="text-gray-500 ml-1">
                              {formatBillingCycle(feature.billingCycle)}
                            </span>
                          </div>
                        </div>

                        {isOwned ? (
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Active
                          </div>
                        ) : (
                          <Button 
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                            onClick={() => handlePurchaseFeature(feature.id)}
                            disabled={purchasing === feature.id}
                          >
                            {purchasing === feature.id ? "Processing..." : "Activate Now"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}