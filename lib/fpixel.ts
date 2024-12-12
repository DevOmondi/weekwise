export const FB_PIXEL_ID = "250461298943964";

// Utility function to prevent multiple fires
const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number | undefined) => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Base function to track events
const trackEvent = (eventName: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, options);
  }
};

// Individual event tracking functions
export const pageview = () => {
  trackEvent('PageView');
};

export const viewContent = debounce(() => {
  trackEvent('ViewContent', {
    content_name: 'Landing Page View',
    content_category: 'Test Button Click'
  });
}, 500);

export const initiateCheckout = debounce(() => {
  trackEvent('InitiateCheckout', {
    content_name: 'Start Journey Click',
    value: 49.00,
    currency: 'USD'
  });
}, 500);

export const completeRegistration = debounce((dateTime) => {
  trackEvent('CompleteRegistration', {
    status: "success",
    registration_id: dateTime,
  });
}, 500);

export const purchase = debounce(() => {
  trackEvent('Purchase', {
    value: 49.00,
    currency: 'USD'
  });
}, 500);