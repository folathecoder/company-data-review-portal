'use client';

import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { Header, ProgressBar } from '@/components/layout';
import {
  CompanyProfileSection,
  DirectorsSection,
  LocationsSection,
} from '@/components/sections';
import { useCompanyForm, useActiveSection, useExportJson } from '@/hooks';
import { SECTIONS } from '@/lib/constants';

const CompanyReviewPage = () => {
  const {
    form,
    companyId,
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
    handleSave,
    addDirector,
    addLocation,
  } = useCompanyForm();

  const { activeSection, scrollToSection } = useActiveSection();

  const { exportJson } = useExportJson({
    trigger,
    getValues,
    isDirty,
    companyId,
  });

  const progressSteps = useMemo(
    () => [
      {
        id: SECTIONS[0].id,
        label: SECTIONS[0].label,
        completed: isProfileComplete,
      },
      {
        id: SECTIONS[1].id,
        label: SECTIONS[1].label,
        completed: isDirectorsComplete,
      },
      {
        id: SECTIONS[2].id,
        label: SECTIONS[2].label,
        completed: isLocationsComplete,
      },
    ],
    [isProfileComplete, isDirectorsComplete, isLocationsComplete]
  );

  const onSave = async () => {
    const saved = await handleSave();
    if (saved) {
      toast.success('Changes saved', {
        description: 'Your changes have been saved to local storage.',
      });
    } else {
      toast.error('Validation errors detected', {
        description: 'Please fix the highlighted fields before saving.',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background">
        <Header isDirty={isDirty} onSave={onSave} onExport={exportJson} />

        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-200">
            <div className="sticky top-16 z-40 mb-8 bg-card/30 rounded-xl border border-border/40 px-6 backdrop-blur-md hidden min-[454px]:block">
              <ProgressBar
                steps={progressSteps}
                activeSection={activeSection}
                onStepClick={scrollToSection}
              />
            </div>

            <div className="space-y-12">
              <CompanyProfileSection
                verticalOptions={verticalOptions}
                subVerticalOptions={subVerticalOptions}
                isPublic={isPublic}
              />
              <DirectorsSection fieldArray={directors} onAdd={addDirector} />
              <LocationsSection fieldArray={locations} onAdd={addLocation} />
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default CompanyReviewPage;
