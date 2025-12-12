#!/usr/bin/env node

/**
 * INR100 Platform - Database Load Testing
 * Specialized database performance testing
 */

const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');

// Optional MySQL dependency - will be loaded dynamically
let mysql = null;
try {
    mysql = require('mysql2/promise');
} catch (error) {
    console.warn('⚠️  MySQL2 not available. Database testing will be skipped.');
    console.warn('   Install with: npm install mysql2');
}

class DatabaseLoadTester {
    constructor(config = {}) {
        this.config = {
            host: config.host || process.env.DB_HOST || 'localhost',
            port: config.port || process.env.DB_PORT || 3306,
            user: config.user || process.env.DB_USER || 'root',
            password: config.password || process.env.DB_PASSWORD || '',
            database: config.database || process.env.DB_NAME || 'inr100_platform',
            maxConnections: config.maxConnections || 50,
            connectionLimit: config.connectionLimit || 10,
            acquireTimeout: config.acquireTimeout || 60000,
            timeout: config.timeout || 60000,
            ...config
        };
        
        this.pool = null;
        this.results = {
            summary: {
                totalQueries: 0,
                successfulQueries: 0,
                failedQueries: 0,
                totalTime: 0,
                avgQueryTime: 0,
                maxQueryTime: 0,
                minQueryTime: Infinity,
                queriesPerSecond: 0,
                connectionPoolStats: {}
            },
            detailed: [],
            queries: {},
            performance: {}
        };
    }

    // Initialize database connection pool
    async initialize() {
        if (!mysql) {
            throw new Error('MySQL2 module not available. Please install with: npm install mysql2');
        }
        
        try {
            this.pool = mysql.createPool({
                host: this.config.host,
                port: this.config.port,
                user: this.config.user,
                password: this.config.password,
                database: this.config.database,
                waitForConnections: true,
                connectionLimit: this.config.connectionLimit,
                queueLimit: 0,
                acquireTimeout: this.config.acquireTimeout,
                timeout: this.config.timeout,
                reconnect: true,
                idleTimeout: 300000,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0
            });

            // Test connection
            const connection = await this.pool.getConnection();
            await connection.ping();
            connection.release();
            
            console.log(`✅ Database connection established to ${this.config.host}:${this.config.port}`);
            console.log(`📊 Database: ${this.config.database}`);
            
            return true;
        } catch (error) {
            console.error(`❌ Database connection failed:`, error.message);
            throw error;
        }
    }

