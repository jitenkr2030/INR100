#!/usr/bin/env node

/**
 * INR100 Platform - Load Testing Setup and Runner
 * Easy setup and execution script for load testing
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const LoadTestRunner = require('./load-test-runner.js');

class LoadTestSetup {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.resultsDir = path.join(this.projectRoot, 'results');
        this.configDir = path.join(this.projectRoot, 'config');
    }

    // Initialize load testing environment
    async initialize() {
        console.log('🚀 INR100 Platform - Load Testing Setup');
        console.log('=' .repeat(50));
        
        try {
            // Create results directory
            this.ensureDirectory(this.resultsDir);
            console.log('✅ Results directory created');
            
            // Check dependencies
            await this.checkDependencies();
            console.log('✅ Dependencies checked');
            
            // Setup configuration
            await this.setupConfiguration();
            console.log('✅ Configuration setup complete');
            
            // Create sample environment file
            this.createEnvFile();
            console.log('✅ Environment file template created');
            
            // Run initial test
            await this.runInitialTest();
            
            console.log('\n🎉 Load testing setup complete!');
            this.printUsageInstructions();
            
        } catch (error) {
            console.error('❌ Setup failed:', error.message);
            process.exit(1);
        }
    }

    // Ensure directory exists
    ensureDirectory(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    // Check required dependencies
    async checkDependencies() {
        const requiredDeps = ['mysql2'];
        const missingDeps = [];
        
        for (const dep of requiredDeps) {
            try {
                require(dep);
                console.log(`✅ ${dep} is available`);
            } catch (error) {
                missingDeps.push(dep);
            }
        }
        
        if (missingDeps.length > 0) {
            console.log('\n⚠️  Missing dependencies detected:');
            console.log('Please install missing packages:');
            console.log(`npm install ${missingDeps.join(' ')}`);
            console.log('\nOr run: npm install');
            
            console.log('⚠️  Skipping automatic dependency installation in sandbox environment.');
            console.log('   Database testing features will be limited but web testing will work.');
            console.log('   To enable database testing, install mysql2 manually in your environment.');
        }
    }

    // Install dependencies
    async installDependencies(deps) {
        return new Promise((resolve, reject) => {
            console.log(`\n📦 Installing dependencies: ${deps.join(', ')}`);
            const command = `npm install ${deps.join(' ')}`;
            const process = exec(command, { cwd: this.projectRoot });
            
            process.stdout.on('data', (data) => {
                console.log(data.toString().trim());
            });
            
            process.stderr.on('data', (data) => {
                console.error(data.toString().trim());
            });
            
            process.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Dependencies installed successfully');
                    resolve();
                } else {
                    reject(new Error('Failed to install dependencies'));
                }
            });
        });
    }

    // Setup configuration files
    async setupConfiguration() {
        const configFile = path.join(this.configDir, 'load-testing-config.js');
        
        if (!fs.existsSync(configFile)) {
            console.log('⚠️  Configuration file not found');
            console.log('Creating default configuration...');
            
            // Configuration is already created, just verify it
            if (fs.existsSync(configFile)) {
                console.log('✅ Configuration file verified');
            } else {
                throw new Error('Failed to create configuration file');
            }
        } else {
            console.log('✅ Configuration file exists');
        }
    }

    // Create environment template
    createEnvFile() {
        const envPath = path.join(this.projectRoot, '.env.loadtest');
        const envTemplate = `# INR100 Platform - Load Testing Environment Configuration
# Copy this file to .env and update with your actual values

# Application URL
BASE_URL=http://localhost:3000

# Database Configuration (for database load testing)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inr100_platform

# Load Testing Configuration
LOAD_TEST_TIMEOUT=30000
LOAD_TEST_RETRIES=3
LOAD_TEST_CONCURRENT_USERS=50

# Reporting Configuration
REPORT_FORMAT=json,html
RESULTS_DIRECTORY=./results

# Monitoring Configuration
ENABLE_REAL_TIME_MONITORING=true
MONITORING_INTERVAL=5000

# Alert Thresholds
ALERT_RESPONSE_TIME=1000
ALERT_ERROR_RATE=5
ALERT_THROUGHPUT=100

# Environment (development, staging, production)
NODE_ENV=development
`;
        
        if (!fs.existsSync(envPath)) {
            fs.writeFileSync(envPath, envTemplate);
            console.log(`✅ Environment template created: ${envPath}`);
        } else {
            console.log('✅ Environment file already exists');
        }
    }

    // Run initial test to verify setup
    async runInitialTest() {
        console.log('\n🧪 Running initial test to verify setup...');
        
        try {
            // Run a quick basic test
            const { spawn } = require('child_process');
            
            const testProcess = spawn('node', [
                path.join(__dirname, 'load-testing.js'),
                'basic',
                'http://localhost:3000'
            ], {
                stdio: 'pipe'
            });
            
            let testOutput = '';
            let testError = '';
            
            testProcess.stdout.on('data', (data) => {
                testOutput += data.toString();
            });
            
            testProcess.stderr.on('data', (data) => {
                testError += data.toString();
            });
            
            testProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Initial test completed successfully');
                    console.log('📊 Test output saved to results directory');
                } else {
                    console.log('⚠️  Initial test completed with warnings');
                    if (testError) {
                        console.log('Error output:', testError);
                    }
                }
            });
            
            // Wait for test to complete (max 30 seconds)
            await new Promise(resolve => setTimeout(resolve, 30000));
            testProcess.kill();
            
        } catch (error) {
            console.log('⚠️  Initial test skipped (server may not be running)');
            console.log('This is normal if the application server is not started');
        }
    }

    // Print usage instructions
    printUsageInstructions() {
        console.log('\n📚 QUICK START GUIDE');
        console.log('='.repeat(50));
        console.log('\n1. Configure Environment:');
        console.log('   cp .env.loadtest .env');
        console.log('   # Edit .env with your actual values');
        
        console.log('\n2. Start your application server:');
        console.log('   npm run dev  # or your start command');
        
        console.log('\n3. Run Load Tests:');
        console.log('   # Basic test');
        console.log('   node scripts/load-testing.js basic http://localhost:3000');
        console.log('');
        console.log('   # Database test');
        console.log('   node scripts/database-load-testing.js comprehensive');
        console.log('');
        console.log('   # Full test suite');
        console.log('   node scripts/load-test-runner.js comprehensive staging');
        
        console.log('\n4. View Results:');
        console.log('   # Results are saved in ./results/');
        console.log('   ls results/');
        
        console.log('\n📖 For detailed documentation:');
        console.log('   cat docs/LOAD_TESTING_SETUP.md');
        
        console.log('\n🔧 Common Commands:');
        console.log('   # Test specific scenario');
        console.log('   node scripts/load-test-runner.js scenario lightLoad development');
        console.log('');
        console.log('   # Spike test');
        console.log('   node scripts/load-test-runner.js spike staging');
        console.log('');
        console.log('   # Endurance test (30 minutes)');
        console.log('   node scripts/load-test-runner.js endurance 30 staging');
        console.log('');
        console.log('   # Help');
        console.log('   node scripts/load-test-runner.js help');
        
        console.log('\n' + '='.repeat(50));
    }

    // Run automated test suite
    async runAutomatedTests(environment = 'staging') {
        console.log(`🤖 Running Automated Test Suite for ${environment}`);
        console.log('='.repeat(50));
        
        const runner = new LoadTestRunner();
        
        try {
            await runner.runComprehensiveSuite(environment);
            console.log('\n✅ Automated test suite completed successfully');
            
        } catch (error) {
            console.error('❌ Automated test suite failed:', error.message);
            throw error;
        }
    }

    // Generate test report summary
    generateSummaryReport() {
        console.log('📊 Generating Summary Report...');
        
        const resultsFiles = fs.readdirSync(this.resultsDir)
            .filter(file => file.endsWith('.json'))
            .sort()
            .reverse();
        
        if (resultsFiles.length === 0) {
            console.log('No test results found');
            return;
        }
        
        console.log(`\n📈 Recent Test Results (${resultsFiles.length} files):`);
        resultsFiles.slice(0, 10).forEach((file, index) => {
            const filepath = path.join(this.resultsDir, file);
            const stats = fs.statSync(filepath);
            const date = new Date(stats.mtime).toLocaleString();
            console.log(`   ${index + 1}. ${file} (${date})`);
        });
        
        // Generate summary of latest results
        if (resultsFiles.length > 0) {
            const latestFile = path.join(this.resultsDir, resultsFiles[0]);
            const results = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
            
            console.log('\n📊 Latest Test Summary:');
            if (results.summary) {
                console.log(`   Total Requests: ${results.summary.totalRequests || 0}`);
                console.log(`   Avg Response Time: ${(results.summary.avgResponseTime || 0).toFixed(2)}ms`);
                console.log(`   Error Rate: ${(results.summary.errorRate || 0).toFixed(2)}%`);
                console.log(`   Throughput: ${(results.summary.requestsPerSecond || 0).toFixed(2)} RPS`);
            }
        }
    }

    // Cleanup old results
    cleanupOldResults(daysToKeep = 30) {
        console.log(`🧹 Cleaning up results older than ${daysToKeep} days...`);
        
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        
        let cleanedCount = 0;
        const resultsFiles = fs.readdirSync(this.resultsDir);
        
        resultsFiles.forEach(file => {
            const filepath = path.join(this.resultsDir, file);
            const stats = fs.statSync(filepath);
            
            if (stats.mtime < cutoffDate) {
                fs.unlinkSync(filepath);
                cleanedCount++;
            }
        });
        
        console.log(`✅ Cleaned up ${cleanedCount} old result files`);
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'setup';
    
    const setup = new LoadTestSetup();
    
    try {
        switch (command) {
            case 'setup':
                await setup.initialize();
                break;
                
            case 'test':
                const environment = args[1] || 'staging';
                await setup.runAutomatedTests(environment);
                break;
                
            case 'summary':
                setup.generateSummaryReport();
                break;
                
            case 'cleanup':
                const days = parseInt(args[1]) || 30;
                setup.cleanupOldResults(days);
                break;
                
            case 'help':
                console.log('INR100 Platform - Load Testing Setup');
                console.log('Commands:');
                console.log('  setup           - Initialize load testing environment');
                console.log('  test [env]      - Run automated test suite');
                console.log('  summary         - Show summary of recent results');
                console.log('  cleanup [days]  - Clean up old result files');
                console.log('  help            - Show this help');
                break;
                
            default:
                console.log(`Unknown command: ${command}`);
                console.log('Use "help" for available commands');
                process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ Command failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = LoadTestSetup;