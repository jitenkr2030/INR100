// Bundle Analysis and Optimization Script
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Bundle size thresholds (in KB)
const THRESHOLDS = {
  CRITICAL: 500,  // Critical size limit
  WARNING: 300,   // Warning size limit
  GOOD: 150,      // Good size limit
};

// Analyze bundle sizes
const analyzeBundleSizes = () => {
  const buildDir = path.join(__dirname, '..', '.next', 'static');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run `npm run build` first.');
    return;
  }
  
  console.log('📊 Analyzing bundle sizes...');
  
  const bundles = [];
  
  // Recursively find all JS and CSS files
  const findFiles = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findFiles(filePath);
      } else if (file.match(/\.(js|css)$/)) {
        const sizeKB = (stat.size / 1024).toFixed(2);
        const relativePath = path.relative(buildDir, filePath);
        
        bundles.push({
          file: relativePath,
          size: parseFloat(sizeKB),
          path: filePath
        });
      }
    });
  };
  
  findFiles(buildDir);
  
  // Sort by size (largest first)
  bundles.sort((a, b) => b.size - a.size);
  
  console.log('\n📈 Bundle Size Analysis:');
  console.log('='.repeat(80));
  
  let totalSize = 0;
  let criticalCount = 0;
  let warningCount = 0;
  
  bundles.forEach(bundle => {
    totalSize += bundle.size;
    
    let status = '✅';
    if (bundle.size > THRESHOLDS.CRITICAL) {
      status = '🔴 CRITICAL';
      criticalCount++;
    } else if (bundle.size > THRESHOLDS.WARNING) {
      status = '🟡 WARNING';
      warningCount++;
    }
    
    console.log(`${status} ${bundle.file.padEnd(50)} ${bundle.size.toFixed(2)}KB`);
  });
  
  console.log('='.repeat(80));
  console.log(`📊 Total Bundle Size: ${totalSize.toFixed(2)}KB`);
  console.log(`🔴 Critical (>${THRESHOLDS.CRITICAL}KB): ${criticalCount}`);
  console.log(`🟡 Warning (${THRESHOLDS.WARNING}-${THRESHOLDS.CRITICAL}KB): ${warningCount}`);
  console.log(`✅ Good (<${THRESHOLDS.WARNING}KB): ${bundles.length - criticalCount - warningCount}`);
  
  return { bundles, totalSize, criticalCount, warningCount };
};

// Optimization recommendations
const getOptimizationRecommendations = (bundles) => {
  const recommendations = [];
  
  // Check for large chunks
  const largeChunks = bundles.filter(b => b.size > THRESHOLDS.WARNING);
  
  if (largeChunks.length > 0) {
    recommendations.push({
      type: 'LARGE_CHUNKS',
      priority: 'HIGH',
      description: 'Optimize large bundle chunks',
      details: largeChunks.map(b => `${b.file} (${b.size.toFixed(2)}KB)`)
    });
  }
  
  // Check for duplicate dependencies
  const chunkNames = bundles.map(b => b.file);
  const potentialDuplicates = chunkNames.filter((name, index) => 
    chunkNames.indexOf(name) !== index
  );
  
  if (potentialDuplicates.length > 0) {
    recommendations.push({
      type: 'DUPLICATE_CHUNKS',
      priority: 'MEDIUM',
      description: 'Potential duplicate chunks detected',
      details: potentialDuplicates
    });
  }
  
  // Check for framework chunks
  const frameworkChunks = bundles.filter(b => 
    b.file.includes('react') || 
    b.file.includes('next') || 
    b.file.includes('node_modules')
  );
  
  if (frameworkChunks.length > 5) {
    recommendations.push({
      type: 'FRAMEWORK_CHUNKS',
      priority: 'LOW',
      description: 'Consider code splitting for framework chunks',
      details: frameworkChunks.slice(0, 5).map(b => b.file)
    });
  }
  
  return recommendations;
};

// Generate optimization suggestions
const generateOptimizationSuggestions = () => {
  const suggestions = {
    immediate: [],
    shortTerm: [],
    longTerm: []
  };
  
  // Immediate optimizations
  suggestions.immediate.push(
    '✅ Enable gzip compression in production',
    '✅ Use Next.js Image optimization for all images',
    '✅ Implement dynamic imports for heavy components',
    '✅ Remove unused dependencies from package.json'
  );
  
  // Short-term optimizations
  suggestions.shortTerm.push(
    '🔄 Implement bundle analyzer for detailed analysis',
    '🔄 Set up code splitting for route-based chunks',
    '🔄 Optimize vendor bundles with webpack splitting',
    '🔄 Use tree shaking to eliminate dead code'
  );
  
  // Long-term optimizations
  suggestions.longTerm.push(
    '📋 Consider micro-frontend architecture for scalability',
    '📋 Implement service worker caching strategies',
    '📋 Set up CDN for static asset delivery',
    '📋 Regular bundle size monitoring and alerts'
  );
  
  return suggestions;
};

