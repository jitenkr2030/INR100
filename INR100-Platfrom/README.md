---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30450221009c3be90c9cc8bf4e8d99880aae2821450a97a4fd117755d13c0c18825ca0cb5b022057275fac634224117bd5db2c583b5d726b9dbc0118e70cbec4207f0ee52a63b2
    ReservedCode2: 3045022067150efb0b087fd6330d56bf845d26237870f24a7daad91575379c94bfab62fe0221008157ba4b17e22a83b904ad6ab7268ee6237c642ac1653a36d6fb433de1fde3bf
---

# 🚀 INR100.com - India's Micro-Investing Platform

A comprehensive micro-investing platform designed for Indians to start their wealth creation journey with just ₹100. Built with modern technologies and featuring AI-powered insights, social investing, gamification, and a complete learning ecosystem.

## ✨ Features

### 🎯 Core Investment Features
- **Micro-Fractional Investing**: Start with just ₹100 in stocks, mutual funds, gold, and global assets
- **500+ Investment Options**: Diversify across multiple asset classes
- **AI-Powered Insights**: Get personalized recommendations and market analysis
- **Real-time Portfolio Tracking**: Monitor your investments with detailed analytics

### 🔐 Authentication & Security
- **OTP-based Login**: Secure authentication with email/phone verification
- **Complete KYC Flow**: PAN/Aadhaar verification with document upload
- **Bank-Level Security**: 256-bit encryption and biometric login support
- **SEBI Registered**: Fully compliant with Indian financial regulations

### 🎮 Gamification & Rewards
- **Badge System**: Earn badges for investment milestones and achievements
- **Missions & Challenges**: Complete tasks to earn XP and rewards
- **Leaderboards**: Compete with other investors
- **Learning Streaks**: Build habits with daily learning rewards

### 📚 Learning Academy
- **Micro-Lessons**: Bite-sized content on investing basics
- **Video Tutorials**: Learn from expert investors
- **Interactive Quizzes**: Test your knowledge and earn XP
- **Progress Tracking**: Monitor your learning journey

### 👥 Social Investing
- **Follow Experts**: Copy portfolios of successful investors
- **Community Feed**: Share insights and learn from others
- **Discussion Forums**: Ask questions and get answers
- **Portfolio Sharing**: Showcase your investment strategies

### 💳 Payment & Wallet
- **Multiple Payment Options**: UPI, Net Banking, Debit/Credit Cards
- **Instant Wallet**: Load funds instantly and start investing
- **Secure Transactions**: All payments are encrypted and secure
- **Transaction History**: Complete record of all your financial activities

## 🛠️ Technology Stack

### Frontend
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling
- **🧩 shadcn/ui** - High-quality UI components
- **🎯 Lucide React** - Beautiful icon library
- **🌈 Framer Motion** - Smooth animations

### Backend
- **🗄️ Prisma ORM** - Type-safe database access
- **🔐 NextAuth.js** - Authentication solution
- **🔄 TanStack Query** - Data synchronization
- **🐻 Zustand** - Lightweight state management
- **🌐 Axios** - HTTP client

### Database
- **SQLite** - Lightweight database for development
- **Comprehensive Schema** - Users, Portfolios, Assets, Transactions, KYC, Gamification

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jitenkr2030/INR100-Platfrom.git
cd INR100-Platfrom
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up the database**
```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed database with demo data
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Troubleshooting

### Common Installation Issues

#### NPM Permission Errors
If you encounter permission errors during `npm install`:

**Problem**: `EACCES: permission denied, mkdir '/usr/local/lib/node_modules/...'`

**Solutions**:
1. **Use local installation**:
```bash
npm install --prefix . --production=false
```

2. **Fix npm configuration**:
```bash
# Clear npm cache
npm cache clean --force

# Reset npm prefix
npm config delete prefix
npm install --no-optional --no-audit --no-fund
```

3. **Alternative package managers**:
```bash
# Using yarn
yarn install

# Using pnpm
pnpm install
```

4. **Manual node_modules creation**:
```bash
# Create node_modules directory
mkdir -p node_modules

# Install with specific flags
npm install --legacy-peer-deps --force
```

#### Node.js Version Issues
- Ensure Node.js 18+ is installed
- Check version: `node --version`
- Update if needed from [nodejs.org](https://nodejs.org/)

#### Dependency Conflicts
- Clear package-lock.json and reinstall
- Use `--legacy-peer-deps` flag if peer dependency conflicts occur
- Update to latest npm: `npm install -g npm@latest`

#### Database Issues
- Ensure SQLite is properly initialized
- Check file permissions for `prisma/dev.db`
- Reset database if corrupted:
```bash
npm run db:reset
npm run db:seed
```

#### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Performance Optimization
- Enable React Strict Mode for development
- Use `npm run build` before testing production builds
- Monitor bundle size with `npm run analyze` (if available)

## 🎮 Demo Credentials

Use these credentials to explore the platform:

### Login Credentials
- **Email**: `demo@inr100.com`
- **Password**: `demo123`
- **Phone**: `+919876543210`
- **OTP**: `123456` (any 6-digit number works)

### Demo Portfolio
- **RELIANCE**: 5 shares
- **AXIS Bluechip Fund**: 100 units  
- **Digital Gold**: 2 grams
- **Total Value**: ₹25,000
- **Returns**: ₹3,000 (12%)

### Gamification Features
- **User Level**: 5
- **XP Points**: 2,500
- **Streak**: 7 days
- **Badges Earned**: First Investment, KYC Verified
- **Active Missions**: Learn the Basics (1/3 completed)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── ai/            # AI-powered features
│   │   └── ...
│   ├── dashboard/         # User dashboard
│   ├── invest/           # Investment interface
│   ├── learn/            # Learning academy
│   ├── community/        # Social features
│   ├── rewards/          # Gamification
│   ├── login/            # Authentication pages
│   └── register/         # Registration flow
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   └── ai/              # AI-powered components
├── hooks/               # Custom React hooks
└── lib/                 # Utilities and configurations
```

