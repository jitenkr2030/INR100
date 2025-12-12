#!/usr/bin/env node

/**
 * INR100 Platform - Load Testing Suite
 * Comprehensive load testing for production readiness
 */

const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

class LoadTester {
    constructor() {
        this.results = {
            summary: {
                totalRequests: 0,
                successfulRequests: 0,
                failedRequests: 0,
                totalTime: 0,
                avgResponseTime: 0,
                maxResponseTime: 0,
                minResponseTime: Infinity,
                requestsPerSecond: 0,
                errorRate: 0
            },
            detailed: [],
            endpoints: {}
        };
    }

    // Make HTTP request and measure performance
    makeRequest(url, method = 'GET', headers = {}, body = null) {
        return new Promise((resolve, reject) => {
            const startTime = performance.now();
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: method,
                headers: {
                    'User-Agent': 'INR100-LoadTest/1.0',
                    'Accept': 'application/json',
                    ...headers
                }
            };

            const protocol = parsedUrl.protocol === 'https:' ? https : http;
            const req = protocol.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    const endTime = performance.now();
                    const responseTime = endTime - startTime;
                    
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: data,
                        responseTime: responseTime,
                        success: res.statusCode < 400
                    });
                });
            });

            req.on('error', (error) => {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                
                resolve({
                    statusCode: 0,
                    headers: {},
                    data: '',
                    responseTime: responseTime,
                    success: false,
                    error: error.message
                });
            });

            if (body) {
                req.write(body);
            }
            
            req.end();
        });
    }

    // Test single endpoint with multiple concurrent requests
    async testEndpoint(url, concurrentUsers = 10, requestsPerUser = 1, delayBetweenRequests = 100) {
        console.log(`\n🧪 Testing: ${url}`);
        console.log(`👥 Concurrent Users: ${concurrentUsers}`);
        console.log(`📊 Requests per User: ${requestsPerUser}`);
        console.log(`⏱️  Delay between requests: ${delayBetweenRequests}ms`);
        
        const promises = [];
        
        for (let user = 0; user < concurrentUsers; user++) {
            for (let request = 0; request < requestsPerUser; request++) {
                promises.push(
                    new Promise(async (resolve) => {
                        const result = await this.makeRequest(url);
                        resolve(result);
                        
                        // Add delay between requests from same user
                        if (request < requestsPerUser - 1) {
                            await new Promise(r => setTimeout(r, delayBetweenRequests));
                        }
                    })
                );
            }
        }

        const startTime = performance.now();
        const results = await Promise.all(promises);
        const totalTime = performance.now() - startTime;

        // Analyze results
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        const responseTimes = results.map(r => r.responseTime);
        
        const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
        const maxResponseTime = Math.max(...responseTimes);
        const minResponseTime = Math.min(...responseTimes);
        const requestsPerSecond = results.length / (totalTime / 1000);
        const errorRate = (failed.length / results.length) * 100;

        const endpointResult = {
            url,
            concurrentUsers,
            requestsPerUser,
            totalRequests: results.length,
            successfulRequests: successful.length,
            failedRequests: failed.length,
            totalTime,
            avgResponseTime,
            maxResponseTime,
            minResponseTime,
            requestsPerSecond,
            errorRate,
            statusCodes: this.getStatusCodeDistribution(results)
        };

        // Store results
        this.results.endpoints[url] = endpointResult;
        this.results.detailed.push(...results);

        // Update summary
        this.results.summary.totalRequests += results.length;
        this.results.summary.successfulRequests += successful.length;
        this.results.summary.failedRequests += failed.length;
        this.results.summary.totalTime = Math.max(this.results.summary.totalTime, totalTime);

        // Print results
        this.printEndpointResults(endpointResult);
        
        return endpointResult;
    }

    // Get status code distribution
    getStatusCodeDistribution(results) {
        const distribution = {};
        results.forEach(result => {
            const status = result.statusCode || 'ERROR';
            distribution[status] = (distribution[status] || 0) + 1;
        });
        return distribution;
    }

    // Print endpoint results
    printEndpointResults(result) {
        console.log(`\n📊 Results for ${result.url}:`);
        console.log(`   ✅ Successful: ${result.successfulRequests}/${result.totalRequests}`);
        console.log(`   ❌ Failed: ${result.failedRequests}/${result.totalRequests}`);
        console.log(`   ⚡ Avg Response Time: ${result.avgResponseTime.toFixed(2)}ms`);
        console.log(`   🚀 Max Response Time: ${result.maxResponseTime.toFixed(2)}ms`);
        console.log(`   🐌 Min Response Time: ${result.minResponseTime.toFixed(2)}ms`);
        console.log(`   📈 RPS: ${result.requestsPerSecond.toFixed(2)}`);
        console.log(`   ⚠️  Error Rate: ${result.errorRate.toFixed(2)}%`);
        console.log(`   📋 Status Codes:`, result.statusCodes);
    }

    // Run stress test (gradually increase load)
    async stressTest(baseUrl, startUsers = 1, maxUsers = 100, step = 5, requestsPerStep = 10) {
        console.log(`\n🔥 STRESS TEST: ${baseUrl}`);
        console.log(`📈 Starting from ${startUsers} users to ${maxUsers} users`);
        console.log(`📊 Step increment: ${step} users`);
        console.log(`🎯 Requests per step: ${requestsPerStep}`);
        
        const stressResults = [];
        
        for (let users = startUsers; users <= maxUsers; users += step) {
            console.log(`\n--- Testing with ${users} concurrent users ---`);
            const result = await this.testEndpoint(baseUrl, users, Math.ceil(requestsPerStep / users), 50);
            stressResults.push({
                users,
                ...result
            });
            
            // Check if system is breaking down
            if (result.errorRate > 10 || result.avgResponseTime > 5000) {
                console.log(`\n⚠️  System breaking point detected at ${users} users`);
                break;
            }
        }
        
        return stressResults;
    }

    // Run endurance test (sustained load over time)
    async enduranceTest(url, users = 50, durationMinutes = 5) {
        console.log(`\n⏰ ENDURANCE TEST: ${url}`);
        console.log(`👥 Users: ${users}`);
        console.log(`🕐 Duration: ${durationMinutes} minutes`);
        
        const startTime = Date.now();
        const endTime = startTime + (durationMinutes * 60 * 1000);
        const requestsPerUser = Math.ceil((durationMinutes * 60) / users);
        const delayBetweenRequests = Math.max(100, (durationMinutes * 60 * 1000) / (users * requestsPerUser));
        
        const result = await this.testEndpoint(url, users, requestsPerUser, delayBetweenRequests);
        
        console.log(`\n⏰ Endurance test completed in ${(Date.now() - startTime) / 1000}s`);
        return result;
    }

    // Generate comprehensive load test report
    generateReport() {
        const summary = this.results.summary;
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                ...summary,
                avgResponseTime: summary.avgResponseTime || (this.results.detailed.reduce((sum, r) => sum + r.responseTime, 0) / this.results.detailed.length),
                maxResponseTime: Math.max(...this.results.detailed.map(r => r.responseTime)),
                minResponseTime: Math.min(...this.results.detailed.map(r => r.responseTime)),
                requestsPerSecond: summary.totalRequests / (summary.totalTime / 1000),
                errorRate: (summary.failedRequests / summary.totalRequests) * 100
            },
            endpoints: this.results.endpoints,
            performance: this.analyzePerformance(),
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    // Analyze performance metrics
    analyzePerformance() {
        const responseTimes = this.results.detailed.map(r => r.responseTime);
        const sortedTimes = responseTimes.sort((a, b) => a - b);
        
        return {
            p50: this.percentile(sortedTimes, 50),
            p90: this.percentile(sortedTimes, 90),
            p95: this.percentile(sortedTimes, 95),
            p99: this.percentile(sortedTimes, 99),
            throughput: this.results.summary.requestsPerSecond,
            averageResponseTime: this.results.summary.avgResponseTime,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime()
        };
    }

    // Calculate percentile
    percentile(sortedArray, p) {
        const index = Math.ceil((p / 100) * sortedArray.length) - 1;
        return sortedArray[Math.max(0, index)];
    }

    // Generate performance recommendations
    generateRecommendations() {
        const recommendations = [];
        const summary = this.results.summary;
        const avgResponseTime = summary.avgResponseTime || 0;
        const errorRate = summary.errorRate || 0;
        const requestsPerSecond = summary.requestsPerSecond || 0;

        if (avgResponseTime > 2000) {
            recommendations.push({
                type: 'performance',
                severity: 'high',
                message: 'High average response time detected (>2s). Consider optimizing database queries and implementing caching.',
                action: 'Review and optimize slow endpoints'
            });
        }

        if (errorRate > 5) {
            recommendations.push({
                type: 'reliability',
                severity: 'high',
                message: 'High error rate detected (>5%). Investigate failing endpoints and improve error handling.',
                action: 'Fix failing requests and improve error handling'
            });
        }

        if (requestsPerSecond < 100) {
            recommendations.push({
                type: 'scalability',
                severity: 'medium',
                message: 'Low throughput detected (<100 RPS). Consider horizontal scaling or load balancing.',
                action: 'Implement load balancing and auto-scaling'
            });
        }

        if (avgResponseTime < 500 && errorRate < 1) {
            recommendations.push({
                type: 'success',
                severity: 'info',
                message: 'Excellent performance metrics! System is ready for production traffic.',
                action: 'Continue monitoring in production'
            });
        }

        return recommendations;
    }

    // Save results to file
    saveResults(filename = null) {
        const report = this.generateReport();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename_final = filename || `load-test-report-${timestamp}.json`;
        const filepath = path.join(__dirname, '../results', filename_final);
        
        // Ensure results directory exists
        const resultsDir = path.dirname(filepath);
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Load test report saved to: ${filepath}`);
        
        return filepath;
    }

    // Print final summary
    printSummary() {
        const report = this.generateReport();
        console.log('\n' + '='.repeat(60));
        console.log('🎯 LOAD TEST SUMMARY');
        console.log('='.repeat(60));
        console.log(`📊 Total Requests: ${report.summary.totalRequests}`);
        console.log(`✅ Successful: ${report.summary.successfulRequests}`);
        console.log(`❌ Failed: ${report.summary.failedRequests}`);
        console.log(`⚡ Avg Response Time: ${report.summary.avgResponseTime.toFixed(2)}ms`);
        console.log(`🚀 Max Response Time: ${report.summary.maxResponseTime.toFixed(2)}ms`);
        console.log(`📈 Requests/Second: ${report.summary.requestsPerSecond.toFixed(2)}`);
        console.log(`⚠️  Error Rate: ${report.summary.errorRate.toFixed(2)}%`);
        
        console.log('\n📈 Performance Percentiles:');
        console.log(`   P50: ${report.performance.p50.toFixed(2)}ms`);
        console.log(`   P90: ${report.performance.p90.toFixed(2)}ms`);
        console.log(`   P95: ${report.performance.p95.toFixed(2)}ms`);
        console.log(`   P99: ${report.performance.p99.toFixed(2)}ms`);
        
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach((rec, index) => {
            console.log(`   ${index + 1}. [${rec.severity.toUpperCase()}] ${rec.message}`);
            console.log(`      Action: ${rec.action}`);
        });
        
        console.log('='.repeat(60));
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const testType = args[0] || 'basic';
    const baseUrl = args[1] || 'http://localhost:3000';
    
    console.log('🚀 INR100 Platform - Load Testing Suite');
    console.log('=' .repeat(50));
    
    const tester = new LoadTester();
    
    try {
        switch (testType) {
            case 'basic':
                console.log('🧪 Running basic load test...');
                await tester.testEndpoint(`${baseUrl}/api/health`, 10, 5, 100);
                break;
                
            case 'stress':
                console.log('🔥 Running stress test...');
                await tester.stressTest(`${baseUrl}/api/health`, 5, 50, 5, 20);
                break;
                
            case 'endurance':
                console.log('⏰ Running endurance test...');
                await tester.enduranceTest(`${baseUrl}/api/health`, 25, 2);
                break;
                
            case 'comprehensive':
                console.log('🎯 Running comprehensive load test...');
                
                // Test different endpoints
                const endpoints = [
                    `${baseUrl}/api/health`,
                    `${baseUrl}/api/users/profile`,
                    `${baseUrl}/api/markets/price`,
                    `${baseUrl}/api/transactions/history`
                ];
                
                for (const endpoint of endpoints) {
                    await tester.testEndpoint(endpoint, 15, 3, 50);
                }
                
                // Run stress test on health endpoint
                await tester.stressTest(`${baseUrl}/api/health`, 2, 30, 2, 15);
                break;
                
            default:
                console.log('❌ Unknown test type. Use: basic, stress, endurance, comprehensive');
                process.exit(1);
        }
        
        // Generate and save report
        tester.saveResults();
        tester.printSummary();
        
    } catch (error) {
        console.error('❌ Load test failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = LoadTester;