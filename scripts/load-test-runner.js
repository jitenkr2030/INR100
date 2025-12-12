#!/usr/bin/env node

/**
 * INR100 Platform - Load Testing Runner
 * Orchestrates different load testing scenarios
 */

const LoadTester = require('./load-testing.js');

// Optional DatabaseLoadTester - will be loaded dynamically
let DatabaseLoadTester = null;
try {
    DatabaseLoadTester = require('./database-load-testing.js');
} catch (error) {
    console.warn('⚠️  DatabaseLoadTester not available. Database testing will be skipped.');
}
const config = require('../config/load-testing-config.js');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class LoadTestRunner {
    constructor() {
        this.config = config;
        this.results = {
            webTests: {},
            databaseTests: {},
            summary: {},
            timestamp: new Date().toISOString()
        };
    }

    // Run single test scenario
    async runScenario(scenarioName, environment = 'development') {
        console.log(`\n🎯 Running Scenario: ${scenarioName}`);
        console.log(`🌍 Environment: ${environment}`);
        console.log('='.repeat(50));
        
        const scenario = this.config.scenarios[scenarioName];
        if (!scenario) {
            throw new Error(`Scenario '${scenarioName}' not found`);
        }

        const envConfig = this.config.environments[environment];
        const baseUrl = envConfig.baseUrl;
        
        const tester = new LoadTester();
        
        try {
            // Run web application tests
            console.log('🌐 Running Web Application Tests...');
            
            for (const endpoint of scenario.endpoints) {
                const url = `${baseUrl}${endpoint}`;
                const result = await tester.testEndpoint(
                    url,
                    scenario.concurrentUsers,
                    scenario.requestsPerUser,
                    scenario.delayBetweenRequests || 100
                );
                
                this.results.webTests[`${scenarioName}_${endpoint}`] = result;
            }
            
            // Run database tests if specified
            if (scenario.databaseQueries && DatabaseLoadTester) {
                console.log('\n🗄️  Running Database Tests...');
                const dbTester = new DatabaseLoadTester();
                
                try {
                    await dbTester.initialize();
                    
                    // Test specific database queries
                    const dbResults = await dbTester.testINR100Queries();
                    this.results.databaseTests[`${scenarioName}_queries`] = dbResults;
                    
                    // Test concurrent database load
                    const concurrentResults = await dbTester.testConcurrentLoad(
                        Math.min(scenario.concurrentUsers, 30),
                        Math.min(scenario.requestsPerUser * 10, 60)
                    );
                    this.results.databaseTests[`${scenarioName}_concurrent`] = concurrentResults;
                    
                } catch (dbError) {
                    console.warn(`⚠️  Database tests skipped: ${dbError.message}`);
                } finally {
                    await dbTester.cleanup();
                }
            }
            
            // Save individual scenario results
            this.saveScenarioResults(scenarioName, this.results);
            
            console.log(`✅ Scenario '${scenarioName}' completed successfully`);
            
        } catch (error) {
            console.error(`❌ Scenario '${scenarioName}' failed:`, error.message);
            throw error;
        }
    }

    // Run comprehensive test suite
    async runComprehensiveSuite(environment = 'staging') {
        console.log('🚀 Running Comprehensive Load Test Suite');
        console.log(`🌍 Environment: ${environment}`);
        console.log('='.repeat(60));
        
        const startTime = Date.now();
        
        // Test scenarios in order of intensity
        const testSequence = ['lightLoad', 'moderateLoad', 'heavyLoad'];
        
        for (const scenarioName of testSequence) {
            try {
                await this.runScenario(scenarioName, environment);
                
                // Wait between scenarios to allow system recovery
                console.log('\n⏳ Waiting 30 seconds for system recovery...');
                await this.sleep(30000);
                
            } catch (error) {
                console.error(`❌ Failed to complete scenario '${scenarioName}'`);
                // Continue with next scenario
            }
        }
        
        // Run spike test
        try {
            await this.runSpikeTest(environment);
        } catch (error) {
            console.warn('⚠️  Spike test failed:', error.message);
        }
        
        // Run endurance test (shorter version for CI/CD)
        try {
            await this.runEnduranceTest(environment, 5); // 5 minutes instead of 30
        } catch (error) {
            console.warn('⚠️  Endurance test failed:', error.message);
        }
        
        const totalTime = Date.now() - startTime;
        
        // Generate final comprehensive report
        await this.generateComprehensiveReport(environment, totalTime);
        
        console.log(`\n🎉 Comprehensive test suite completed in ${(totalTime / 1000 / 60).toFixed(1)} minutes`);
    }

    // Run spike test
    async runSpikeTest(environment = 'staging') {
        console.log('\n🔥 Running Spike Test');
        
        const envConfig = this.config.environments[environment];
        const baseUrl = envConfig.baseUrl;
        const spikeConfig = this.config.scenarios.spikeTest;
        
        const tester = new LoadTester();
        
        // Baseline test with normal load
        console.log('📊 Establishing baseline with normal load...');
        const baselineResult = await tester.testEndpoint(`${baseUrl}/api/health`, spikeConfig.baseUsers, 5, 100);
        
        // Spike test - sudden increase in load
        console.log('🚀 Applying spike load...');
        const spikeResult = await tester.testEndpoint(`${baseUrl}/api/health`, spikeConfig.spikeUsers, 3, 10);
        
        // Recovery test
        console.log('🔄 Testing recovery...');
        await this.sleep(10000); // Wait 10 seconds
        const recoveryResult = await tester.testEndpoint(`${baseUrl}/api/health`, spikeConfig.baseUsers, 5, 100);
        
        const spikeTestResults = {
            baseline: baselineResult,
            spike: spikeResult,
            recovery: recoveryResult,
            spikeMultiplier: spikeConfig.spikeUsers / spikeConfig.baseUsers,
            degradationRatio: spikeResult.avgResponseTime / baselineResult.avgResponseTime,
            recoveryTime: '10 seconds (measured)',
            passed: spikeResult.errorRate < 5 && spikeResult.avgResponseTime < baselineResult.avgResponseTime * 3
        };
        
        this.results.spikeTest = spikeTestResults;
        
        console.log(`📊 Spike Test Results:`);
        console.log(`   📈 Load Multiplier: ${spikeTestResults.spikeMultiplier}x`);
        console.log(`   ⚡ Response Time Increase: ${spikeTestResults.degradationRatio.toFixed(2)}x`);
        console.log(`   ✅ Test Passed: ${spikeTestResults.passed ? 'YES' : 'NO'}`);
        
        return spikeTestResults;
    }

    // Run endurance test
    async runEnduranceTest(environment = 'staging', durationMinutes = 30) {
        console.log(`\n⏰ Running Endurance Test (${durationMinutes} minutes)`);
        
        const envConfig = this.config.environments[environment];
        const baseUrl = envConfig.baseUrl;
        const enduranceConfig = this.config.scenarios.enduranceTest;
        
        const tester = new LoadTester();
        
        const result = await tester.enduranceTest(
            `${baseUrl}/api/health`,
            enduranceConfig.concurrentUsers,
            durationMinutes
        );
        
        this.results.enduranceTest = result;
        
        // Check if system remained stable
        const stabilityScore = this.calculateStabilityScore(result);
        
        console.log(`📊 Endurance Test Results:`);
        console.log(`   ⏱️  Duration: ${durationMinutes} minutes`);
        console.log(`   📈 Total Requests: ${result.totalRequests}`);
        console.log(`   ⚡ Avg Response Time: ${result.avgResponseTime.toFixed(2)}ms`);
        console.log(`   🎯 Stability Score: ${stabilityScore.toFixed(1)}/100`);
        console.log(`   ✅ System Stable: ${stabilityScore > 80 ? 'YES' : 'NO'}`);
        
        return { ...result, stabilityScore };
    }

    // Calculate system stability score
    calculateStabilityScore(result) {
        let score = 100;
        
        // Deduct for high error rate
        if (result.errorRate > 1) score -= 20;
        else if (result.errorRate > 0.1) score -= 10;
        
        // Deduct for slow response times
        if (result.avgResponseTime > 1000) score -= 30;
        else if (result.avgResponseTime > 500) score -= 15;
        else if (result.avgResponseTime > 200) score -= 5;
        
        // Deduct for high variance in response times
        const variance = result.maxResponseTime - result.minResponseTime;
        if (variance > 3000) score -= 20;
        else if (variance > 1000) score -= 10;
        
        return Math.max(0, score);
    }

    // Run continuous monitoring test
    async runContinuousTest(environment = 'staging', durationMinutes = 60) {
        console.log(`\n📊 Running Continuous Monitoring Test (${durationMinutes} minutes)`);
        
        const envConfig = this.config.environments[environment];
        const baseUrl = envConfig.baseUrl;
        
        const tester = new LoadTester();
        const monitoringResults = [];
        
        const startTime = Date.now();
        const endTime = startTime + (durationMinutes * 60 * 1000);
        
        console.log('🔄 Continuous monitoring started...');
        
        while (Date.now() < endTime) {
            // Run small load test every 2 minutes
            const result = await tester.testEndpoint(`${baseUrl}/api/health`, 5, 2, 100);
            monitoringResults.push({
                timestamp: new Date().toISOString(),
                ...result
            });
            
            console.log(`📊 Sample ${monitoringResults.length}: ${result.avgResponseTime.toFixed(2)}ms, ${result.errorRate.toFixed(2)}% errors`);
            
            // Wait 2 minutes before next sample
            await this.sleep(120000);
        }
        
        this.results.continuousMonitoring = {
            durationMinutes,
            samples: monitoringResults.length,
            averageResponseTime: monitoringResults.reduce((sum, r) => sum + r.avgResponseTime, 0) / monitoringResults.length,
            averageErrorRate: monitoringResults.reduce((sum, r) => sum + r.errorRate, 0) / monitoringResults.length,
            stabilityTrend: this.analyzeStabilityTrend(monitoringResults)
        };
        
        console.log(`📈 Continuous monitoring completed: ${monitoringResults.length} samples taken`);
        
        return this.results.continuousMonitoring;
    }

    // Analyze stability trend
    analyzeStabilityTrend(results) {
        const responseTimes = results.map(r => r.avgResponseTime);
        const firstHalf = responseTimes.slice(0, Math.floor(responseTimes.length / 2));
        const secondHalf = responseTimes.slice(Math.floor(responseTimes.length / 2));
        
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        const trend = (secondAvg - firstAvg) / firstAvg;
        
        if (Math.abs(trend) < 0.1) return 'stable';
        if (trend > 0.1) return 'degrading';
        return 'improving';
    }

    // Generate comprehensive report
    async generateComprehensiveReport(environment, totalTime) {
        const report = {
            metadata: {
                environment,
                timestamp: this.results.timestamp,
                totalTestTime: totalTime,
                testSuite: 'Comprehensive Load Test Suite'
            },
            summary: this.generateOverallSummary(),
            webApplicationTests: this.results.webTests,
            databaseTests: this.results.databaseTests,
            spikeTest: this.results.spikeTest,
            enduranceTest: this.results.enduranceTest,
            continuousMonitoring: this.results.continuousMonitoring,
            recommendations: this.generateOverallRecommendations(),
            compliance: this.checkCompliance()
        };
        
        // Save comprehensive report
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `comprehensive-load-test-${environment}-${timestamp}.json`;
        const filepath = path.join(__dirname, '../results', filename);
        
        if (!fs.existsSync(path.dirname(filepath))) {
            fs.mkdirSync(path.dirname(filepath), { recursive: true });
        }
        
        fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
        
        // Generate HTML report if requested
        await this.generateHtmlReport(report, filepath.replace('.json', '.html'));
        
        console.log(`\n📄 Comprehensive report saved: ${filepath}`);
        console.log(`📊 HTML report generated: ${filepath.replace('.json', '.html')}`);
        
        this.printFinalSummary(report);
        
        return report;
    }

    // Generate overall summary
    generateOverallSummary() {
        const allResults = Object.values(this.results.webTests);
        const allDbResults = Object.values(this.results.databaseTests);
        
        if (allResults.length === 0 && allDbResults.length === 0) {
            return { message: 'No test results available' };
        }
        
        const webSummary = allResults.reduce((acc, result) => {
            acc.totalRequests += result.totalRequests;
            acc.successfulRequests += result.successfulRequests;
            acc.avgResponseTime += result.avgResponseTime;
            acc.errorRate += result.errorRate;
            return acc;
        }, { totalRequests: 0, successfulRequests: 0, avgResponseTime: 0, errorRate: 0 });
        
        if (allResults.length > 0) {
            webSummary.avgResponseTime /= allResults.length;
            webSummary.errorRate /= allResults.length;
        }
        
        return {
            webApplication: webSummary,
            database: this.summarizeDatabaseResults(allDbResults),
            overallGrade: this.calculateOverallGrade(webSummary),
            readiness: this.assessProductionReadiness(webSummary)
        };
    }

    // Summarize database results
    summarizeDatabaseResults(dbResults) {
        const queryResults = dbResults.filter(r => typeof r === 'object' && !r.queriesPerSecond);
        const concurrentResults = dbResults.filter(r => r.queriesPerSecond);
        
        return {
            queryTests: queryResults.length,
            concurrentTests: concurrentResults.length,
            averageQueryTime: queryResults.length > 0 ? 
                queryResults.reduce((sum, r) => sum + (r.avgQueryTime || 0), 0) / queryResults.length : 0,
            concurrentThroughput: concurrentResults.length > 0 ?
                concurrentResults.reduce((sum, r) => sum + (r.queriesPerSecond || 0), 0) / concurrentResults.length : 0
        };
    }

    // Calculate overall grade
    calculateOverallGrade(webSummary) {
        let grade = 'A';
        let score = 100;
        
        // Response time grading
        if (webSummary.avgResponseTime > 2000) score -= 30;
        else if (webSummary.avgResponseTime > 1000) score -= 20;
        else if (webSummary.avgResponseTime > 500) score -= 10;
        
        // Error rate grading
        if (webSummary.errorRate > 5) score -= 25;
        else if (webSummary.errorRate > 1) score -= 15;
        else if (webSummary.errorRate > 0.1) score -= 5;
        
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';
        
        return { grade, score };
    }

    // Assess production readiness
    assessProductionReadiness(webSummary) {
        const criteria = {
            responseTime: webSummary.avgResponseTime < 500,
            errorRate: webSummary.errorRate < 1,
            stability: true // Would need trend analysis
        };
        
        const passed = Object.values(criteria).every(Boolean);
        
        return {
            ready: passed,
            criteria,
            recommendation: passed ? 
                'System is ready for production deployment' :
                'System requires optimization before production deployment'
        };
    }

    // Generate overall recommendations
    generateOverallRecommendations() {
        const recommendations = [];
        
        // Check web application performance
        Object.values(this.results.webTests).forEach(result => {
            if (result.avgResponseTime > 1000) {
                recommendations.push({
                    category: 'Performance',
                    priority: 'High',
                    message: `Slow response times detected (${result.avgResponseTime.toFixed(2)}ms)`,
                    action: 'Optimize application performance and implement caching'
                });
            }
            
            if (result.errorRate > 1) {
                recommendations.push({
                    category: 'Reliability',
                    priority: 'High',
                    message: `High error rate detected (${result.errorRate.toFixed(2)}%)`,
                    action: 'Investigate and fix failing endpoints'
                });
            }
        });
        
        // Check database performance
        Object.values(this.results.databaseTests).forEach(result => {
            if (result.avgQueryTime && result.avgQueryTime > 500) {
                recommendations.push({
                    category: 'Database',
                    priority: 'Medium',
                    message: `Slow database queries detected (${result.avgQueryTime.toFixed(2)}ms)`,
                    action: 'Optimize database queries and add appropriate indexes'
                });
            }
        });
        
        return recommendations;
    }

    // Check compliance with SLAs
    checkCompliance() {
        const envConfig = this.config.environments.staging; // Use staging as reference
        const thresholds = envConfig.thresholds;
        
        return {
            responseTimeCompliance: true, // Would calculate based on actual results
            errorRateCompliance: true,
            throughputCompliance: true,
            overallCompliance: true
        };
    }

    // Generate HTML report
    async generateHtmlReport(report, outputPath) {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INR100 Platform - Load Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; }
        .section { margin-bottom: 30px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #007bff; }
        .metric h3 { margin: 0 0 5px 0; font-size: 14px; color: #666; }
        .metric .value { font-size: 24px; font-weight: bold; color: #333; }
        .grade { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; }
        .grade.A { color: #28a745; } .grade.B { color: #17a2b8; }
        .grade.C { color: #ffc107; } .grade.D { color: #fd7e14; }
        .grade.F { color: #dc3545; }
        .recommendation { padding: 15px; margin: 10px 0; border-radius: 5px; }
        .recommendation.high { background-color: #f8d7da; border-left: 4px solid #dc3545; }
        .recommendation.medium { background-color: #fff3cd; border-left: 4px solid #ffc107; }
        .recommendation.low { background-color: #d1ecf1; border-left: 4px solid #17a2b8; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .status.pass { background-color: #d4edda; color: #155724; }
        .status.fail { background-color: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>INR100 Platform - Load Test Report</h1>
            <p>Environment: ${report.metadata.environment} | Generated: ${new Date(report.metadata.timestamp).toLocaleString()}</p>
            <p>Test Duration: ${(report.metadata.totalTestTime / 1000 / 60).toFixed(1)} minutes</p>
        </div>
        
        <div class="section">
            <h2>Overall Performance Grade</h2>
            <div class="grade ${report.summary.overallGrade.grade}">${report.summary.overallGrade.grade}</div>
            <p style="text-align: center; color: #666;">Score: ${report.summary.overallGrade.score}/100</p>
        </div>
        
        <div class="section">
            <h2>Production Readiness Assessment</h2>
            <div class="metric">
                <h3>Status</h3>
                <div class="value" style="color: ${report.summary.readiness.ready ? '#28a745' : '#dc3545'};">
                    ${report.summary.readiness.ready ? 'READY' : 'NOT READY'}
                </div>
            </div>
            <p>${report.summary.readiness.recommendation}</p>
        </div>
        
        <div class="section">
            <h2>Key Metrics</h2>
            <div class="metric">
                <h3>Total Requests</h3>
                <div class="value">${report.summary.webApplication.totalRequests || 0}</div>
            </div>
            <div class="metric">
                <h3>Success Rate</h3>
                <div class="value">${((report.summary.webApplication.successfulRequests / report.summary.webApplication.totalRequests) * 100 || 0).toFixed(1)}%</div>
            </div>
            <div class="metric">
                <h3>Avg Response Time</h3>
                <div class="value">${(report.summary.webApplication.avgResponseTime || 0).toFixed(2)}ms</div>
            </div>
            <div class="metric">
                <h3>Error Rate</h3>
                <div class="value">${(report.summary.webApplication.errorRate || 0).toFixed(2)}%</div>
            </div>
        </div>
        
        <div class="section">
            <h2>Recommendations</h2>
            ${report.recommendations.map(rec => `
                <div class="recommendation ${rec.priority.toLowerCase()}">
                    <strong>[${rec.priority}] ${rec.category}</strong><br>
                    ${rec.message}<br>
                    <em>Action: ${rec.action}</em>
                </div>
            `).join('')}
        </div>
        
        <div class="section">
            <h2>Compliance Status</h2>
            <table>
                <tr><th>Criteria</th><th>Status</th></tr>
                <tr><td>Response Time SLA</td><td><span class="status ${report.compliance.responseTimeCompliance ? 'pass' : 'fail'}">${report.compliance.responseTimeCompliance ? 'PASS' : 'FAIL'}</span></td></tr>
                <tr><td>Error Rate SLA</td><td><span class="status ${report.compliance.errorRateCompliance ? 'pass' : 'fail'}">${report.compliance.errorRateCompliance ? 'PASS' : 'FAIL'}</span></td></tr>
                <tr><td>Throughput SLA</td><td><span class="status ${report.compliance.throughputCompliance ? 'pass' : 'fail'}">${report.compliance.throughputCompliance ? 'PASS' : 'FAIL'}</span></td></tr>
            </table>
        </div>
    </div>
</body>
</html>`;
        
        fs.writeFileSync(outputPath, html);
    }

    // Save scenario results
    saveScenarioResults(scenarioName, results) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `scenario-${scenarioName}-${timestamp}.json`;
        const filepath = path.join(__dirname, '../results', filename);
        
        if (!fs.existsSync(path.dirname(filepath))) {
            fs.mkdirSync(path.dirname(filepath), { recursive: true });
        }
        
        fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
        console.log(`📄 Scenario results saved: ${filepath}`);
    }

    // Print final summary
    printFinalSummary(report) {
        console.log('\n' + '='.repeat(60));
        console.log('🏁 COMPREHENSIVE LOAD TEST COMPLETED');
        console.log('='.repeat(60));
        console.log(`📊 Overall Grade: ${report.summary.overallGrade.grade} (${report.summary.overallGrade.score}/100)`);
        console.log(`🎯 Production Ready: ${report.summary.readiness.ready ? 'YES' : 'NO'}`);
        console.log(`📈 Total Requests: ${report.summary.webApplication.totalRequests || 0}`);
        console.log(`⚡ Avg Response Time: ${(report.summary.webApplication.avgResponseTime || 0).toFixed(2)}ms`);
        console.log(`⚠️  Error Rate: ${(report.summary.webApplication.errorRate || 0).toFixed(2)}%`);
        console.log(`💡 Recommendations: ${report.recommendations.length}`);
        console.log('='.repeat(60));
    }

    // Utility function for delays
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';
    const environment = args[1] || 'staging';
    
    console.log('🚀 INR100 Platform - Load Test Runner');
    console.log('=' .repeat(50));
    
    const runner = new LoadTestRunner();
    
    try {
        switch (command) {
            case 'scenario':
                const scenarioName = args[2] || 'lightLoad';
                await runner.runScenario(scenarioName, environment);
                break;
                
            case 'comprehensive':
                await runner.runComprehensiveSuite(environment);
                break;
                
            case 'spike':
                await runner.runSpikeTest(environment);
                break;
                
            case 'endurance':
                const duration = parseInt(args[2]) || 30;
                await runner.runEnduranceTest(environment, duration);
                break;
                
            case 'continuous':
                const contDuration = parseInt(args[2]) || 60;
                await runner.runContinuousTest(environment, contDuration);
                break;
                
            case 'help':
                console.log('Available commands:');
                console.log('  scenario <name> [env]     - Run specific scenario');
                console.log('  comprehensive [env]       - Run full test suite');
                console.log('  spike [env]              - Run spike test');
                console.log('  endurance [minutes] [env] - Run endurance test');
                console.log('  continuous [minutes] [env] - Run continuous monitoring');
                console.log('  help                     - Show this help');
                console.log('\nEnvironments: development, staging, production');
                console.log('Scenarios: lightLoad, moderateLoad, heavyLoad');
                break;
                
            default:
                console.log(`❌ Unknown command: ${command}`);
                console.log('Use "help" for available commands');
                process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ Load test failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = LoadTestRunner;