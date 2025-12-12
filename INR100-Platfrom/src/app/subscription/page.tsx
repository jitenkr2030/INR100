"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, 
  Star, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Calendar,
  CreditCard,
  TrendingUp,
  Shield,
  Headphones,
  Users,
  BarChart3,
  Database,
  UserCheck
} from "lucide-react";

interface SubscriptionPlan {
  tier: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  limitations: string[];
  isAnnual?: boolean;
  annualPrice?: number;
  annualSavings?: number;
}

interface Subscription {
  id: string;
  tier: string;
  planType: string;
  amount: number;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export default function SubscriptionPage() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [monthlyPlans, setMonthlyPlans] = useState<SubscriptionPlan[]>([]);
  const [annualPlans, setAnnualPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  // Demo user ID - in real app, get from authentication
  const userId = "demo-user-id";

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch(`/api/subscriptions?userId=${userId}`);
      const data = await response.json();
      
      setCurrentSubscription(data.currentSubscription || null);
      setMonthlyPlans(data.monthlyPlans || []);
      setAnnualPlans(data.annualPlans || []);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tier: string, planType: string) => {
    setUpgrading(true);
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          tier,
          planType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh subscription data
        await fetchSubscriptionData();
        alert(`Successfully subscribed to ${tier} plan!`);
      } else {
        alert(data.error || "Subscription failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred during subscription");
    } finally {
      setUpgrading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) {
      return;
    }

    try {
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh subscription data
        await fetchSubscriptionData();
        alert("Subscription cancelled successfully");
      } else {
        alert(data.error || "Cancellation failed");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("An error occurred during cancellation");
    }
  };

  const getPlanIcon = (tier: string) => {
    switch (tier) {
      case "BASIC":
        return <Users className="h-6 w-6" />;
      case "PREMIUM":
        return <Star className="h-6 w-6" />;
      case "PROFESSIONAL":
        return <Crown className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const getPlanColor = (tier: string) => {
    switch (tier) {
      case "BASIC":
        return "border-gray-200";
      case "PREMIUM":
        return "border-blue-200 bg-blue-50";
      case "PROFESSIONAL":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription plans...</p>
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
            Choose Your Investment Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock powerful features and take your investing to the next level with our premium subscription plans.
          </p>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <div className="mb-8">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <span>
                    You are currently on the <strong>{currentSubscription.tier}</strong> plan 
                    ({currentSubscription.planType}) - Active until {new Date(currentSubscription.endDate).toLocaleDateString()}
                  </span>
                  {currentSubscription.tier !== "BASIC" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancelSubscription}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Subscription Plans */}
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="monthly">Monthly Plans</TabsTrigger>
              <TabsTrigger value="annual">Annual Plans (Save 25%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {(monthlyPlans || []).map((plan) => (
                <Card 
                  key={`${plan.tier}-monthly`} 
                  className={`relative ${getPlanColor(plan.tier)} ${
                    currentSubscription?.tier === plan.tier ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {currentSubscription?.tier === plan.tier && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">Current Plan</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {getPlanIcon(plan.tier)}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-green-600">Free</span>
                      ) : (
                        <div>
                          <span className="text-3xl font-bold">₹{plan.price}</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Features Included:
                      </h4>
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-red-600 flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          Limitations:
                        </h4>
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <XCircle className="h-3 w-3 mr-2 text-red-500 flex-shrink-0" />
                            {limitation}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        currentSubscription?.tier === plan.tier 
                          ? "bg-gray-300 cursor-not-allowed" 
                          : plan.price === 0 
                            ? "bg-gray-200 text-gray-700" 
                            : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      }`}
                      onClick={() => handleSubscribe(plan.tier, "MONTHLY")}
                      disabled={upgrading || currentSubscription?.tier === plan.tier}
                    >
                      {currentSubscription?.tier === plan.tier 
                        ? "Current Plan" 
                        : plan.price === 0 
                          ? "Downgrade to Free" 
                          : upgrading 
                            ? "Processing..." 
                            : "Upgrade Now"
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="annual" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {(annualPlans || []).map((plan) => (
                <Card 
                  key={`${plan.tier}-annual`} 
                  className={`relative ${getPlanColor(plan.tier)} ${
                    currentSubscription?.tier === plan.tier && currentSubscription?.planType === "ANNUAL" 
                      ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {plan.annualSavings && plan.annualSavings > 0 && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-red-500 text-white">
                        Save ₹{plan.annualSavings}
                      </Badge>
                    </div>
                  )}
                  
                  {currentSubscription?.tier === plan.tier && currentSubscription?.planType === "ANNUAL" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">Current Plan</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {getPlanIcon(plan.tier)}
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-green-600">Free</span>
                      ) : (
                        <div>
                          <div className="flex items-baseline justify-center">
                            <span className="text-2xl text-gray-500 line-through mr-2">₹{plan.price * 12}</span>
                            <span className="text-3xl font-bold">₹{plan.annualPrice}</span>
                          </div>
                          <span className="text-gray-500">/year</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Features Included:
                      </h4>
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-red-600 flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          Limitations:
                        </h4>
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <XCircle className="h-3 w-3 mr-2 text-red-500 flex-shrink-0" />
                            {limitation}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        currentSubscription?.tier === plan.tier && currentSubscription?.planType === "ANNUAL"
                          ? "bg-gray-300 cursor-not-allowed" 
                          : plan.price === 0 
                            ? "bg-gray-200 text-gray-700" 
                            : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      }`}
                      onClick={() => handleSubscribe(plan.tier, "ANNUAL")}
                      disabled={upgrading || (currentSubscription?.tier === plan.tier && currentSubscription?.planType === "ANNUAL")}
                    >
                      {currentSubscription?.tier === plan.tier && currentSubscription?.planType === "ANNUAL"
                        ? "Current Plan" 
                        : plan.price === 0 
                          ? "Downgrade to Free" 
                          : upgrading 
                            ? "Processing..." 
                            : "Upgrade Now"
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Feature Comparison */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 font-semibold">
              <div>Feature</div>
              <div className="text-center">Basic</div>
              <div className="text-center">Premium</div>
              <div className="text-center">Professional</div>
            </div>
            
            {[
              { feature: "Monthly Transactions", basic: "5", premium: "Unlimited", professional: "Unlimited" },
              { feature: "AI Insights", basic: "Limited", premium: "Advanced", professional: "Advanced" },
              { feature: "Customer Support", basic: "Standard", premium: "Priority", professional: "Dedicated" },
              { feature: "Portfolio Analytics", basic: "Basic", premium: "Advanced", professional: "Advanced" },
              { feature: "API Access", basic: "❌", premium: "❌", professional: "✅" },
              { feature: "1-on-1 Advisor", basic: "❌", premium: "❌", professional: "✅" },
              { feature: "Custom Strategies", basic: "❌", premium: "❌", professional: "✅" },
              { feature: "White-label Reports", basic: "❌", premium: "❌", professional: "✅" },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-6 border-t">
                <div className="font-medium">{row.feature}</div>
                <div className="text-center">{row.basic}</div>
                <div className="text-center text-blue-600 font-medium">{row.premium}</div>
                <div className="text-center text-purple-600 font-medium">{row.professional}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}