---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30440220318355183bd03d3dfa44de1656bcf2a1c12ad1a267ffeb52cc53c829f2f3d6dc02203988dbb1b0c82af31009ecb51d55d349a0aba038fc5a6f03dd794cbf68241f10
    ReservedCode2: 3045022100f298eff7923e068d5d3cccab5419b0f5e34e64e6829da93f62fbdfd474a3e69702203975c1a647afd1caf8711cc8d1f3d0ef5fdd1f9ca498162774f977457c3578ce
---

# Load Testing Setup - INR100 Platform

## Overview

This comprehensive load testing suite ensures the INR100 Platform can handle production traffic and provides detailed performance insights for optimization.

## 🎯 Features

- **Multi-type Testing**: Web application, database, and infrastructure load testing
- **Scenario-based**: Light, moderate, heavy, spike, and endurance testing
- **Real-time Monitoring**: Continuous performance monitoring during tests
- **Detailed Reporting**: JSON, HTML, and console reports with actionable insights
- **Automated CI/CD**: Ready for integration with continuous integration pipelines

## 🚀 Quick Start

### Prerequisites

```bash
# Install Node.js dependencies
npm install mysql2

# For database testing (optional)
# Set environment variables
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=your_username
export DB_PASSWORD=your_password
export DB_NAME=inr100_platform
```

### Basic Usage

```bash
# Run basic load test
node scripts/load-testing.js basic http://localhost:3000

# Run database load test
node scripts/database-load-testing.js comprehensive

# Run comprehensive test suite
node scripts/load-test-runner.js comprehensive staging
```

## 📊 Test Types

### 1. Basic Load Testing
Tests individual endpoints with configurable concurrent users and request patterns.

```bash
node scripts/load-testing.js basic http://localhost:3000
```

### 2. Database Load Testing
Specialized testing for database performance under various load conditions.

```bash
# Test connection pool performance
node scripts/database-load-testing.js connection

# Test specific queries
node scripts/database-load-testing.js queries

# Comprehensive database testing
node scripts/database-load-testing.js comprehensive
```

### 3. Scenario-based Testing
Predefined scenarios for different load patterns.

```bash
# Light load test (normal daily traffic)
node scripts/load-test-runner.js scenario lightLoad staging

# Moderate load test (peak hours)
node scripts/load-test-runner.js scenario moderateLoad staging

# Heavy load test (stress testing)
node scripts/load-test-runner.js scenario heavyLoad staging
```

### 4. Spike Testing
Tests system response to sudden traffic surges.

```bash
node scripts/load-test-runner.js spike staging
```

### 5. Endurance Testing
Long-running tests to verify system stability.

```bash
# 30-minute endurance test
node scripts/load-test-runner.js endurance 30 staging

# Shorter version for CI/CD
node scripts/load-test-runner.js endurance 5 staging
```

### 6. Continuous Monitoring
Extended monitoring with periodic samples.

```bash
# 60-minute continuous monitoring
node scripts/load-test-runner.js continuous 60 staging
```

## 🎯 Test Scenarios

### Light Load Test
- **Concurrent Users**: 10
- **Requests per User**: 5
- **Duration**: 2 minutes
- **Purpose**: Normal daily traffic simulation

### Moderate Load Test
- **Concurrent Users**: 50
- **Requests per User**: 10
- **Duration**: 5 minutes
- **Purpose**: Peak trading hours simulation

### Heavy Load Test
- **Concurrent Users**: 100
- **Requests per User**: 15
- **Duration**: 10 minutes
- **Purpose**: High-stress scenario testing

### Spike Test
- **Base Users**: 10
- **Spike Users**: 200
- **Spike Duration**: 30 seconds
- **Purpose**: Sudden traffic surge response

### Endurance Test
- **Concurrent Users**: 25
- **Duration**: 30 minutes (configurable)
- **Purpose**: Long-term stability verification

## 📈 Performance Thresholds

