import { z } from 'zod';
import { isValidCountryCode } from '@/lib/country-codes';

export const directorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email format').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone is required'),
});

export const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Location name is required'),
  addressLine1: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  countryCode: z
    .string()
    .min(1, 'Country code is required')
    .length(2, 'Must be a 2-letter ISO code')
    .refine(isValidCountryCode, 'Invalid ISO 3166-1 alpha-2 code'),
});

export const companyFormSchema = z
  .object({
    name: z.string().min(1, 'Company name is required'),
    legalName: z.string().min(1, 'Legal name is required'),
    description: z.string(),
    websiteUrl: z
      .string()
      .refine(
        (val) => !val || /^https?:\/\/.+\..+/.test(val),
        'Invalid URL format'
      ),
    companyStatus: z.string().min(1, 'Status is required'),
    entityType: z.string().min(1, 'Entity type is required'),
    vertical: z.string().min(1, 'Vertical is required'),
    subVertical: z.string().min(1, 'Sub-vertical is required'),
    annualRevenueUsd: z.number().min(0, 'Revenue cannot be negative'),
    fundingStage: z.string().min(1, 'Funding stage is required'),
    ticker: z.string(),
    stockExchange: z.string(),
    parentCompanyId: z.string().nullable(),
    directors: z
      .array(directorSchema)
      .min(1, 'At least one director is required'),
    locations: z
      .array(locationSchema)
      .min(1, 'At least one location is required'),
  })
  .superRefine((data, ctx) => {
    if (data.fundingStage === 'public') {
      if (!data.ticker.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Ticker is required for public companies',
          path: ['ticker'],
        });
      }
      if (!data.stockExchange.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Stock exchange is required for public companies',
          path: ['stockExchange'],
        });
      }
    }
  });

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
