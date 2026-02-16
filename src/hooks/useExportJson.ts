'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import type { UseFormTrigger, UseFormGetValues } from 'react-hook-form';
import type { CompanyFormValues } from '@/lib/schemas';

interface UseExportJsonParams {
  trigger: UseFormTrigger<CompanyFormValues>;
  getValues: UseFormGetValues<CompanyFormValues>;
  isDirty: boolean;
  companyId: string;
}

export const useExportJson = ({
  trigger,
  getValues,
  isDirty,
  companyId,
}: UseExportJsonParams) => {
  const exportJson = useCallback(async () => {
    if (isDirty) {
      toast.error('You have unsaved changes', {
        description: 'Please save your changes before exporting.',
      });
      return;
    }

    const isValid = await trigger();

    if (!isValid) {
      toast.error('Validation errors detected', {
        description: 'Please review the highlighted fields and try again.',
      });
      return;
    }

    const values = getValues();

    const exportData = {
      id: companyId,
      ...values,
      ticker: values.ticker || null,
      stockExchange: values.stockExchange || null,
      parentCompanyId: values.parentCompanyId,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const slug = values.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    a.download = `${slug}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Data exported successfully', {
      description: 'Company data has been exported as JSON.',
    });
  }, [isDirty, trigger, getValues, companyId]);

  return { exportJson };
};
