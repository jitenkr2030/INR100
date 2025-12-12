---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022026005df4d7a70bc800488b6a68e1795e1479187ea0907a881f27b6f3f175dcee022100d41f586bf5c9743a702df2bd328a09d23f1ebb21fa44f06f88b9f2df9ca6ac93
    ReservedCode2: 30450220193ef93a5edbccfd248abf1d080bb6f4830bd1b6de32bba0f0ae1f6246a916bf022100863ee8dc9bce547c00af88acd2ecdbcb911e696c45a0f714272f13065e7ab816
---

# Production Monitoring Guide

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
```tsx
import './lib/monitoring/performance';
```

### Monitor Health
Visit `/api/health` endpoint for system health.

### View Performance Dashboard
Add `<PerformanceDashboard />` to admin pages.

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
