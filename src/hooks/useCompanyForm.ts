'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyFormSchema, type CompanyFormValues } from '@/lib/schemas';
import { useLocalStorage } from '@/hooks';
import mockData from '@/data/mock-data.json';
import type { NAICSReference } from '@/types';

const naicsReference = mockData.naicsReference as NAICSReference[];

// Target only "Berkshire Hathaway" based on the requirement
const company = mockData.companies[0];

const buildDefaultValues = (): CompanyFormValues => ({
  name: company.name,
  legalName: company.legalName,
  description: company.description,
  websiteUrl: company.websiteUrl,
  companyStatus: company.companyStatus,
  entityType: company.entityType,
  vertical: company.vertical,
  subVertical: company.subVertical,
  annualRevenueUsd: company.annualRevenueUsd,
  fundingStage: company.fundingStage,
  ticker: company.ticker ?? '',
  stockExchange: company.stockExchange ?? '',
  parentCompanyId: company.parentCompanyId ?? null,
  directors: company.directors,
  locations: company.locations,
});

export const useCompanyForm = () => {
  const { read, write } = useLocalStorage<CompanyFormValues>();

  const saved = read();
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: saved
      ? { ...saved, parentCompanyId: saved.parentCompanyId ?? null }
      : buildDefaultValues(),
    mode: 'onBlur',
  });

  const {
    control,
    formState: { isDirty },
    reset,
    trigger,
    getValues,
  } = form;

  const directors = useFieldArray({ control, name: 'directors' });
  const locations = useFieldArray({ control, name: 'locations' });

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const verticalOptions = useMemo(
    () => naicsReference.map((n) => ({ value: n.vertical, label: n.vertical })),
    []
  );

  const selectedVertical = useWatch({ control, name: 'vertical' });

  const subVerticalOptions = useMemo(() => {
    if (!selectedVertical) return [];
    const found = naicsReference.find((n) => n.vertical === selectedVertical);
    return (found?.subVerticals ?? []).map((sv) => ({ value: sv, label: sv }));
  }, [selectedVertical]);

  const formValues = useWatch({ control });

  const isProfileComplete = !!(
    formValues.name &&
    formValues.legalName &&
    formValues.companyStatus &&
    formValues.entityType &&
    formValues.vertical &&
    formValues.subVertical &&
    formValues.fundingStage
  );

  const watchedDirectors = formValues.directors ?? [];
  const watchedLocations = formValues.locations ?? [];

  const isDirectorsComplete =
    watchedDirectors.length > 0 &&
    watchedDirectors.every((d) => d.name && d.email && d.phone);

  const isLocationsComplete =
    watchedLocations.length > 0 &&
    watchedLocations.every(
      (l) =>
        l.name &&
        l.addressLine1 &&
        l.city &&
        l.region &&
        l.postalCode &&
        l.countryCode
    );

  const fundingStage = useWatch({ control, name: 'fundingStage' });
  const isPublic = fundingStage === 'public';

  const addDirector = useCallback(() => {
    directors.append({
      id: `DIR-${company.id}-${Date.now()}`,
      name: '',
      email: '',
      phone: '',
    });
  }, [directors]);

  const addLocation = useCallback(() => {
    locations.append({
      id: `LOC-${company.id}-${Date.now()}`,
      name: '',
      addressLine1: '',
      city: '',
      region: '',
      postalCode: '',
      countryCode: '',
    });
  }, [locations]);

  const handleSave = useCallback(async () => {
    const isValid = await trigger();
    if (!isValid) return false;
    const current = getValues();
    if (current.fundingStage !== 'public') {
      current.ticker = '';
      current.stockExchange = '';
    }
    write(current);
    reset(current);
    return true;
  }, [trigger, getValues, write, reset]);

  return {
    form,
    companyId: company.id,
    directors,
    locations,
    verticalOptions,
    subVerticalOptions,
    isProfileComplete,
    isDirectorsComplete,
    isLocationsComplete,
    isPublic,
    isDirty,
    trigger,
    getValues,
    addDirector,
    addLocation,
    handleSave,
  };
};
