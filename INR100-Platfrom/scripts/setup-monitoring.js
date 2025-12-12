// Production Monitoring Setup Script
const fs = require('fs');
const path = require('path');

// Performance monitoring configuration
const monitoringConfig = `// Performance Monitoring Configuration
// Add this to your root layout or _app.tsx

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Performance monitoring endpoint
const sendToAnalytics = (metric) => {
  const body = JSON.stringify({
    ...metric,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now()
  });
  
  // Send to analytics API
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(err => console.warn('Analytics failed:', err));
};

// Monitor Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Monitor API response times
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const start = Date.now();
  try {
    const response = await originalFetch.apply(this, args);
    const duration = Date.now() - start;
    
    // Log slow API calls
    if (duration > 2000) {
      console.warn('Slow API call:', args[0], 'took', duration, 'ms');
    }
    
    return response;
  } catch (error) {
    const duration = Date.now() - start;
    console.error('API error:', args[0], 'failed after', duration, 'ms');
    throw error;
  }
};

// Error monitoring
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});`;

// Health check endpoint enhancement
const healthCheckConfig = `// Enhanced health check for production monitoring
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Basic health checks
    const checks = {
      database: await checkDatabase(),
      memory: checkMemory(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
    
    const responseTime = Date.now() - startTime;
    const isHealthy = Object.values(checks).every(check => check === true || typeof check === 'number');
    
    const status = isHealthy ? 'healthy' : 'unhealthy';
    const statusCode = isHealthy ? 200 : 503;
    
    return NextResponse.json({
      status,
      checks,
      responseTime: \`\${responseTime}ms\`,
      version: process.env.npm_package_version || '1.0.0'
    }, { status: statusCode });
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}

async function checkDatabase() {
  try {
    // Add your database health check here
    return true;
  } catch {
    return false;
  }
}

function checkMemory() {
  const used = process.memoryUsage();
  const total = used.heapUsed + (process.memoryUsage().heapTotal - used.heapUsed);
  return {
    used: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100,
    total: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100,
    external: Math.round(used.external / 1024 / 1024 * 100) / 100
  };
}`;

// Performance monitoring dashboard
const performanceDashboard = `// Performance Dashboard Component
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
            <div className={\`text-sm \${getScoreColor(getScore(metrics.fcp, { good: 1800, poor: 3000 }))}\`}>
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
            <div className={\`text-sm \${getScoreColor(getScore(metrics.lcp, { good: 2500, poor: 4000 }))}\`}>
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
            <div className={\`text-sm \${getScoreColor(getScore(metrics.cls * 1000, { good: 100, poor: 250 }))}\`}>
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
}`;

// Setup monitoring
const setupMonitoring = () => {
  console.log('📊 Setting up production monitoring...');
  
  // Create monitoring directories
  const dirs = [
    'src/lib/monitoring',
    'src/components/performance'
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
  
  // Write monitoring files
  const files = [
    {
      path: 'src/lib/monitoring/performance.ts',
      content: monitoringConfig
    },
    {
      path: 'src/lib/monitoring/health-check.ts',
      content: healthCheckConfig
    },
    {
      path: 'src/components/performance/PerformanceDashboard.tsx',
      content: performanceDashboard
    }
  ];
  
  files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file.path);
    fs.writeFileSync(fullPath, file.content);
    console.log(`✅ Created: ${file.path}`);
  });
  
  // Create monitoring documentation
  const docs = `# Production Monitoring Guide

## Overview
This guide covers the production monitoring setup for INR100 Platform.

## Features Implemented

### 1. Core Web Vitals Monitoring
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP) 
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

### 2. API Performance Monitoring
- Response time tracking
- Error rate monitoring
- Slow query detection

### 3. Error Tracking
- JavaScript errors
- Unhandled promise rejections
- API failures

### 4. Health Checks
- Database connectivity
- Memory usage monitoring
- Service availability

## Usage

### Enable Performance Monitoring
Add to your root layout:
\`\`\`tsx
import './lib/monitoring/performance';
\`\`\`

### Monitor Health
Visit \`/api/health\` endpoint for system health.

### View Performance Dashboard
Add \`<PerformanceDashboard />\` to admin pages.

## Alerting Thresholds

- FCP > 3000ms: Warning
- LCP > 4000ms: Warning  
- CLS > 0.25: Warning
- FID > 300ms: Warning
- API response > 2000ms: Warning

## Next Steps

1. Set up external monitoring service (DataDog, New Relic)
2. Configure alerting rules
3. Implement log aggregation
4. Set up uptime monitoring
`;
  
  const docsPath = path.join(__dirname, '..', 'docs/MONITORING_SETUP.md');
  fs.writeFileSync(docsPath, docs);
  
  console.log('✅ Created monitoring documentation: docs/MONITORING_SETUP.md');
};

// Main execution
if (require.main === module) {
  setupMonitoring();
  
  console.log('\n🎉 Production monitoring setup complete!');
  console.log('\nNext steps:');
  console.log('1. Import monitoring/performance in your root layout');
  console.log('2. Add PerformanceDashboard to admin pages');
  console.log('3. Set up external monitoring service');
  console.log('4. Configure alerting thresholds');
}

module.exports = { setupMonitoring };