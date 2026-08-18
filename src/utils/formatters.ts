/**
 * Format numbers as Kenyan Shillings (KSh)
 * Safe against undefined, null, NaN, and string inputs
 */
export const formatKES = (amount?: number | null | string): string => {
  if (amount === undefined || amount === null || amount === '') {
    return 'KSh 0';
  }
  const numericAmount = typeof amount === 'number' ? amount : Number(amount);
  if (isNaN(numericAmount)) {
    return 'KSh 0';
  }
  return 'KSh ' + numericAmount.toLocaleString('en-KE');
};

/**
 * Format compact numbers (e.g., 2.4k)
 */
export const formatCompactNumber = (num?: number | null): string => {
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

/**
 * Phone number formatter for Kenya (+254 7XX XXX XXX)
 */
export const formatKenyanPhone = (phone?: string | null): string => {
  if (!phone) return '+254';
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('254') && clean.length === 12) {
    return `+254 ${clean.slice(3, 5)} ${clean.slice(5, 8)} ${clean.slice(8)}`;
  }
  if (clean.startsWith('0') && clean.length === 10) {
    return `+254 ${clean.slice(1, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  return phone;
};