    // Execute single query and measure performance
    async executeQuery(query, params = []) {
        const startTime = performance.now();
        let connection = null;
        
        try {
            connection = await this.pool.getConnection();
            
            const [rows, fields] = await connection.execute(query, params);
            const endTime = performance.now();
            const queryTime = endTime - startTime;
            
            return {
                success: true,
                queryTime: queryTime,
                rowsAffected: Array.isArray(rows) ? rows.length : 0,
                data: rows,
                error: null
            };
        } catch (error) {
            const endTime = performance.now();
            const queryTime = endTime - startTime;
            
            return {
                success: false,
                queryTime: queryTime,
                rowsAffected: 0,
                data: null,
                error: error.message
            };
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    // Test connection pool performance
    async testConnectionPool(concurrentConnections = 20, queriesPerConnection = 5) {
        console.log(`\n🔗 Testing Connection Pool Performance`);
        console.log(`   Concurrent Connections: ${concurrentConnections}`);
        console.log(`   Queries per Connection: ${queriesPerConnection}`);
        
        const startTime = performance.now();
        const promises = [];
        
        // Create connection test queries
        const testQueries = [
            'SELECT 1 as test',
            'SELECT NOW() as current_time',
            'SELECT DATABASE() as current_db',
            'SELECT VERSION() as mysql_version',
            'SELECT COUNT(*) as connection_test'
        ];
        
        for (let conn = 0; conn < concurrentConnections; conn++) {
            for (let query = 0; query < queriesPerConnection; query++) {
                const testQuery = testQueries[query % testQueries.length];
                promises.push(this.executeQuery(testQuery));
            }
        }
        
        const results = await Promise.all(promises);
        const totalTime = performance.now() - startTime;
        
        // Analyze results
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        const queryTimes = results.map(r => r.queryTime);
        
        const poolResult = {
            concurrentConnections,
            queriesPerConnection,
            totalQueries: results.length,
            successfulQueries: successful.length,
            failedQueries: failed.length,
            totalTime,
            avgQueryTime: queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length,
            maxQueryTime: Math.max(...queryTimes),
            minQueryTime: Math.min(...queryTimes),
            queriesPerSecond: results.length / (totalTime / 1000),
            connectionPoolStats: await this.getConnectionPoolStats()
        };
        
        console.log(`\n📊 Connection Pool Results:`);
        console.log(`   ✅ Successful: ${successful.length}/${results.length}`);
        console.log(`   ⚡ Avg Query Time: ${poolResult.avgQueryTime.toFixed(2)}ms`);
        console.log(`   🚀 Max Query Time: ${poolResult.maxQueryTime.toFixed(2)}ms`);
        console.log(`   📈 Queries/Second: ${poolResult.queriesPerSecond.toFixed(2)}`);
        
        return poolResult;
    }

    // Test specific INR100 database queries
    async testINR100Queries() {
        console.log(`\n💰 Testing INR100 Platform Queries`);
        
        const testQueries = [
            {
                name: 'User Count Query',
                query: 'SELECT COUNT(*) as user_count FROM users WHERE active = 1',
                weight: 10
            },
            {
                name: 'Recent Transactions',
                query: 'SELECT id, user_id, amount, created_at FROM transactions ORDER BY created_at DESC LIMIT 100',
                weight: 15
            },
            {
                name: 'Market Data Query',
                query: 'SELECT symbol, price, change_percent FROM market_data WHERE updated_at > NOW() - INTERVAL 1 HOUR ORDER BY updated_at DESC',
                weight: 12
            },
            {
                name: 'Pending Orders',
                query: 'SELECT id, user_id, symbol, quantity, price FROM orders WHERE status = "pending" ORDER BY created_at ASC LIMIT 50',
                weight: 8
            },
            {
                name: 'Portfolio Summary',
                query: 'SELECT u.id, u.username, SUM(t.amount) as total_amount FROM users u LEFT JOIN transactions t ON u.id = t.user_id GROUP BY u.id, u.username ORDER BY total_amount DESC LIMIT 20',
                weight: 5
            },
            {
                name: 'Daily Trading Volume',
                query: 'SELECT DATE(created_at) as trade_date, COUNT(*) as transaction_count, SUM(amount) as total_volume FROM transactions WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY DATE(created_at) ORDER BY trade_date DESC',
                weight: 6
            },
            {
                name: 'User Performance Analytics',
                query: 'SELECT u.id, u.username, COUNT(t.id) as transaction_count, AVG(t.amount) as avg_amount FROM users u LEFT JOIN transactions t ON u.id = t.user_id WHERE t.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY u.id, u.username HAVING transaction_count > 0 ORDER BY transaction_count DESC LIMIT 50',
                weight: 4
            }
        ];
        
        const queryResults = {};
        
        for (const testQuery of testQueries) {
            console.log(`\n🧪 Testing: ${testQuery.name}`);
            console.log(`   Query: ${testQuery.query.substring(0, 80)}...`);
            
            // Run query multiple times to get average performance
            const runs = 10;
            const results = [];
            
            for (let i = 0; i < runs; i++) {
                const result = await this.executeQuery(testQuery.query);
                results.push(result);
                
                // Small delay between runs
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            
            const successful = results.filter(r => r.success);
            const failed = results.filter(r => !r.error);
            const queryTimes = results.map(r => r.queryTime);
            
            const avgQueryTime = queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length;
            const maxQueryTime = Math.max(...queryTimes);
            const minQueryTime = Math.min(...queryTimes);
            
            queryResults[testQuery.name] = {
                query: testQuery.query,
                weight: testQuery.weight,
                runs: runs,
                successful: successful.length,
                failed: failed.length,
                avgQueryTime,
                maxQueryTime,
                minQueryTime,
                successRate: (successful.length / runs) * 100
            };
            
            console.log(`   ✅ Success Rate: ${queryResults[testQuery.name].successRate.toFixed(1)}%`);
            console.log(`   ⚡ Avg Time: ${avgQueryTime.toFixed(2)}ms`);
            console.log(`   🚀 Max Time: ${maxQueryTime.toFixed(2)}ms`);
        }
        
        return queryResults;
    }

    // Test database under concurrent load
    async testConcurrentLoad(concurrentUsers = 30, durationSeconds = 60) {
        console.log(`\n🔥 Concurrent Load Test`);
        console.log(`   Concurrent Users: ${concurrentUsers}`);
        console.log(`   Duration: ${durationSeconds} seconds`);
        
        const startTime = performance.now();
        const endTime = startTime + (durationSeconds * 1000);
        const promises = [];
        
        // Generate test queries with different weights
        const weightedQueries = [
            { query: 'SELECT COUNT(*) FROM users WHERE active = 1', weight: 3 },
            { query: 'SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10', weight: 5 },
            { query: 'SELECT symbol, price FROM market_data ORDER BY updated_at DESC LIMIT 20', weight: 4 },
            { query: 'SELECT * FROM orders WHERE status = "pending" LIMIT 5', weight: 2 },
            { query: 'SELECT u.username, COUNT(t.id) as tx_count FROM users u LEFT JOIN transactions t ON u.id = t.user_id GROUP BY u.id, u.username LIMIT 10', weight: 1 }
        ];
        
        const totalQueries = Math.floor(concurrentUsers * (durationSeconds / 2)); // 2 queries per second per user
        
        for (let i = 0; i < totalQueries; i++) {
            if (performance.now() >= endTime) break;
            
            // Select weighted random query
            const random = Math.random();
            let selectedQuery;
            let cumulativeWeight = 0;
            
            for (const wq of weightedQueries) {
                cumulativeWeight += wq.weight;
                if (random <= cumulativeWeight / weightedQueries.reduce((sum, q) => sum + q.weight, 0)) {
                    selectedQuery = wq.query;
                    break;
                }
            }
            
            if (selectedQuery) {
                promises.push(this.executeQuery(selectedQuery));
            }
            
            // Add small delay to spread queries
            await new Promise(resolve => setTimeout(resolve, 5));
        }
        
        const results = await Promise.all(promises);
        const totalTime = performance.now() - startTime;
        
        // Analyze results
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        const queryTimes = results.map(r => r.queryTime);
        
        const concurrentResult = {
            concurrentUsers,
            durationSeconds,
            totalQueries: results.length,
            successfulQueries: successful.length,
            failedQueries: failed.length,
            totalTime,
            avgQueryTime: queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length,
            maxQueryTime: Math.max(...queryTimes),
            minQueryTime: Math.min(...queryTimes),
            queriesPerSecond: results.length / (totalTime / 1000),
            errorRate: (failed.length / results.length) * 100,
            connectionPoolStats: await this.getConnectionPoolStats()
        };
        
        console.log(`\n📊 Concurrent Load Results:`);
        console.log(`   ✅ Successful: ${concurrentResult.successfulQueries}/${concurrentResult.totalQueries}`);
        console.log(`   ⚡ Avg Query Time: ${concurrentResult.avgQueryTime.toFixed(2)}ms`);
        console.log(`   🚀 Max Query Time: ${concurrentResult.maxQueryTime.toFixed(2)}ms`);
        console.log(`   📈 Queries/Second: ${concurrentResult.queriesPerSecond.toFixed(2)}`);
        console.log(`   ⚠️  Error Rate: ${concurrentResult.errorRate.toFixed(2)}%`);
        
        return concurrentResult;
    }

    // Get connection pool statistics
    async getConnectionPoolStats() {
        try {
            const stats = this.pool.pool.config.connectionLimit;
            const [rows] = await this.pool.execute('SHOW STATUS LIKE "Threads_connected"');
            const [processRows] = await this.pool.execute('SHOW STATUS LIKE "Threads_running"');
            
            return {
                configuredConnections: stats,
                activeConnections: parseInt(processRows[0]?.Value || 0),
                totalConnections: parseInt(rows[0]?.Value || 0),
                poolReady: this.pool.pool._allConnections.length,
                poolIdle: this.pool.pool._freeConnections.length,
                poolQueueing: this.pool.pool._connectionQueue.length
            };
        } catch (error) {
            return {
                error: error.message
            };
        }
    }

    // Generate database performance report
    generateReport(connectionResults, queryResults, concurrentResults) {
        const report = {
            timestamp: new Date().toISOString(),
            database: {
                host: this.config.host,
                port: this.config.port,
                database: this.config.database
            },
            connectionPoolTest: connectionResults,
            queryTests: queryResults,
            concurrentLoadTest: concurrentResults,
            performance: this.analyzePerformance(queryResults, concurrentResults),
            recommendations: this.generateDatabaseRecommendations(queryResults, concurrentResults)
        };
        
        return report;
    }

    // Analyze database performance
    analyzePerformance(queryResults, concurrentResults) {
        const allQueryTimes = Object.values(queryResults).map(q => q.avgQueryTime);
        const totalAvgTime = allQueryTimes.reduce((a, b) => a + b, 0) / allQueryTimes.length;
        
        return {
            averageQueryTime: totalAvgTime,
            worstQueryTime: Math.max(...allQueryTimes),
            bestQueryTime: Math.min(...allQueryTimes),
            concurrentPerformance: concurrentResults.queriesPerSecond,
            errorRate: concurrentResults.errorRate,
            throughput: concurrentResults.queriesPerSecond
        };
    }

    // Generate database-specific recommendations
    generateDatabaseRecommendations(queryResults, concurrentResults) {
        const recommendations = [];
        
        // Check for slow queries
        Object.entries(queryResults).forEach(([name, result]) => {
            if (result.avgQueryTime > 1000) {
                recommendations.push({
                    type: 'performance',
                    severity: 'high',
                    message: `Slow query detected: ${name} (${result.avgQueryTime.toFixed(2)}ms)`,
                    action: 'Optimize query or add appropriate indexes',
                    query: result.query
                });
            }
        });
        
        // Check concurrent performance
        if (concurrentResults.avgQueryTime > 500) {
            recommendations.push({
                type: 'scalability',
                severity: 'medium',
                message: 'High query times under concurrent load',
                action: 'Consider connection pooling optimization or database scaling'
            });
        }
        
        if (concurrentResults.errorRate > 1) {
            recommendations.push({
                type: 'reliability',
                severity: 'high',
                message: 'High error rate under concurrent load',
                action: 'Investigate connection issues and error handling'
            });
        }
        
        // Success case
        if (concurrentResults.avgQueryTime < 200 && concurrentResults.errorRate < 1) {
            recommendations.push({
                type: 'success',
                severity: 'info',
                message: 'Excellent database performance under load',
                action: 'Current configuration is optimal'
            });
        }
        
        return recommendations;
    }

    // Save results to file
    saveReport(connectionResults, queryResults, concurrentResults, filename = null) {
        const report = this.generateReport(connectionResults, queryResults, concurrentResults);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename_final = filename || `database-load-test-report-${timestamp}.json`;
        const filepath = path.join(__dirname, '../results', filename_final);
        
        // Ensure results directory exists
        const resultsDir = path.dirname(filepath);
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Database load test report saved to: ${filepath}`);
        
        return filepath;
    }

    // Print summary
    printSummary(report) {
        console.log('\n' + '='.repeat(60));
        console.log('🗄️  DATABASE LOAD TEST SUMMARY');
        console.log('='.repeat(60));
        console.log(`📊 Database: ${report.database.database} @ ${report.database.host}:${report.database.port}`);
        console.log(`⚡ Avg Query Time: ${report.performance.averageQueryTime.toFixed(2)}ms`);
        console.log(`🚀 Worst Query Time: ${report.performance.worstQueryTime.toFixed(2)}ms`);
        console.log(`📈 Concurrent Throughput: ${report.performance.concurrentPerformance.toFixed(2)} QPS`);
        console.log(`⚠️  Error Rate: ${report.performance.errorRate.toFixed(2)}%`);
        
        console.log('\n📈 Query Performance:');
        Object.entries(report.queryTests).forEach(([name, result]) => {
            const status = result.avgQueryTime < 100 ? '✅' : result.avgQueryTime < 500 ? '⚠️' : '❌';
            console.log(`   ${status} ${name}: ${result.avgQueryTime.toFixed(2)}ms (${result.successRate.toFixed(1)}% success)`);
        });
        
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach((rec, index) => {
            console.log(`   ${index + 1}. [${rec.severity.toUpperCase()}] ${rec.message}`);
            console.log(`      Action: ${rec.action}`);
        });
        
        console.log('='.repeat(60));
    }

    // Cleanup
    async cleanup() {
        if (this.pool) {
            await this.pool.end();
            console.log('🔌 Database connection pool closed');
        }
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const testType = args[0] || 'comprehensive';
    
    console.log('🗄️  INR100 Platform - Database Load Testing');
    console.log('=' .repeat(50));
    
    const tester = new DatabaseLoadTester();
    
    try {
        await tester.initialize();
        
        switch (testType) {
            case 'connection':
                await tester.testConnectionPool(20, 5);
                break;
                
            case 'queries':
                const queryResults = await tester.testINR100Queries();
                await tester.saveReport({}, queryResults, {});
                tester.printSummary({ queryTests: queryResults });
                break;
                
            case 'concurrent':
                const concurrentResults = await tester.testConcurrentLoad(30, 60);
                await tester.saveReport({}, {}, concurrentResults);
                break;
                
            case 'comprehensive':
                console.log('🎯 Running comprehensive database load test...');
                
                const connectionResults = await tester.testConnectionPool(25, 3);
                const queryTestResults = await tester.testINR100Queries();
                const concurrentTestResults = await tester.testConcurrentLoad(40, 90);
                
                const report = tester.generateReport(connectionResults, queryTestResults, concurrentTestResults);
                tester.saveReport(connectionResults, queryTestResults, concurrentTestResults);
                tester.printSummary(report);
                break;
                
            default:
                console.log('❌ Unknown test type. Use: connection, queries, concurrent, comprehensive');
                process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ Database load test failed:', error.message);
        process.exit(1);
    } finally {
        await tester.cleanup();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = DatabaseLoadTester;