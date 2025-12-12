---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 30450220775e5d6b1699ae44a4a41cbf0b679a6052648bab83f1292c18637ddde5e68132022100c7fd2bb5bdbbae4921568cf4eb40f78b44da3e8eab1a9d2a8aa4546c7a8bc1a1
    ReservedCode2: 304602210093705e102e9145e7e7ec694580e80e3e365e9ec9a8ded4a73fde02bbd51beaba022100bc61317a603edb3b1872c41ca9e115bc65807e30b45796d42fde58ff5c1834c3
---

# Payment Gateway Integration - Razorpay

This document outlines the comprehensive Razorpay payment gateway integration implemented for the INR100 platform, including wallet system, UPI payments, and transaction verification.

## 🏗️ Architecture Overview

### Core Components

1. **Payment APIs**
   - `/api/payments/create-order` - Creates Razorpay payment orders
   - `/api/payments/verify` - Verifies payment signatures and status
   - `/api/payments/webhook` - Handles Razorpay webhook events
   - `/api/payments/upi` - UPI-specific payment handling and validation

2. **Wallet Management**
   - `/api/wallet` - Wallet balance, transactions, and operations
   - Real-time balance updates
   - Transaction history with pagination
   - Support for multiple transaction types

3. **Frontend Components**
   - Enhanced wallet page with real payment integration
   - Payment method selector with validation
   - UPI ID validation in real-time
   - Transaction status tracking

## 💳 Payment Methods Supported

### 1. UPI Payments
- **Features**: Instant processing, zero fees, 24/7 availability
- **Validation**: Real-time VPA validation using Razorpay API
- **Flow**: Intent-based UPI flow for seamless mobile experience
- **Security**: PCI DSS compliant, encrypted transactions

### 2. Net Banking
- **Features**: Direct bank transfer, all major banks supported
- **Security**: Bank-level security with encryption
- **Processing**: Real-time transfer confirmation

### 3. Card Payments (Debit/Credit)
- **Features**: All cards accepted, EMI options available
- **Fees**: 1.5% processing fee
- **Security**: 3D Secure authentication support

## 🔐 Security Implementation

### Webhook Verification
```typescript
// Signature verification for webhook authenticity
const expectedSignature = crypto
  .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
  .update(body)
  .digest('hex');

if (signature !== expectedSignature) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
}
```

### Payment Verification
```typescript
// Client-side payment verification
const expectedSignature = crypto
  .createHmac('sha256', RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest('hex');

if (razorpay_signature !== expectedSignature) {
  return NextResponse.json({ error: 'Invalid payment signature' });
}
```

### UPI Validation
- Real-time VPA format validation
- Bank name lookup using Razorpay API
- User-friendly error messages

## 💰 Wallet System

### Database Schema
```prisma
model Wallet {
  id        String   @id @default(cuid())
  userId    String   @unique
  balance   Float    @default(0)
  currency  String   @default("INR")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]
}

model Transaction {
  id          String             @id @default(cuid())
  userId      String
  walletId    String?
  type        TransactionType
  amount      Float
  currency    String             @default("INR")
  status      TransactionStatus  @default(PENDING)
  reference   String?
  description String?
  metadata    String? // JSON
  fee         Float              @default(0)
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  wallet Wallet? @relation(fields: [walletId], references: [id], onDelete: Cascade)
}
```

### Transaction Types
- `DEPOSIT` - Money added to wallet
- `WITHDRAWAL` - Money withdrawn from wallet
- `INVESTMENT` - Money invested in assets
- `DIVIDEND` - Dividend received
- `REWARD` - Bonus or reward payments
- `REFUND` - Refund transactions
- `FEE` - Platform fees

## 🔄 Payment Flow

### 1. Order Creation
```typescript
// Client initiates payment
const response = await fetch('/api/payments/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 1000,
    currency: 'INR',
    type: 'wallet_deposit',
    metadata: { userId: user.id }
  })
});
```

