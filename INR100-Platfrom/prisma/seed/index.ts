import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 12);

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@inr100.com',
      phone: '+919876543210',
      password: hashedPassword,
      name: 'Demo User',
      panNumber: 'ABCDE1234F',
      aadhaarNumber: '123456789012',
      riskProfile: 'MODERATE',
      isVerified: true,
      kycStatus: 'APPROVED',
      level: 5,
      xp: 2500,
      streak: 7,
    },
  });

  // Create wallet for demo user
  await prisma.wallet.create({
    data: {
      userId: demoUser.id,
      balance: 10000,
      currency: 'INR',
    },
  });

  // Create additional demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        phone: '+919876543211',
        password: hashedPassword,
        name: 'John Doe',
        panNumber: 'FGHIJ5678K',
        aadhaarNumber: '123456789013',
        riskProfile: 'AGGRESSIVE',
        isVerified: true,
        kycStatus: 'APPROVED',
        level: 8,
        xp: 5000,
        streak: 15,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        phone: '+919876543212',
        password: hashedPassword,
        name: 'Jane Smith',
        panNumber: 'LMNOP9012Q',
        aadhaarNumber: '123456789014',
        riskProfile: 'CONSERVATIVE',
        isVerified: true,
        kycStatus: 'APPROVED',
        level: 3,
        xp: 1200,
        streak: 3,
      },
    }),
  ]);

  // Create wallets for additional users
  await Promise.all(
    users.map(user =>
      prisma.wallet.create({
        data: {
          userId: user.id,
          balance: 5000,
          currency: 'INR',
        },
      })
    )
  );

  // Create demo assets
  const assets = await Promise.all([
    // Stocks
    prisma.asset.create({
      data: {
        symbol: 'RELIANCE',
        name: 'Reliance Industries Ltd.',
        type: 'STOCK',
        category: 'EQUITY',
        currentPrice: 2500.50,
        previousPrice: 2480.25,
        change24h: 20.25,
        changePercent: 0.82,
        marketCap: 1680000000000,
        volume24h: 8500000,
      },
    }),
    prisma.asset.create({
      data: {
        symbol: 'TCS',
        name: 'Tata Consultancy Services Ltd.',
        type: 'STOCK',
        category: 'EQUITY',
        currentPrice: 3750.75,
        previousPrice: 3720.50,
        change24h: 30.25,
        changePercent: 0.81,
        marketCap: 1380000000000,
        volume24h: 3200000,
      },
    }),
    prisma.asset.create({
      data: {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Ltd.',
        type: 'STOCK',
        category: 'EQUITY',
        currentPrice: 1650.25,
        previousPrice: 1675.50,
        change24h: -25.25,
        changePercent: -1.51,
        marketCap: 920000000000,
        volume24h: 5800000,
      },
    }),
    // Mutual Funds
    prisma.asset.create({
      data: {
        symbol: 'AXISBLUECHIP',
        name: 'Axis Bluechip Fund',
        type: 'MUTUAL_FUND',
        category: 'EQUITY',
        currentPrice: 45.25,
        previousPrice: 44.80,
        change24h: 0.45,
        changePercent: 1.00,
        marketCap: 45000000000,
        volume24h: 250000,
      },
    }),
    prisma.asset.create({
      data: {
        symbol: 'MIRAEASSET',
        name: 'Mirae Asset Emerging Bluechip',
        type: 'MUTUAL_FUND',
        category: 'EQUITY',
        currentPrice: 125.50,
        previousPrice: 123.75,
        change24h: 1.75,
        changePercent: 1.41,
        marketCap: 28000000000,
        volume24h: 180000,
      },
    }),
    // Gold
    prisma.asset.create({
      data: {
        symbol: 'GOLD',
        name: 'Digital Gold',
        type: 'GOLD',
        category: 'COMMODITY',
        currentPrice: 5250.00,
        previousPrice: 5225.50,
        change24h: 24.50,
        changePercent: 0.47,
        marketCap: 10000000000000,
        volume24h: 50000,
      },
    }),
    // Global Assets
    prisma.asset.create({
      data: {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'GLOBAL',
        category: 'INTERNATIONAL',
        currentPrice: 175.25,
        previousPrice: 172.80,
        change24h: 2.45,
        changePercent: 1.42,
        marketCap: 2700000000000,
        volume24h: 50000000,
      },
    }),
    prisma.asset.create({
      data: {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        type: 'GLOBAL',
        category: 'INTERNATIONAL',
        currentPrice: 135.75,
        previousPrice: 138.25,
        change24h: -2.50,
        changePercent: -1.81,
        marketCap: 1700000000000,
        volume24h: 25000000,
      },
    }),
  ]);

  // Create demo portfolios
  const demoPortfolio = await prisma.portfolio.create({
    data: {
      userId: demoUser.id,
      name: 'My Investment Portfolio',
      description: 'Diversified portfolio across stocks, mutual funds, and gold',
      isPublic: false,
      totalValue: 25000,
      totalInvested: 22000,
      totalReturns: 3000,
      riskLevel: 3,
    },
  });

  // Create holdings for demo portfolio
  await Promise.all([
    prisma.holding.create({
      data: {
        portfolioId: demoPortfolio.id,
        assetId: assets[0].id, // RELIANCE
        quantity: 5,
        avgBuyPrice: 2400,
        currentPrice: 2500.50,
        totalValue: 12502.50,
        totalInvested: 12000,
        returns: 502.50,
        returnsPercent: 4.19,
      },
    }),
    prisma.holding.create({
      data: {
        portfolioId: demoPortfolio.id,
        assetId: assets[3].id, // AXISBLUECHIP
        quantity: 100,
        avgBuyPrice: 42.50,
        currentPrice: 45.25,
        totalValue: 4525,
        totalInvested: 4250,
        returns: 275,
        returnsPercent: 6.47,
      },
    }),
    prisma.holding.create({
      data: {
        portfolioId: demoPortfolio.id,
        assetId: assets[5].id, // GOLD
        quantity: 2,
        avgBuyPrice: 5100,
        currentPrice: 5250,
        totalValue: 10500,
        totalInvested: 10200,
        returns: 300,
        returnsPercent: 2.94,
      },
    }),
  ]);

  // Create sample transactions
  await Promise.all([
    prisma.transaction.create({
      data: {
        userId: demoUser.id,
        walletId: (await prisma.wallet.findFirst({ where: { userId: demoUser.id } }))!.id,
        type: 'DEPOSIT',
        amount: 10000,
        currency: 'INR',
        status: 'COMPLETED',
        description: 'Initial deposit',
      },
    }),
    prisma.transaction.create({
      data: {
        userId: demoUser.id,
        type: 'INVESTMENT',
        amount: 5000,
        currency: 'INR',
        status: 'COMPLETED',
        description: 'Investment in RELIANCE',
      },
    }),
    prisma.transaction.create({
      data: {
        userId: demoUser.id,
        type: 'INVESTMENT',
        amount: 4250,
        currency: 'INR',
        status: 'COMPLETED',
        description: 'Investment in Axis Bluechip Fund',
      },
    }),
  ]);

  // Create demo badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'First Investment',
        description: 'Complete your first investment',
        icon: '🎯',
        category: 'Investment',
        xpReward: 100,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Portfolio Diversifier',
        description: 'Invest in 3 different asset classes',
        icon: '📊',
        category: 'Investment',
        xpReward: 250,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'KYC Verified',
        description: 'Complete your KYC verification',
        icon: '✅',
        category: 'Verification',
        xpReward: 150,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Learning Streak',
        description: 'Complete 5 learning modules',
        icon: '📚',
        category: 'Learning',
        xpReward: 200,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Social Butterfly',
        description: 'Follow 5 expert investors',
        icon: '🦋',
        category: 'Social',
        xpReward: 100,
      },
    }),
  ]);

  // Create demo missions
  const missions = await Promise.all([
    prisma.mission.create({
      data: {
        title: 'Invest ₹1000',
        description: 'Make your first investment of at least ₹1000',
        type: 'INVESTMENT',
        targetValue: 1000,
        xpReward: 150,
        coinReward: 50,
        startDate: new Date(),
      },
    }),
    prisma.mission.create({
      data: {
        title: 'Complete KYC',
        description: 'Get your KYC verified to unlock all features',
        type: 'INVESTMENT',
        targetValue: 1,
        xpReward: 200,
        coinReward: 100,
        startDate: new Date(),
      },
    }),
    prisma.mission.create({
      data: {
        title: 'Learn the Basics',
        description: 'Complete 3 basic investment lessons',
        type: 'LEARNING',
        targetValue: 3,
        xpReward: 300,
        coinReward: 75,
        startDate: new Date(),
      },
    }),
    prisma.mission.create({
      data: {
        title: '7-Day Streak',
        description: 'Log in for 7 consecutive days',
        type: 'STREAK',
        targetValue: 7,
        xpReward: 500,
        coinReward: 150,
        startDate: new Date(),
      },
    }),
    prisma.mission.create({
      data: {
        title: 'Refer a Friend',
        description: 'Invite a friend to join INR100',
        type: 'REFERRAL',
        targetValue: 1,
        xpReward: 250,
        coinReward: 100,
        startDate: new Date(),
      },
    }),
  ]);

  // Create demo learning content
  const learnContent = await Promise.all([
    prisma.learnContent.create({
      data: {
        title: 'Introduction to Investing',
        content: 'Learn the basics of investing and how to get started with just ₹100.',
        type: 'ARTICLE',
        category: 'Basics',
        difficulty: 1,
        duration: 10,
        xpReward: 50,
      },
    }),
    prisma.learnContent.create({
      data: {
        title: 'Understanding Stocks',
        content: 'Deep dive into stock market investing and how to pick your first stocks.',
        type: 'ARTICLE',
        category: 'Stocks',
        difficulty: 2,
        duration: 15,
        xpReward: 75,
      },
    }),
    prisma.learnContent.create({
      data: {
        title: 'Mutual Funds 101',
        content: 'Learn about mutual funds, SIPs, and how they can help you grow wealth.',
        type: 'VIDEO',
        category: 'Mutual Funds',
        difficulty: 2,
        duration: 20,
        xpReward: 100,
      },
    }),
    prisma.learnContent.create({
      data: {
        title: 'Gold as an Investment',
        content: 'Understand why gold is considered a safe investment option.',
        type: 'ARTICLE',
        category: 'Commodities',
        difficulty: 1,
        duration: 8,
        xpReward: 50,
      },
    }),
    prisma.learnContent.create({
      data: {
        title: 'Risk Management',
        content: 'Learn how to manage investment risks and protect your portfolio.',
        type: 'COURSE',
        category: 'Strategy',
        difficulty: 3,
        duration: 30,
        xpReward: 150,
      },
    }),
    prisma.learnContent.create({
      data: {
        title: 'Investment Quiz',
        content: 'Test your knowledge with our investment basics quiz.',
        type: 'QUIZ',
        category: 'Assessment',
        difficulty: 1,
        duration: 5,
        xpReward: 25,
      },
    }),
  ]);

  // Create premium features
  const premiumFeatures = await Promise.all([
    prisma.premiumFeature.create({
      data: {
        name: 'AI Portfolio Advisor',
        description: 'Get personalized investment recommendations from our AI engine',
        type: 'AI_ADVISOR',
        price: 199,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Market Predictions',
        description: 'Access advanced market trend analysis and predictions',
        type: 'MARKET_PREDICTIONS',
        price: 99,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Risk Analysis Reports',
        description: 'Comprehensive risk assessment and mitigation strategies',
        type: 'RISK_ANALYSIS',
        price: 149,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Tax Optimization',
        description: 'AI-powered tax optimization strategies for your investments',
        type: 'TAX_OPTIMIZATION',
        price: 299,
        billingCycle: 'ANNUAL',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'API Access',
        description: 'Full API access for developers and institutional users',
        type: 'API_ACCESS',
        price: 1999,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Advanced Analytics',
        description: 'Deep dive analytics with custom reports and insights',
        type: 'ADVANCED_ANALYTICS',
        price: 299,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Priority Support',
        description: '24/7 priority customer support with dedicated account manager',
        type: 'PRIORITY_SUPPORT',
        price: 99,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
    prisma.premiumFeature.create({
      data: {
        name: 'Expert Sessions',
        description: '1-on-1 sessions with investment experts and advisors',
        type: 'EXPERT_SESSIONS',
        price: 999,
        billingCycle: 'MONTHLY',
        isActive: true,
      },
    }),
  ]);

  // Create partners for affiliate marketing
  const partners = await Promise.all([
    prisma.partner.create({
      data: {
        name: 'ICICI Securities',
        type: 'BROKER',
        description: 'Leading stock brokerage firm in India',
        commissionRate: 0.5,
        isActive: true,
        contactInfo: JSON.stringify({
          email: 'partnerships@icicisecurities.com',
          phone: '+91-22-2653-0777',
        }),
      },
    }),
    prisma.partner.create({
      data: {
        name: 'HDFC Mutual Fund',
        type: 'FUND_HOUSE',
        description: 'One of India\'s largest asset management companies',
        commissionRate: 1.0,
        isActive: true,
        contactInfo: JSON.stringify({
          email: 'partnerships@hdfcfund.com',
          phone: '+91-22-6652-6000',
        }),
      },
    }),
    prisma.partner.create({
      data: {
        name: 'Paytm Payments Bank',
        type: 'PAYMENT_GATEWAY',
        description: 'Digital payments and financial services platform',
        commissionRate: 0.75,
        isActive: true,
        contactInfo: JSON.stringify({
          email: 'business@paytm.com',
          phone: '+91-120-4456-789',
        }),
      },
    }),
    prisma.partner.create({
      data: {
        name: 'SBI Life Insurance',
        type: 'INSURANCE',
        description: 'Leading life insurance company in India',
        commissionRate: 15.0,
        isActive: true,
        contactInfo: JSON.stringify({
          email: 'corporate@sbilife.co.in',
          phone: '+91-22-6627-8787',
        }),
      },
    }),
    prisma.partner.create({
      data: {
        name: 'Upgrad',
        type: 'EDUCATIONAL',
        description: 'Online higher education and upskilling platform',
        commissionRate: 10.0,
        isActive: true,
        contactInfo: JSON.stringify({
          email: 'partnerships@upgrad.com',
          phone: '+91-80-4718-5858',
        }),
      },
    }),
  ]);

  // Create affiliate links
  const affiliateLinks = await Promise.all([
    prisma.affiliateLink.create({
      data: {
        partnerId: partners[0].id, // ICICI Securities
        code: 'INR100-ICICI',
        url: 'https://www.icicisecurities.com/open-account?ref=INR100',
        type: 'DEMAT_ACCOUNT',
        commission: 500,
        isActive: true,
      },
    }),
    prisma.affiliateLink.create({
      data: {
        partnerId: partners[1].id, // HDFC Mutual Fund
        code: 'INR100-HDFC',
        url: 'https://www.hdfcfund.com/invest?ref=INR100',
        type: 'DEMAT_ACCOUNT',
        commission: 300,
        isActive: true,
      },
    }),
    prisma.affiliateLink.create({
      data: {
        partnerId: partners[2].id, // Paytm
        code: 'INR100-PAYTM',
        url: 'https://paytm.com/bank?ref=INR100',
        type: 'DEMAT_ACCOUNT',
        commission: 200,
        isActive: true,
      },
    }),
    prisma.affiliateLink.create({
      data: {
        partnerId: partners[3].id, // SBI Life
        code: 'INR100-SBILIFE',
        url: 'https://www.sbilife.co.in/insurance?ref=INR100',
        type: 'INSURANCE',
        commission: 1000,
        isActive: true,
      },
    }),
    prisma.affiliateLink.create({
      data: {
        partnerId: partners[4].id, // Upgrad
        code: 'INR100-UPGRAD',
        url: 'https://www.upgrad.com/learn?ref=INR100',
        type: 'EDUCATIONAL_COURSE',
        commission: 2500,
        isActive: true,
      },
    }),
  ]);

  // Create premium content
  const premiumContent = await Promise.all([
    prisma.premiumContent.create({
      data: {
        title: 'Advanced Stock Market Strategies',
        description: 'Master advanced stock market techniques used by professional investors',
        type: 'COURSE',
        content: JSON.stringify({
          modules: 12,
          duration: '20 hours',
          level: 'Advanced',
          instructor: 'Dr. Rajesh Sharma',
          includes: ['Video lectures', 'Case studies', 'Live Q&A', 'Certificate'],
        }),
        price: 4999,
        instructor: 'Dr. Rajesh Sharma',
        duration: 1200,
        isActive: true,
      },
    }),
    prisma.premiumContent.create({
      data: {
        title: 'Cryptocurrency Investment Masterclass',
        description: 'Complete guide to investing in cryptocurrencies safely and profitably',
        type: 'COURSE',
        content: JSON.stringify({
          modules: 8,
          duration: '15 hours',
          level: 'Intermediate',
          instructor: 'Amit Patel',
          includes: ['Video lessons', 'Trading simulations', 'Resources', 'Community access'],
        }),
        price: 2999,
        instructor: 'Amit Patel',
        duration: 900,
        isActive: true,
      },
    }),
    prisma.premiumContent.create({
      data: {
        title: 'Market Analysis Webinar Series',
        description: 'Live weekly webinars analyzing current market trends and opportunities',
        type: 'WEBINAR',
        content: JSON.stringify({
          schedule: 'Every Saturday 4:00 PM',
          duration: '2 hours',
          features: ['Live market analysis', 'Q&A session', 'Recording access'],
        }),
        price: 199,
        instructor: 'Market Experts Team',
        duration: 120,
        isActive: true,
      },
    }),
    prisma.premiumContent.create({
      data: {
        title: 'Q3 2024 Market Research Report',
        description: 'Comprehensive analysis of market trends for Q3 2024 with investment recommendations',
        type: 'RESEARCH_REPORT',
        content: JSON.stringify({
          pages: 45,
          sections: ['Market Overview', 'Sector Analysis', 'Stock Recommendations', 'Risk Assessment'],
          format: 'PDF + Excel',
        }),
        price: 999,
        instructor: 'Research Team',
        duration: 0,
        isActive: true,
      },
    }),
    prisma.premiumContent.create({
      data: {
        title: 'Certified Financial Planner Course',
        description: 'Professional certification course for financial planning and advisory',
        type: 'CERTIFICATION',
        content: JSON.stringify({
          duration: '6 months',
          modules: 24,
          accreditation: 'NISM Certified',
          includes: ['Study materials', 'Mock tests', 'Mentorship', 'Exam fee'],
        }),
        price: 25000,
        instructor: 'CFP Institute',
        duration: 10800,
        isActive: true,
      },
    }),
  ]);

  // Create advertisements
  const advertisements = await Promise.all([
    prisma.advertisement.create({
      data: {
        title: 'Axis Bluechip Fund - Invest Now',
        description: 'High returns with expert fund management',
        imageUrl: '/ads/axis-bluechip.jpg',
        targetUrl: 'https://www.axismf.com/axis-bluechip-fund?ref=INR100',
        type: 'FUND_PROMOTION',
        position: 'DASHBOARD_SIDEBAR',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        budget: 100000,
        isActive: true,
      },
    }),
    prisma.advertisement.create({
      data: {
        title: 'Upgrad MBA Programs - Advance Your Career',
        description: 'Get an MBA from top universities with flexible learning',
        imageUrl: '/ads/upgrad-mba.jpg',
        targetUrl: 'https://www.upgrad.com/online-mba?ref=INR100',
        type: 'EDUCATIONAL_CONTENT',
        position: 'LEARNING_SECTION',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        budget: 200000,
        isActive: true,
      },
    }),
    prisma.advertisement.create({
      data: {
        title: 'Zerodha - Open Demat Account',
        description: 'India\'s largest stock broker - Zero brokerage',
        imageUrl: '/ads/zerodha.jpg',
        targetUrl: 'https://zerodha.com/open-account?ref=INR100',
        type: 'FUND_PROMOTION',
        position: 'HOME_BANNER',
        startDate: new Date(),
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
        budget: 150000,
        isActive: true,
      },
    }),
  ]);

  // Award some badges and progress to demo user
  await Promise.all([
    prisma.userBadge.create({
      data: {
        userId: demoUser.id,
        badgeId: badges[0].id, // First Investment
      },
    }),
    prisma.userBadge.create({
      data: {
        userId: demoUser.id,
        badgeId: badges[2].id, // KYC Verified
      },
    }),
  ]);

  // Create mission progress for demo user
  await Promise.all([
    prisma.userMission.create({
      data: {
        userId: demoUser.id,
        missionId: missions[0].id, // Invest ₹1000
        status: 'COMPLETED',
        progress: 1000,
        completedAt: new Date(),
      },
    }),
    prisma.userMission.create({
      data: {
        userId: demoUser.id,
        missionId: missions[1].id, // Complete KYC
        status: 'COMPLETED',
        progress: 1,
        completedAt: new Date(),
      },
    }),
    prisma.userMission.create({
      data: {
        userId: demoUser.id,
        missionId: missions[2].id, // Learn the Basics
        status: 'ACTIVE',
        progress: 1,
      },
    }),
  ]);

  // Create learning progress for demo user
  await Promise.all([
    prisma.learnProgress.create({
      data: {
        userId: demoUser.id,
        contentId: learnContent[0].id, // Introduction to Investing
        status: 'COMPLETED',
        progress: 100,
        completedAt: new Date(),
      },
    }),
    prisma.learnProgress.create({
      data: {
        userId: demoUser.id,
        contentId: learnContent[1].id, // Understanding Stocks
        status: 'IN_PROGRESS',
        progress: 60,
      },
    }),
  ]);

  console.log('✅ Demo data created successfully!');
  console.log('Demo credentials:');
  console.log('Email: demo@inr100.com');
  console.log('Password: demo123');
  console.log('Phone: +919876543210');
  console.log('OTP: 123456 (any 6-digit number works)');
  console.log('');
  console.log('Demo assets created:');
  console.log('- Stocks: RELIANCE, TCS, HDFCBANK');
  console.log('- Mutual Funds: AXISBLUECHIP, MIRAEASSET');
  console.log('- Gold: DIGITAL GOLD');
  console.log('- Global: AAPL, GOOGL');
  console.log('');
  console.log('Gamification features:');
  console.log('- 5 badges available');
  console.log('- 5 active missions');
  console.log('- 6 learning modules');
  console.log('- Demo user has 2 badges and 2500 XP');
  console.log('');
  console.log('🚀 Monetization Features Implemented:');
  console.log('');
  console.log('💳 Subscription Plans:');
  console.log('- Basic: Free (5 transactions/month, basic features)');
  console.log('- Premium: ₹99/month (unlimited transactions, AI insights)');
  console.log('- Professional: ₹299/month (everything + API access)');
  console.log('- Annual plans available with 25% savings');
  console.log('');
  console.log('💰 Transaction Fees:');
  console.log('- Stocks: 0.1% brokerage (min ₹10)');
  console.log('- Mutual Funds: 0% (direct plans)');
  console.log('- Gold: 0.5% transaction fee');
  console.log('- Global Assets: 0.15% + 0.5% currency conversion');
  console.log('- Spread fees: 0.1% - 0.3% based on asset type');
  console.log('- User discounts: Basic (0%), Premium (25%), Professional (50%)');
  console.log('');
  console.log('🤖 Premium Features:');
  console.log('- AI Portfolio Advisor: ₹199/month');
  console.log('- Market Predictions: ₹99/month');
  console.log('- Risk Analysis Reports: ₹149/month');
  console.log('- Tax Optimization: ₹299/year');
  console.log('- API Access: ₹1,999/month');
  console.log('- Advanced Analytics: ₹299/month');
  console.log('- Priority Support: ₹99/month');
  console.log('- Expert Sessions: ₹999/month');
  console.log('');
  console.log('🤝 Partnership Revenue:');
  console.log('- 5 partners created (ICICI Securities, HDFC Mutual Fund, Paytm, SBI Life, Upgrad)');
  console.log('- Commission rates: 0.5% - 15% based on partner type');
  console.log('- 5 affiliate links with tracking codes');
  console.log('');
  console.log('📚 Premium Content:');
  console.log('- Advanced Stock Market Strategies: ₹4,999');
  console.log('- Cryptocurrency Investment Masterclass: ₹2,999');
  console.log('- Market Analysis Webinar Series: ₹199');
  console.log('- Q3 2024 Market Research Report: ₹999');
  console.log('- Certified Financial Planner Course: ₹25,000');
  console.log('');
  console.log('📢 Advertising System:');
  console.log('- 3 active advertisements');
  console.log('- Multiple positions (home banner, dashboard sidebar, learning section)');
  console.log('- Budget tracking and performance metrics');
  console.log('');
  console.log('📊 Revenue Streams Active:');
  console.log('✅ Transaction-based fees (brokerage, spread, currency conversion)');
  console.log('✅ Subscription models (freemium tiers)');
  console.log('✅ Premium features (AI services, analytics, support)');
  console.log('✅ Partnership commissions (brokerage, funds, insurance, education)');
  console.log('✅ Premium content (courses, webinars, reports, certifications)');
  console.log('✅ Advertising platform (sponsored listings, promotions)');
  console.log('');
  console.log('🎯 Monetization Status: FULLY IMPLEMENTED');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });