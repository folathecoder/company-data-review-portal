export const formatRevenue = (
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string => {
  if (isNaN(value) || value < 0) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatAddress = (parts: (string | undefined)[]): string =>
  parts.filter(Boolean).join(', ');