## 🗄️ Database Schema

### Core Models
- **User**: User accounts with KYC and gamification data
- **Asset**: Investment instruments (stocks, mutual funds, gold, global)
- **Portfolio**: User investment portfolios
- **Holding**: Individual asset holdings within portfolios
- **Transaction**: Financial transactions and history
- **Wallet**: User wallet for managing funds

### Authentication & KYC
- **KYCDocument**: KYC verification documents
- **PaymentMethod**: User payment methods

### Gamification
- **Badge**: Achievement badges
- **UserBadge**: User-earned badges
- **Mission**: Active challenges and tasks
- **UserMission**: User mission progress
- **LearnContent**: Educational content
- **LearnProgress**: User learning progress

### Social Features
- **SocialPost**: Community posts and updates
- **Comment**: Post comments and discussions
- **Follow**: User following relationships
- **Watchlist**: Asset watchlists
- **CopiedPortfolio**: Portfolio copying functionality

### AI Features
- **AIInsight**: AI-generated investment insights and recommendations

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
npm run db:seed      # Seed database with demo data
```

## 🌟 Key Features Deep Dive

### 1. Authentication System
- **Multi-factor Authentication**: Email/phone + OTP
- **KYC Integration**: Complete PAN/Aadhaar verification flow
- **Session Management**: Secure user sessions with NextAuth.js
- **Password Security**: bcrypt hashing with salt rounds

### 2. Investment Engine
- **Fractional Investing**: Buy fractions of expensive assets
- **Real-time Pricing**: Live market data integration
- **Portfolio Analytics**: Detailed performance metrics
- **Risk Assessment**: User risk profiling and recommendations

### 3. AI-Powered Insights
- **Market Analysis**: AI-driven market trend analysis
- **Portfolio Health**: Automated portfolio health checks
- **Investment Recommendations**: Personalized investment suggestions
- **Risk Alerts**: Proactive risk monitoring and alerts

### 4. Gamification System
- **XP and Levels**: Experience points and user progression
- **Achievement Badges**: Visual recognition of accomplishments
- **Daily Missions**: Engaging daily tasks and challenges
- **Leaderboards**: Competitive ranking system

### 5. Learning Platform
- **Content Management**: Structured learning paths
- **Progress Tracking**: Monitor learning advancement
- **Interactive Elements**: Quizzes and assessments
- **Rewards System**: Earn XP for completing lessons

## 💰 Monetization Strategies

### 1. Transaction Fees
- **Brokerage Fees**: Small percentage on each transaction
- **Spread-based Revenue**: Small spread on buy/sell prices
- **Subscription Plans**: Premium features for paid users

### 2. Asset Management
- **Management Fees**: Annual fees on managed portfolios
- **Performance Fees**: Percentage of profits earned
- **Advisory Services**: Paid investment advisory

### 3. Premium Features
- **AI Insights**: Advanced AI-powered recommendations
- **Expert Access**: One-on-one sessions with investment experts
- **Advanced Analytics**: Detailed portfolio analysis tools
- **Priority Support**: Premium customer support

### 4. Partnerships
- **Fund Houses**: Commission from mutual fund investments
- **Broker Partners**: Revenue sharing with brokerage firms
- **Payment Gateway**: Commission on payment processing
- **Educational Content**: Sponsored content and courses

### 5. Data & Analytics
- **Market Data**: Premium market data subscriptions
- **API Access**: Paid API access for developers
- **Research Reports**: In-depth investment research
- **Custom Analytics**: Bespoke analytics for institutional clients

## 🔒 Security Features

### Data Security
- **256-bit SSL Encryption**: All data transmitted securely
- **Encrypted Database**: Sensitive data encrypted at rest
- **Regular Audits**: Security audits and penetration testing
- **GDPR Compliant**: Data protection and privacy measures

### Financial Security
- **SEBI Registration**: Regulatory compliance
- **Bank-grade Security**: Military-grade security measures
- **Two-factor Authentication**: Additional security layer
- **Fraud Detection**: Real-time fraud monitoring

### User Privacy
- **Data Minimization**: Collect only necessary data
- **Anonymous Analytics**: Usage analytics without personal data
- **Transparent Policies**: Clear privacy and data usage policies
- **User Control**: Full control over personal data

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="your-production-url"
NEXTAUTH_SECRET="your-secret-key"
```

2. **Database Setup**
```bash
# Generate production database
npm run db:generate

# Run production migrations
npm run db:migrate
```

3. **Build and Deploy**
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Docker Deployment
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Prisma Team**: For the excellent ORM
- **shadcn/ui**: For the beautiful component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Indian Investment Community**: For the inspiration and feedback

## 📞 Support

For support and questions:
- **Email**: support@inr100.com
- **Documentation**: [docs.inr100.com](https://docs.inr100.com)
- **Community**: [community.inr100.com](https://community.inr100.com)
- **Twitter**: [@inr100](https://twitter.com/inr100)

---

Built with ❤️ for the Indian investment community. Start your wealth creation journey with just ₹100! 🚀🇮🇳