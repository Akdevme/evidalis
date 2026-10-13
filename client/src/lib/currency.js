export const CURRENCY_CONFIG = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  INR: { code: 'INR', symbol: '₹', rate: 86.5, label: 'INR (₹)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
};

export const formatCurrencyAmount = (usdAmount, currCode = 'USD') => {
  const curr = CURRENCY_CONFIG[currCode] || CURRENCY_CONFIG.USD;
  const converted = Math.round((Number(usdAmount) || 0) * curr.rate);
  return `${curr.symbol}${converted.toLocaleString()}`;
};

export default {
  CURRENCY_CONFIG,
  formatCurrencyAmount,
};
