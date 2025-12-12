import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector';

// Mock the UPI Validator component
jest.mock('@/components/payments/UPIValidator', () => ({
  UPIValidator: ({ vpa, onVPAChange, onValidationChange }: any) => (
    <div data-testid="upi-validator">
      <input
        data-testid="upi-input"
        value={vpa}
        onChange={(e) => onVPAChange(e.target.value)}
      />
    </div>
  ),
}));

describe('PaymentMethodSelector', () => {
  const defaultProps = {
    selectedMethod: '',
    onMethodChange: jest.fn(),
    amount: '',
    onAmountChange: jest.fn(),
    vpa: '',
    onVPAChange: jest.fn(),
    onValidationChange: jest.fn(),
    onPayment: jest.fn(),
    isProcessing: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all payment methods', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    expect(screen.getByText('UPI')).toBeInTheDocument();
    expect(screen.getByText('Net Banking')).toBeInTheDocument();
    expect(screen.getByText('Debit/Credit Card')).toBeInTheDocument();
  });

  it('shows payment method descriptions', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    expect(screen.getByText('Pay using any UPI app')).toBeInTheDocument();
    expect(screen.getByText('Direct bank transfer')).toBeInTheDocument();
    expect(screen.getByText('Pay using cards')).toBeInTheDocument();
  });

  it('displays fee information correctly', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    // UPI should be free
    expect(screen.getAllByText('Free')).toHaveLength(1);
    
    // Card should have fee
    const cardMethod = screen.getByText('Debit/Credit Card').closest('[data-testid*="payment-method"]');
    expect(cardMethod).toContainElement(screen.getByText('1.5% fee'));
  });

  it('calculates total amount correctly', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'card',
      amount: '1000',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    // Base amount: ₹1000
    // Fee: 1.5% = ₹15
    // Total: ₹1015
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    expect(screen.getByText(/₹1015\.00/)).toBeInTheDocument();
  });

  it('shows UPI validator when UPI is selected', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    expect(screen.getByTestId('upi-validator')).toBeInTheDocument();
  });

  it('does not show UPI validator when other methods are selected', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'netbanking',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    expect(screen.queryByTestId('upi-validator')).not.toBeInTheDocument();
  });

  it('validates form correctly', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
      amount: '100',
      vpa: 'user@paytm',
      onValidationChange: jest.fn().mockReturnValue(true),
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const payButton = screen.getByText('Pay ₹100.00');
    expect(payButton).not.toBeDisabled();
  });

  it('disables pay button when form is invalid', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
      amount: '', // Empty amount
      vpa: 'user@paytm',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const payButton = screen.getByText('Pay ₹0.00');
    expect(payButton).toBeDisabled();
  });

  it('disables pay button when amount is below minimum', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
      amount: '50', // Below minimum for UPI
      vpa: 'user@paytm',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const payButton = screen.getByText('Pay ₹50.00');
    expect(payButton).toBeDisabled();
  });

  it('disables pay button when processing', () => {
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
      amount: '1000',
      vpa: 'user@paytm',
      isProcessing: true,
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const payButton = screen.getByText('Pay ₹1000.00');
    expect(payButton).toBeDisabled();
  });

  it('calls onPayment when pay button is clicked', async () => {
    const user = userEvent.setup();
    const props = {
      ...defaultProps,
      selectedMethod: 'upi',
      amount: '1000',
      vpa: 'user@paytm',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const payButton = screen.getByText('Pay ₹1000.00');
    await user.click(payButton);
    
    expect(props.onPayment).toHaveBeenCalledTimes(1);
  });

  it('shows security notice', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    expect(screen.getByText(/Secured by 256-bit encryption/)).toBeInTheDocument();
  });

  it('displays amount input with correct props', () => {
    const props = {
      ...defaultProps,
      amount: '2500',
      onAmountChange: jest.fn(),
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const amountInput = screen.getByLabelText('Amount (₹)');
    expect(amountInput).toHaveValue('2500');
  });

  it('shows payment method selection', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    expect(screen.getByLabelText('Payment Method')).toBeInTheDocument();
  });

  it('handles amount changes', () => {
    const props = {
      ...defaultProps,
      onAmountChange: jest.fn(),
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const amountInput = screen.getByLabelText('Amount (₹)');
    fireEvent.change(amountInput, { target: { value: '5000' } });
    
    expect(props.onAmountChange).toHaveBeenCalledWith('5000');
  });

  it('handles payment method changes', () => {
    const props = {
      ...defaultProps,
      onMethodChange: jest.fn(),
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    const upiOption = screen.getByText('UPI').closest('[role="button"]');
    if (upiOption) {
      fireEvent.click(upiOption);
      expect(props.onMethodChange).toHaveBeenCalledWith('upi');
    }
  });

  it('shows minimum and maximum limits', () => {
    render(<PaymentMethodSelector {...defaultProps} />);
    
    expect(screen.getByText('Min: ₹100')).toBeInTheDocument();
    expect(screen.getByText('Max: ₹100,000')).toBeInTheDocument();
  });

  it('displays loading state when processing', () => {
    const props = {
      ...defaultProps,
      isProcessing: true,
      selectedMethod: 'upi',
      amount: '1000',
      vpa: 'user@paytm',
    };
    
    render(<PaymentMethodSelector {...props} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});