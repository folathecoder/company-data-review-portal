import countries from 'i18n-iso-countries';

export const isValidCountryCode = (code: string): boolean =>
  countries.isValid(code);