// Performance optimization configuration
const generateOptimizationConfig = () => {
  const nextConfig = `// next.config.js - Optimized for performance
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react'],
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  poweredByHeader: false,
  
  // Bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Analyze bundle in development
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\\\/]node_modules[\\\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`;
  
  return nextConfig;
};

// Main optimization workflow
const runOptimizationWorkflow = () => {
  console.log('🚀 Starting Performance Optimization Analysis...\n');
  
  // 1. Analyze current bundle sizes
  const analysis = analyzeBundleSizes();
  
  // 2. Get optimization recommendations
  const recommendations = getOptimizationRecommendations(analysis.bundles);
  
  // 3. Generate optimization suggestions
  const suggestions = generateOptimizationSuggestions();
  
  console.log('\n💡 Optimization Recommendations:');
  console.log('='.repeat(80));
  
  if (recommendations.length === 0) {
    console.log('✅ No critical optimization issues found!');
  } else {
    recommendations.forEach(rec => {
      console.log(`\\n${rec.priority}: ${rec.description}`);
      rec.details.forEach(detail => {
        console.log(`  • ${detail}`);
      });
    });
  }
  
  console.log('\n🎯 Optimization Action Plan:');
  console.log('='.repeat(80));
  
  console.log('\\n📍 IMMEDIATE ACTIONS:');
  suggestions.immediate.forEach(item => {
    console.log(`  ${item}`);
  });
  
  console.log('\\n🔄 SHORT-TERM IMPROVEMENTS:');
  suggestions.shortTerm.forEach(item => {
    console.log(`  ${item}`);
  });
  
  console.log('\\n📋 LONG-TERM STRATEGY:');
  suggestions.longTerm.forEach(item => {
    console.log(`  ${item}`);
  });
  
  // 4. Generate optimized configuration
  const config = generateOptimizationConfig();
  const configPath = path.join(__dirname, '..', 'next.config.optimized.js');
  fs.writeFileSync(configPath, config);
  
  console.log(`\\n✅ Generated optimized Next.js config: ${configPath}`);
  
  // 5. Create optimization report
  const report = {
    timestamp: new Date().toISOString(),
    analysis,
    recommendations,
    suggestions,
    thresholds: THRESHOLDS
  };
  
  const reportPath = path.join(__dirname, '..', 'performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`✅ Generated performance report: ${reportPath}`);
  
  return report;
};

// Performance monitoring setup
const setupPerformanceMonitoring = () => {
  const monitoringScript = `
// Performance monitoring setup
// Add this to your _app.tsx or root component

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = process.env.NEXT_PUBLIC_VITALS_URL;

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = vitalsUrl || '/api/analytics';
  
  // Use sendBeacon if available, fallback to fetch
  if (navigator.sendBeacon && navigator.sendBeacon.toString().indexOf('[native code]') !== -1) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

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
  const response = await originalFetch.apply(this, args);
  const duration = Date.now() - start;
  
  // Log slow API calls (> 2s)
  if (duration > 2000) {
    console.warn(`Slow API call: ${args[0]} took ${duration}ms`);
  }
  
  return response;
};
`;
  
  const monitoringPath = path.join(__dirname, '..', 'src', 'lib', 'performance-monitoring.ts');
  fs.writeFileSync(monitoringPath, monitoringScript);
  
  console.log(`✅ Created performance monitoring: ${monitoringPath}`);
};

// Main execution
if (require.main === module) {
  runOptimizationWorkflow();
  setupPerformanceMonitoring();
  
  console.log('\\n🎉 Performance optimization analysis complete!');
  console.log('\\nNext steps:');
  console.log('1. Review the performance report: performance-report.json');
  console.log('2. Apply optimizations from the recommendations');
  console.log('3. Replace your next.config.js with next.config.optimized.js');
  console.log('4. Monitor performance metrics in production');
}

module.exports = {
  analyzeBundleSizes,
  getOptimizationRecommendations,
  generateOptimizationSuggestions,
  runOptimizationWorkflow,
  setupPerformanceMonitoring
};`;