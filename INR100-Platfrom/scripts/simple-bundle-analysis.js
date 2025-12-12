// Bundle Analysis Script
const fs = require('fs');
const path = require('path');

// Simple bundle size analysis
const analyzeBundleSizes = () => {
  console.log('📊 Analyzing bundle sizes...');
  
  const buildDir = path.join(__dirname, '..', '.next', 'static');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run `npm run build` first.');
    return;
  }
  
  const bundles = [];
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
          size: parseFloat(sizeKB)
        });
      }
    });
  };
  
  findFiles(buildDir);
  bundles.sort((a, b) => b.size - a.size);
  
  console.log('\n📈 Bundle Analysis:');
  console.log('='.repeat(60));
  
  let totalSize = 0;
  bundles.forEach(bundle => {
    totalSize += bundle.size;
    const status = bundle.size > 300 ? '🔴' : bundle.size > 150 ? '🟡' : '✅';
    console.log(`${status} ${bundle.file.padEnd(40)} ${bundle.size.toFixed(2)}KB`);
  });
  
  console.log('='.repeat(60));
  console.log(`📊 Total Size: ${totalSize.toFixed(2)}KB`);
  
  return bundles;
};

// Generate optimization recommendations
const generateRecommendations = () => {
  const recommendations = [
    {
      title: 'Bundle Optimization',
      items: [
        '✅ Enable gzip compression',
        '✅ Use dynamic imports for heavy components',
        '✅ Optimize images with Next.js Image component',
        '✅ Implement code splitting'
      ]
    },
    {
      title: 'Performance Monitoring',
      items: [
        '🔄 Set up Core Web Vitals monitoring',
        '🔄 Implement API response time tracking',
        '🔄 Add bundle size monitoring',
        '🔄 Configure performance budgets'
      ]
    },
    {
      title: 'Caching Strategy',
      items: [
        '📋 Implement service worker caching',
        '📋 Set up CDN for static assets',
        '📋 Configure browser caching headers',
        '📋 Use Redis for API caching'
      ]
    }
  ];
  
  console.log('\n💡 Optimization Recommendations:');
  console.log('='.repeat(60));
  
  recommendations.forEach(rec => {
    console.log(`\n${rec.title}:`);
    rec.items.forEach(item => {
      console.log(`  ${item}`);
    });
  });
};

// Generate optimized Next.js config
const generateOptimizedConfig = () => {
  const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react'],
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  compress: true,
  poweredByHeader: false,
  
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
    ];
  },
};

module.exports = nextConfig;`;
  
  const configPath = path.join(__dirname, '..', 'next.config.optimized.js');
  fs.writeFileSync(configPath, config);
  console.log(`\n✅ Generated optimized config: next.config.optimized.js`);
};

// Main execution
const runAnalysis = () => {
  console.log('🚀 Performance Optimization Analysis\n');
  
  analyzeBundleSizes();
  generateRecommendations();
  generateOptimizedConfig();
  
  console.log('\n🎉 Analysis complete!');
  console.log('\nNext steps:');
  console.log('1. Replace next.config.js with next.config.optimized.js');
  console.log('2. Run npm run build to see improvements');
  console.log('3. Monitor bundle sizes in CI/CD');
};

runAnalysis();