### Response Time Targets
| Grade | Response Time | Status |
|-------|---------------|--------|
| Excellent | < 200ms | ✅ Optimal |
| Good | < 500ms | ✅ Acceptable |
| Acceptable | < 1000ms | ⚠️ Monitor |
| Poor | < 2000ms | ⚠️ Optimize |
| Critical | ≥ 2000ms | ❌ Critical |

### Error Rate Targets
| Grade | Error Rate | Status |
|-------|------------|--------|
| Excellent | < 0.1% | ✅ Optimal |
| Good | < 1% | ✅ Acceptable |
| Acceptable | < 5% | ⚠️ Monitor |
| Critical | ≥ 10% | ❌ Critical |

### Throughput Targets
| Grade | Requests/Second | Status |
|-------|----------------|--------|
| Excellent | ≥ 1000 RPS | ✅ Optimal |
| High | < 500 RPS | ✅ Good |
| Medium | < 200 RPS | ⚠️ Monitor |
| Low | < 50 RPS | ❌ Critical |

## 🗄️ Database Testing

### Connection Pool Testing
Tests database connection pool performance under concurrent load.

```bash
node scripts/database-load-testing.js connection
```

**Metrics Monitored:**
- Connection acquisition time
- Query execution time
- Pool utilization
- Connection errors

### Query Performance Testing
Tests specific INR100 Platform database queries.

```bash
node scripts/database-load-testing.js queries
```

**Tested Queries:**
- User count and statistics
- Recent transactions retrieval
- Market data queries
- Order management
- Portfolio analytics
- Performance metrics

### Concurrent Database Load
Tests database under sustained concurrent access.

```bash
node scripts/database-load-testing.js concurrent
```

## 📊 Reports and Analysis

### Report Types
1. **JSON Reports**: Detailed machine-readable results
2. **HTML Reports**: Visual dashboards with charts
3. **Console Reports**: Real-time terminal output

### Report Contents
- **Summary Statistics**: Overall performance metrics
- **Detailed Results**: Per-endpoint and per-query analysis
- **Performance Analysis**: Percentiles, trends, and patterns
- **Recommendations**: Actionable optimization suggestions
- **Compliance Status**: SLA and threshold adherence

### Sample Report Structure
```json
{
  "timestamp": "2025-12-12T16:54:16.000Z",
  "summary": {
    "totalRequests": 1500,
    "successfulRequests": 1485,
    "failedRequests": 15,
    "avgResponseTime": 245.67,
    "maxResponseTime": 1234.56,
    "requestsPerSecond": 125.5,
    "errorRate": 1.0
  },
  "recommendations": [
    {
      "type": "performance",
      "severity": "high",
      "message": "High response time detected",
      "action": "Optimize slow endpoints"
    }
  ]
}
```

## 🔧 Configuration

### Environment Configuration
Edit `config/load-testing-config.js` to customize:

```javascript
environments: {
  development: {
    baseUrl: 'http://localhost:3000',
    scenarios: ['lightLoad'],
    thresholds: {
      responseTime: { excellent: 500, good: 1000, acceptable: 2000 },
      errorRate: { excellent: 1, good: 2, acceptable: 5 }
    }
  },
  staging: {
    baseUrl: 'https://staging.inr100.com',
    scenarios: ['lightLoad', 'moderateLoad'],
    thresholds: {
      responseTime: { excellent: 300, good: 600, acceptable: 1200 },
      errorRate: { excellent: 0.5, good: 1, acceptable: 3 }
    }
  },
  production: {
    baseUrl: 'https://api.inr100.com',
    scenarios: ['lightLoad', 'moderateLoad', 'heavyLoad', 'enduranceTest'],
    thresholds: {
      responseTime: { excellent: 200, good: 400, acceptable: 800 },
      errorRate: { excellent: 0.1, good: 0.5, acceptable: 1 }
    }
  }
}
```

### Custom Test Scenarios
Add custom scenarios in the configuration:

