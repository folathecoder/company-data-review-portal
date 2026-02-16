import type { SelectOption } from '@/types';

export const LOCALSTORAGE_KEY = 'company-review-data';

export const SECTION_IDS = {
  PROFILE: 'company-profile',
  DIRECTORS: 'directors',
  LOCATIONS: 'office-locations',
} as const;

export const SECTIONS = [
  { id: SECTION_IDS.PROFILE, label: 'Profile' },
  { id: SECTION_IDS.DIRECTORS, label: 'Directors' },
  { id: SECTION_IDS.LOCATIONS, label: 'Locations' },
] as const;

export const COMPANY_STATUSES: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'dissolved', label: 'Dissolved' },
];

export const ENTITY_TYPES: SelectOption[] = [
  { value: 'Corporation', label: 'Corporation' },
  { value: 'LLC', label: 'LLC' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Nonprofit', label: 'Nonprofit' },
];

export const FUNDING_STAGES: SelectOption[] = [
  { value: 'pre-seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'series-c', label: 'Series C' },
  { value: 'series-d', label: 'Series D' },
  { value: 'series-e', label: 'Series E' },
  { value: 'series-f-plus', label: 'Series F+' },
  { value: 'public', label: 'Public' },
];

export const STOCK_EXCHANGES: SelectOption[] = [
  { value: 'NYSE', label: 'NYSE' },
  { value: 'NASDAQ', label: 'NASDAQ' },
  { value: 'LSE', label: 'London Stock Exchange' },
  { value: 'TSE', label: 'Tokyo Stock Exchange' },
  { value: 'HKEX', label: 'Hong Kong Stock Exchange' },
];
