export const PLACEHOLDERS = {
  company: {
    name: 'Acme Corporation',
    legalName: 'Acme Corporation Inc.',
    description: 'Brief description of the company and its operations...',
    websiteUrl: 'https://example.com',
    annualRevenueUsd: '1000000',
    ticker: 'ACME',
  },
  director: {
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
  },
  location: {
    name: 'Headquarters',
    addressLine1: '123 Main Street',
    city: 'San Francisco',
    region: 'CA',
    postalCode: '94102',
    countryCode: 'US',
  },
  select: {
    default: 'Select...',
    subVertical: 'Select sub-vertical...',
    subVerticalDisabled: 'Select vertical first',
  },
  helperText: {
    subVertical: 'Dependent on vertical selection',
    countryCode: '2-letter ISO code (e.g., US, GB, CA)',
  },
} as const;
