/**
 * INR100 Platform - Load Testing Configuration
 * Performance thresholds and testing scenarios
 */

module.exports = {
  // Test Environment Configuration
  environment: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    timeout: 30000,
    retries: 3,
    warmupRequests: 10
  },

  // Performance Thresholds
  thresholds: {
    responseTime: {
      excellent: 200,    // < 200ms
      good: 500,         // < 500ms
      acceptable: 1000,  // < 1000ms
      poor: 2000,        // < 2000ms
      critical: 5000     // >= 5000ms
    },
    errorRate: {
      excellent: 0.1,    // < 0.1%
      good: 1,           // < 1%
      acceptable: 5,     // < 5%
      critical: 10       // >= 10%
    },
    throughput: {
      low: 50,           // < 50 RPS
      medium: 200,       // < 200 RPS
      high: 500,         // < 500 RPS
      excellent: 1000    // >= 1000 RPS
    },
    concurrentUsers: {
      light: 10,
      moderate: 50,
      heavy: 100,
      extreme: 500,
      breaking: 1000
    }
  },

  // Test Scenarios
  scenarios: {
    // Light Load Test - Normal user behavior
    lightLoad: {
      name: 'Light Load Test',
      description: 'Simulates normal daily traffic',
      concurrentUsers: 10,
      requestsPerUser: 5,
      duration: '2 minutes',
      endpoints: [
        '/api/health',
        '/api/users/profile',
        '/api/markets/price',
        '/api/transactions/history'
      ],
      delayBetweenRequests: 200
    },

    // Moderate Load Test - Peak hours simulation
    moderateLoad: {
      name: 'Moderate Load Test',
      description: 'Simulates peak trading hours',
      concurrentUsers: 50,
      requestsPerUser: 10,
      duration: '5 minutes',
      endpoints: [
        '/api/health',
        '/api/users/profile',
        '/api/markets/price',
        '/api/transactions/history',
        '/api/orders/create',
        '/api/orders/history'
      ],
      delayBetweenRequests: 100
    },

    // Heavy Load Test - Stress testing
    heavyLoad: {
      name: 'Heavy Load Test',
      description: 'Simulates high-stress scenarios',
      concurrentUsers: 100,
      requestsPerUser: 15,
      duration: '10 minutes',
      endpoints: [
        '/api/health',
        '/api/users/profile',
        '/api/markets/price',
        '/api/transactions/history',
        '/api/orders/create',
        '/api/orders/history',
        '/api/portfolio/summary',
        '/api/analytics/performance'
      ],
      delayBetweenRequests: 50
    },

    // Spike Test - Sudden traffic surge
    spikeTest: {
      name: 'Spike Test',
      description: 'Tests system response to sudden traffic surge',
      pattern: 'spike',
      baseUsers: 10,
      spikeUsers: 200,
      spikeDuration: '30 seconds',
      totalDuration: '3 minutes',
      endpoints: [
        '/api/health',
        '/api/markets/price'
      ]
    },

    // Endurance Test - Long-running stability
    enduranceTest: {
      name: 'Endurance Test',
      description: 'Tests system stability over extended period',
      concurrentUsers: 25,
      duration: '30 minutes',
      endpoints: [
        '/api/health',
        '/api/users/profile',
        '/api/markets/price'
      ],
      continuous: true
    },

    // Database Load Test
    databaseLoad: {
      name: 'Database Load Test',
      description: 'Tests database performance under load',
      concurrentUsers: 30,
      queriesPerUser: 8,
      duration: '5 minutes',
      databaseQueries: [
        'SELECT COUNT(*) FROM users WHERE active = true',
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
        'SELECT symbol, price FROM market_data WHERE updated_at > NOW() - INTERVAL 1 HOUR',
        'SELECT * FROM orders WHERE status = "pending" ORDER BY created_at ASC LIMIT 20'
      ]
    }
  },

  // API Endpoints Configuration
  endpoints: {
    // Public endpoints (no authentication required)
    public: {
      '/api/health': {
        method: 'GET',
        weight: 10, // Priority in load testing
        critical: true
      },
      '/api/markets/price': {
        method: 'GET',
        weight: 15,
        critical: true
      },
      '/api/markets/indices': {
        method: 'GET',
        weight: 8,
        critical: false
      }
    },

    // Protected endpoints (authentication required)
    protected: {
      '/api/users/profile': {
        method: 'GET',
        weight: 12,
        critical: true,
        auth: true
      },
      '/api/transactions/history': {
        method: 'GET',
        weight: 10,
        critical: false,
        auth: true
      },
      '/api/orders/create': {
        method: 'POST',
        weight: 5,
        critical: true,
        auth: true
      },
      '/api/orders/history': {
        method: 'GET',
        weight: 8,
        critical: false,
        auth: true
      },
      '/api/portfolio/summary': {
        method: 'GET',
        weight: 6,
        critical: false,
        auth: true
      },
      '/api/analytics/performance': {
        method: 'GET',
        weight: 4,
        critical: false,
        auth: true
      }
    }
  },

  // Load Test Schedule
  schedule: {
    // Daily health check
    daily: {
      name: 'Daily Load Check',
      time: '02:00',
      scenario: 'lightLoad',
      notifications: ['email']
    },

    // Weekly comprehensive test
    weekly: {
      name: 'Weekly Comprehensive Test',
      day: 'Sunday',
      time: '01:00',
      scenario: 'moderateLoad',
      notifications: ['email', 'slack']
    },

    // Monthly stress test
    monthly: {
      name: 'Monthly Stress Test',
      day: 'last Sunday',
      time: '00:00',
      scenario: 'heavyLoad',
      notifications: ['email', 'slack', 'sms']
    }
  },

  // Monitoring Configuration
  monitoring: {
    // Real-time monitoring
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
    },

    // Alerts configuration
    alerts: {
      responseTimeThreshold: 1000, // ms
      errorRateThreshold: 5,       // %
      throughputThreshold: 100,    // RPS
      cpuThreshold: 80,            // %
      memoryThreshold: 85          // %
    },

    // Dashboard configuration
    dashboard: {
      enabled: true,
      port: 3001,
      refreshInterval: 1000 // 1 second
    }
  },

  // Report Configuration
  reporting: {
    formats: ['json', 'html', 'csv'],
    retention: '30 days',
    outputDirectory: './results',
    includeCharts: true,
    includeRawData: true,
    compressOldReports: true
  },

  // Environment-specific settings
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
};