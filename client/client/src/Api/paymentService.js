
class PaymentService {
  constructor() {
   // this.razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
       this.razorpayKeyId = "rzp_test_RbXzeUxPCKxvL5";

    if (!this.razorpayKeyId) {
      console.error('⚠️ VITE_RAZORPAY_KEY_ID is not configured in environment variables');
    }
  }

  loadRazorpayScript(timeout = 10000) {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      const timer = setTimeout(() => resolve(false), timeout);

      script.onload = () => {
        clearTimeout(timer);
        resolve(!!window.Razorpay);
      };
      script.onerror = () => {
        clearTimeout(timer);
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  async initiatePayment(options) {
    if (!this.razorpayKeyId) {
      throw new Error('Razorpay key is not configured. Please check environment variables.');
    }

    const isScriptLoaded = await this.loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    if (!options.orderId) {
      throw new Error('Order ID is required for payment');
    }

    if (typeof options.amount !== 'number' || options.amount <= 0) {
      throw new Error('Valid numeric amount is required for payment');
    }

    const paymentOptions = {
      key: this.razorpayKeyId,
      amount: options.amount * 100, // Convert to paise
      currency: 'INR',
      name: 'SpaceWala',
      description: options.description || 'Package Payment',
      order_id: options.orderId,
      handler: options.onSuccess,
      prefill: {
        name: options.prefill?.name || '',
        email: options.prefill?.email || '',
        contact: options.prefill?.contact || ''
      },
      theme: {
        color: '#4F46E5'
      },
      modal: {
        ondismiss: options.onCancel || (() => console.log('Payment cancelled by user'))
      }
    };

    try {
      const razorpay = new window.Razorpay(paymentOptions);
      razorpay.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      throw new Error('Failed to open payment gateway');
    }
  }
}

export default new PaymentService();