```javascript
scenarios: {
  customTest: {
    name: 'Custom Test',
    description: 'Custom load test scenario',
    concurrentUsers: 25,
    requestsPerUser: 8,
    duration: '5 minutes',
    endpoints: [
      '/api/custom/endpoint1',
      '/api/custom/endpoint2'
    ],
    delayBetweenRequests: 150
  }
}
```

## 🤖 CI/CD Integration

### GitHub Actions Example
```yaml
name: Load Testing
on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  
jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install mysql2
      
      - name: Run load tests
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
          DB_NAME: ${{ secrets.DB_NAME }}
        run: |
          node scripts/load-test-runner.js comprehensive staging
      
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: load-test-results
          path: results/
```

### Jenkins Pipeline Example
```groovy
pipeline {
    agent any
    stages {
        stage('Load Testing') {
            steps {
                script {
                    sh 'node scripts/load-test-runner.js comprehensive staging'
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'results/**', fingerprint: true
                }
            }
        }
    }
}
```

## 📱 Monitoring Integration

### Real-time Monitoring
The load testing suite includes real-time monitoring capabilities:

```javascript
// Enable real-time monitoring
monitoring: {
  realTime: {
    enabled: true,
    interval: 5000, // 5 seconds
    metrics: [
      'responseTime',
      'throughput', 
      'errorRate',
      'memoryUsage',
      'cpuUsage'
    ]
  }
}
```

### Alert Configuration
Set up alerts for performance degradation:

```javascript
alerts: {
  responseTimeThreshold: 1000, // ms
  errorRateThreshold: 5,       // %
  throughputThreshold: 100,    // RPS
  cpuThreshold: 80,            // %
  memoryThreshold: 85          // %
}
```

## 🎛️ Advanced Usage

### Custom Load Patterns
```javascript
// Create custom load pattern
const tester = new LoadTester();

// Ramp-up pattern
for (let users = 10; users <= 100; users += 10) {
  await tester.testEndpoint(url, users, 5, 100);
  await sleep(30000); // 30-second intervals
}

// Step-down pattern
for (let users = 100; users >= 10; users -= 10) {
  await tester.testEndpoint(url, users, 5, 100);
  await sleep(30000);
}
```

### Custom Metrics Collection
```javascript
// Collect custom metrics
const customMetrics = {
  memoryUsage: process.memoryUsage(),
  cpuUsage: process.cpuUsage(),
  eventLoopDelay: await measureEventLoopDelay()
};

tester.recordCustomMetrics(customMetrics);
```

## 📚 Best Practices

### 1. Test Environment Setup
- Use dedicated test environments
- Ensure test data is representative
- Monitor system resources during tests
- Clean up test data after completion

### 2. Test Execution
- Start with light loads and gradually increase
- Run tests during off-peak hours for production
- Allow system recovery time between tests
- Monitor for memory leaks and resource exhaustion

### 3. Result Analysis
- Focus on trends rather than single metrics
- Compare results across different test runs
- Investigate outliers and anomalies
- Prioritize fixes based on business impact

### 4. Continuous Improvement
- Regularly update test scenarios
- Incorporate new performance requirements
- Automate regular testing schedules
- Share insights with development teams

## 🐛 Troubleshooting

### Common Issues

#### High Error Rates
- Check application logs
- Verify database connectivity
- Review timeout configurations
- Monitor resource utilization

#### Slow Response Times
- Analyze database query performance
- Check for N+1 query problems
- Review caching strategies
- Monitor external service dependencies

#### Connection Pool Exhaustion
- Increase pool size limits
- Review connection timeout settings
- Check for connection leaks
- Monitor pool utilization metrics

### Debug Mode
Enable debug logging:
```bash
DEBUG=loadtest:* node scripts/load-testing.js basic http://localhost:3000
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the configuration documentation
3. Examine test result reports for insights
4. Contact the development team with detailed logs

---

**Note**: This load testing suite is designed for the INR100 Platform. Adapt configurations and scenarios based on your specific requirements and infrastructure.