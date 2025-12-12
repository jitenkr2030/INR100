// Asset optimization and generation script
// This script creates missing PWA icons and optimizes images

const fs = require('fs');
const path = require('path');

// PWA Icon specifications
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const faviconSizes = [16, 32, 48, 64];

// Generate placeholder SVG icons for each size
const generateIconSVG = (size, type = 'app') => {
  const bgColor = type === 'favicon' ? '#3B82F6' : '#10B981';
  const textColor = '#FFFFFF';
  const fontSize = size * 0.4;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="${bgColor}"/>
  <text x="${size/2}" y="${size/2 + fontSize/3}" font-family="Arial, sans-serif" 
        font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="${textColor}">
    ₹100
  </text>
</svg>`;
};

// Generate favicon
const generateFavicon = (size) => {
  const bgColor = '#3B82F6';
  const textColor = '#FFFFFF';
  const fontSize = size * 0.5;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${bgColor}"/>
  <text x="${size/2}" y="${size/2 + fontSize/3}" font-family="Arial, sans-serif" 
        font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="${textColor}">
    ₹
  </text>
</svg>`;
};

// Create icon directory structure
const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generate all icons
const generateIcons = () => {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Generate PWA app icons
  iconSizes.forEach(size => {
    const svgContent = generateIconSVG(size, 'app');
    const filename = `icon-${size}.svg`;
    fs.writeFileSync(path.join(publicDir, filename), svgContent);
    console.log(`Generated: ${filename}`);
  });
  
  // Generate favicons
  faviconSizes.forEach(size => {
    const svgContent = generateFavicon(size);
    const filename = `favicon-${size}.svg`;
    fs.writeFileSync(path.join(publicDir, filename), svgContent);
    console.log(`Generated: ${filename}`);
  });
  
  // Generate maskable icons
  const generateMaskableIcon = (size) => {
    const bgColor = '#10B981';
    const textColor = '#FFFFFF';
    const fontSize = size * 0.35;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${bgColor}"/>
  <circle cx="${size/2}" cy="${size/2 - size*0.1}" r="${size * 0.15}" fill="${textColor}"/>
  <text x="${size/2}" y="${size/2 + size*0.2}" font-family="Arial, sans-serif" 
        font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="${textColor}">
    ₹100
  </text>
</svg>`;
  };
  
  [192, 512].forEach(size => {
    const svgContent = generateMaskableIcon(size);
    const filename = `icon-${size}-maskable.svg`;
    fs.writeFileSync(path.join(publicDir, filename), svgContent);
    console.log(`Generated: ${filename}`);
  });
};

// Generate app screenshots placeholders
const generateScreenshots = () => {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  ensureDirectory(screenshotsDir);
  
  const generateScreenshotSVG = (width, height, title, type) => {
    const bgColor = type === 'mobile' ? '#F8FAFC' : '#FFFFFF';
    const accentColor = '#3B82F6';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  
  <!-- Header -->
  <rect width="${width}" height="${height * 0.1}" fill="${accentColor}"/>
  <text x="${width * 0.1}" y="${height * 0.06}" font-family="Arial, sans-serif" 
        font-size="${height * 0.04}" font-weight="bold" fill="white">
    INR100 Investment Platform
  </text>
  
  <!-- Content Area -->
  <rect x="${width * 0.05}" y="${height * 0.12}" width="${width * 0.9}" height="${height * 0.7}" 
        fill="white" stroke="#E5E7EB" stroke-width="2" rx="8"/>
  
  <!-- Sample Content -->
  <text x="${width * 0.1}" y="${height * 0.2}" font-family="Arial, sans-serif" 
        font-size="${height * 0.025}" fill="#374151">
    Portfolio Value: ₹1,25,000
  </text>
  <rect x="${width * 0.1}" y="${height * 0.25}" width="${width * 0.8}" height="${height * 0.15}" 
        fill="#F3F4F6" rx="4"/>
  <text x="${width * 0.1}" y="${height * 0.32}" font-family="Arial, sans-serif" 
        font-size="${height * 0.02}" fill="#6B7280">
    Top Holdings
  </text>
  
  <!-- Chart Placeholder -->
  <rect x="${width * 0.1}" y="${height * 0.45}" width="${width * 0.8}" height="${height * 0.25}" 
        fill="#EFF6FF" rx="4"/>
  
  <!-- Footer -->
  <rect y="${height * 0.85}" width="${width}" height="${height * 0.15}" fill="#F9FAFB"/>
  <text x="${width * 0.5}" y="${height * 0.92}" font-family="Arial, sans-serif" 
        font-size="${height * 0.025}" text-anchor="middle" fill="#6B7280">
    ${title}
  </text>
</svg>`;
  };
  
  // Desktop screenshot
  const desktopSVG = generateScreenshotSVG(1280, 720, 'Desktop Dashboard', 'desktop');
  fs.writeFileSync(path.join(screenshotsDir, 'desktop-home.png.svg'), desktopSVG);
  
  // Mobile screenshot  
  const mobileSVG = generateScreenshotSVG(390, 844, 'Mobile App', 'mobile');
  fs.writeFileSync(path.join(screenshotsDir, 'mobile-dashboard.png.svg'), mobileSVG);
  
  console.log('Generated screenshot placeholders');
};

// Generate shortcut icons
const generateShortcutIcons = () => {
  const shortcutsDir = path.join(__dirname, '..', 'public', 'shortcuts');
  ensureDirectory(shortcutsDir);
  
  const shortcuts = [
    { name: 'portfolio', icon: '📊', color: '#3B82F6' },
    { name: 'market', icon: '📈', color: '#10B981' },
    { name: 'wallet', icon: '💰', color: '#F59E0B' },
    { name: 'invest', icon: '🎯', color: '#EF4444' }
  ];
  
  shortcuts.forEach(shortcut => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="12" fill="${shortcut.color}"/>
  <text x="48" y="58" font-family="Arial, sans-serif" font-size="40" 
        text-anchor="middle" fill="white">
    ${shortcut.icon}
  </text>
</svg>`;
    
    fs.writeFileSync(path.join(shortcutsDir, `${shortcut.name}.png.svg`), svg);
    console.log(`Generated shortcut icon: ${shortcut.name}`);
  });
};

// Main execution
if (require.main === module) {
  console.log('🎨 Generating missing assets...');
  
  generateIcons();
  generateScreenshots();
  generateShortcutIcons();
  
  console.log('✅ All assets generated successfully!');
}

module.exports = {
  generateIcons,
  generateScreenshots,
  generateShortcutIcons
};