### 2. Razorpay Checkout
```typescript
// Initialize Razorpay checkout
const options = {
  key: orderData.key,
  amount: orderData.amount,
  currency: orderData.currency,
  name: 'INR100 Platform',
  order_id: orderData.order_id,
  handler: function (response) {
    verifyPayment(response);
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

### 3. Payment Verification
```typescript
// Verify payment on client
const verificationResponse = await fetch('/api/payments/verify', {
  method: 'POST',
  body: JSON.stringify({
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature
  })
});
```

### 4. Webhook Processing
```typescript
// Server-side webhook handling
switch (event.event) {
  case 'payment.captured':
    await handlePaymentCaptured(event.payload.payment.entity);
    break;
  case 'payment.failed':
    await handlePaymentFailed(event.payload.payment.entity);
    break;
}
```

## 📱 UPI Integration

### VPA Validation
```typescript
// Real-time VPA validation
const validateVPA = async (vpa: string) => {
  const response = await fetch(`/api/payments/upi?vpa=${vpa}`);
  const data = await response.json();
  return data.isValid;
};
```

### UPI Intent Flow
```typescript
// For mobile UPI apps
const upiOptions = {
  method: 'upi',
  vpa: vpa,
  flow: 'intent' // Triggers UPI app selection
};
```

## 🔍 Transaction Monitoring

### Real-time Updates
- WebSocket connections for live balance updates
- Automatic transaction status synchronization
- Push notifications for payment confirmations

### Transaction History
- Paginated transaction listing
- Filter by transaction type, status, and date range
- Export transaction statements

### Status Tracking
- `PENDING` - Payment initiated, awaiting confirmation
- `COMPLETED` - Payment successful, amount credited
- `FAILED` - Payment failed, no amount debited
- `CANCELLED` - Payment cancelled by user

## 🛡️ Error Handling

### Common Error Scenarios
1. **Invalid VPA**: User-friendly error message with examples
2. **Payment Timeout**: Automatic retry mechanism
3. **Network Issues**: Graceful fallback and retry logic
4. **Insufficient Balance**: Clear validation before withdrawal

### Error Response Format
```typescript
{
  success: false,
  error: 'Invalid VPA format',
  code: 'INVALID_VPA',
  details: {
    field: 'vpa',
    expected: 'username@bankcode'
  }
}
```

## 📊 Analytics & Reporting

### Payment Metrics
- Success/failure rates by payment method
- Average transaction values
- User payment patterns
- Revenue analytics

### Compliance Reporting
- SEBI compliance reports
- Transaction audit logs
- Regulatory reporting data

## 🚀 Deployment Configuration

### Environment Variables
```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Database
DATABASE_URL=your_database_url

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

### Webhook Setup
1. Configure webhook URL in Razorpay dashboard
2. Set webhook secret in environment variables
3. Test webhook events using Razorpay's test mode
4. Monitor webhook delivery status

### Security Checklist
- [ ] Webhook signature verification enabled
- [ ] Payment verification implemented
- [ ] HTTPS enforced for all payment endpoints
- [ ] Rate limiting on payment APIs
- [ ] Input validation and sanitization
- [ ] Database transaction integrity
- [ ] Error logging and monitoring

## 🔧 Testing

### Test Cards (Razorpay Test Mode)
```
# Successful Payment
Card Number: 4111111111111111
Expiry: Any future date
CVV: Any 3 digits

# Failed Payment
Card Number: 4000000000000002
Expiry: Any future date
CVV: Any 3 digits
```

### UPI Test VPA
```
# Valid UPI
success@razorpay

# Invalid UPI
failure@razorpay
```

### Webhook Testing
Use Razorpay's webhook testing tool to simulate payment events:
- `payment.captured`
- `payment.failed`
- `payment.authorized`

## 📈 Performance Optimization

### Caching Strategy
- Cache bank name lookups for valid VPAs
- Cache payment method configurations
- Redis for session management

### Database Optimization
- Indexed queries on transaction references
- Pagination for transaction history
- Batch processing for bulk operations

### Frontend Optimization
- Lazy loading of payment components
- Debounced VPA validation
- Optimistic UI updates

## 🔮 Future Enhancements

### Planned Features
1. **AutoPay Integration**: Recurring payment setup
2. **Multi-currency Support**: International payment methods
3. **Advanced Analytics**: ML-based fraud detection
4. **QR Code Payments**: Static and dynamic QR codes
5. **Bank Account Verification**: Account verification APIs

### Scalability Considerations
- Horizontal scaling of payment services
- Database sharding for high transaction volumes
- CDN for global payment page delivery
- Load balancing for webhook processing

## 📞 Support & Troubleshooting

### Common Issues
1. **Webhook not receiving**: Check webhook URL accessibility
2. **Payment stuck in pending**: Verify webhook processing
3. **UPI validation failing**: Check Razorpay API status
4. **Signature verification failed**: Verify webhook secret

### Monitoring
- Payment success rates
- Webhook delivery status
- API response times
- Error rates and patterns

### Support Channels
- Technical documentation: This guide
- API documentation: `/api/docs` endpoint
- Error logs: Application logs with correlation IDs
- Support email: support@INR100.com

---

**Last Updated**: December 12, 2025
**Version**: 1.0.0
**Author**: MiniMax Agent