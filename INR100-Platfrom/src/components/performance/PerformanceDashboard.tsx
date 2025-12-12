// Performance Dashboard Component
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch performance metrics from API
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/analytics/performance');
        const data = await response.json();
        setMetrics(data.metrics);
      } catch (error) {
        console.error('Failed to fetch performance metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);
  
  if (loading) {
    return <div>Loading performance metrics...</div>;
  }
  
  if (!metrics) {
    return <div>No performance data available</div>;
  }
  
  const getScore = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };
  
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>First Contentful Paint</CardTitle>
            <CardDescription>Time until first content is rendered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.fcp}ms</div>
            <div className={`text-sm ${getScoreColor(getScore(metrics.fcp, { good: 1800, poor: 3000 }))}`}>
              {getScore(metrics.fcp, { good: 1800, poor: 3000 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Largest Contentful Paint</CardTitle>
            <CardDescription>Time until largest content is rendered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.lcp}ms</div>
            <div className={`text-sm ${getScoreColor(getScore(metrics.lcp, { good: 2500, poor: 4000 }))}`}>
              {getScore(metrics.lcp, { good: 2500, poor: 4000 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Layout Shift</CardTitle>
            <CardDescription>Visual stability metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cls}</div>
            <div className={`text-sm ${getScoreColor(getScore(metrics.cls * 1000, { good: 100, poor: 250 }))}`}>
              {getScore(metrics.cls * 1000, { good: 100, poor: 250 })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Overall performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">First Input Delay</div>
              <div className="text-lg font-semibold">{metrics.fid}ms</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Time to First Byte</div>
              <div className="text-lg font-semibold">{metrics.ttfb}ms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}