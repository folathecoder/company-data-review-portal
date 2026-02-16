'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { FormInput, FormSelect, FormTextarea } from '@/components/form';
import { SectionCard, SubSection } from '@/components/cards';
import { AnimatePresence, motion } from 'framer-motion';
import { formatRevenue } from '@/lib/formatting';
import {
  COMPANY_STATUSES,
  ENTITY_TYPES,
  FUNDING_STAGES,
  STOCK_EXCHANGES,
  SECTION_IDS,
} from '@/lib/constants';
import { PLACEHOLDERS } from '@/lib/placeholders';
import type { CompanyFormValues } from '@/lib/schemas';
import type { SelectOption } from '@/types';

interface CompanyProfileSectionProps {
  verticalOptions: SelectOption[];
  subVerticalOptions: SelectOption[];
  isPublic: boolean;
}

export const CompanyProfileSection = ({
  verticalOptions,
  subVerticalOptions,
  isPublic,
}: CompanyProfileSectionProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const vertical = useWatch<CompanyFormValues, 'vertical'>({
    name: 'vertical',
  });
  const annualRevenueUsd = useWatch<CompanyFormValues, 'annualRevenueUsd'>({
    name: 'annualRevenueUsd',
  });

  const handleVerticalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('vertical', e.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('subVertical', '', { shouldDirty: true });
  };

  const handleFundingStageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue('fundingStage', e.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div id={SECTION_IDS.PROFILE}>
      <SectionCard
        title="Company Profile"
        description="Core business information and classification"
      >
        <div className="space-y-10">
          <SubSection label="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Company Name"
                id="name"
                required
                placeholder={PLACEHOLDERS.company.name}
                error={errors.name?.message}
                {...register('name')}
              />
              <FormInput
                label="Legal Name"
                id="legalName"
                required
                placeholder={PLACEHOLDERS.company.legalName}
                error={errors.legalName?.message}
                {...register('legalName')}
              />
            </div>
            <div className="mt-5">
              <FormTextarea
                label="Description"
                id="description"
                placeholder={PLACEHOLDERS.company.description}
                rows={4}
                error={errors.description?.message}
                {...register('description')}
              />
            </div>
            <div className="mt-5">
              <FormInput
                label="Website URL"
                id="websiteUrl"
                placeholder={PLACEHOLDERS.company.websiteUrl}
                error={errors.websiteUrl?.message}
                {...register('websiteUrl')}
              />
            </div>
          </SubSection>

          <SubSection label="Company Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelect
                label="Company Status"
                id="companyStatus"
                required
                options={COMPANY_STATUSES}
                error={errors.companyStatus?.message}
                {...register('companyStatus')}
              />
              <FormSelect
                label="Entity Type"
                id="entityType"
                required
                options={ENTITY_TYPES}
                error={errors.entityType?.message}
                {...register('entityType')}
              />
            </div>
          </SubSection>

          <SubSection label="Industry Classification (NAICS)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelect
                label="Vertical"
                id="vertical"
                required
                options={verticalOptions}
                error={errors.vertical?.message}
                {...register('vertical')}
                onChange={handleVerticalChange}
              />
              <FormSelect
                label="Sub-Vertical"
                id="subVertical"
                required
                options={subVerticalOptions}
                disabled={!vertical}
                placeholder={
                  vertical
                    ? PLACEHOLDERS.select.subVertical
                    : PLACEHOLDERS.select.subVerticalDisabled
                }
                helperText={
                  vertical ? PLACEHOLDERS.helperText.subVertical : undefined
                }
                error={errors.subVertical?.message}
                {...register('subVertical')}
              />
            </div>
          </SubSection>

          <SubSection label="Financial Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormInput
                  label="Annual Revenue (USD)"
                  id="annualRevenueUsd"
                  type="number"
                  placeholder={PLACEHOLDERS.company.annualRevenueUsd}
                  error={errors.annualRevenueUsd?.message}
                  {...register('annualRevenueUsd', { valueAsNumber: true })}
                />
                {annualRevenueUsd > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 ml-0.5">
                    Formatted: {formatRevenue(annualRevenueUsd)}
                  </p>
                )}
              </div>
              <FormSelect
                label="Funding Stage"
                id="fundingStage"
                required
                options={FUNDING_STAGES}
                error={errors.fundingStage?.message}
                {...register('fundingStage')}
                onChange={handleFundingStageChange}
              />
            </div>

            <AnimatePresence>
              {isPublic && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-border/60">
                    <FormInput
                      label="Ticker Symbol"
                      id="ticker"
                      required
                      placeholder={PLACEHOLDERS.company.ticker}
                      error={errors.ticker?.message}
                      {...register('ticker')}
                    />
                    <FormSelect
                      label="Stock Exchange"
                      id="stockExchange"
                      required
                      options={STOCK_EXCHANGES}
                      error={errors.stockExchange?.message}
                      {...register('stockExchange')}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SubSection>
        </div>
      </SectionCard>
    </div>
  );
};
