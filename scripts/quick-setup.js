#!/usr/bin/env node

/**
 * INR100 Platform - Quick Load Testing Setup
 * Simple setup for load testing without interactive prompts
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 INR100 Platform - Load Testing Quick Setup');
console.log('=' .repeat(50));

// Create results directory
const resultsDir = path.join(__dirname, '../results');
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log('✅ Results directory created');
} else {
    console.log('✅ Results directory exists');
}

// Create configuration template
const configDir = path.join(__dirname, '../config');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log('✅ Config directory created');
} else {
    console.log('✅ Config directory exists');
}

// Create environment template
const envPath = path.join(__dirname, '../.env.loadtest');
const envTemplate = `# INR100 Platform - Load Testing Environment Configuration

# Application URL
BASE_URL=http://localhost:3000

# Database Configuration (optional - for database load testing)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inr100_platform

# Load Testing Configuration
LOAD_TEST_TIMEOUT=30000
LOAD_TEST_RETRIES=3
LOAD_TEST_CONCURRENT_USERS=50

# Environment (development, staging, production)
NODE_ENV=development
`;

if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Environment template created');
} else {
    console.log('✅ Environment file already exists');
}

console.log('\n📚 SETUP COMPLETE!');
console.log('='.repeat(50));
console.log('\nQuick Start:');
console.log('1. Configure environment:');
console.log('   cp .env.loadtest .env');
console.log('   # Edit .env with your values');
console.log('\n2. Start your application:');
console.log('   npm run dev');
console.log('\n3. Run basic load test:');
console.log('   node scripts/load-testing.js basic http://localhost:3000');
console.log('\n4. Run comprehensive tests:');
console.log('   node scripts/load-test-runner.js scenario lightLoad development');
console.log('\n5. View results:');
console.log('   ls results/');
console.log('\n📖 Full documentation: docs/LOAD_TESTING_SETUP.md');
console.log('\n🎉 Load testing is ready to use!');