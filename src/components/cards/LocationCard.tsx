'use client';

import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDown, Trash2, MapPin } from 'lucide-react';
import { FormInput } from '@/components/form';
import { AnimatePresence, motion } from 'framer-motion';
import { formatAddress } from '@/lib/formatting';
import { PLACEHOLDERS } from '@/lib/placeholders';
import type { CompanyFormValues } from '@/lib/schemas';

interface LocationCardProps {
  index: number;
  onRemove: () => void;
  canDelete: boolean;
}

export const LocationCard = ({
  index,
  onRemove,
  canDelete,
}: LocationCardProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const name = watch(`locations.${index}.name`);
  const addressLine1 = watch(`locations.${index}.addressLine1`);
  const city = watch(`locations.${index}.city`);
  const region = watch(`locations.${index}.region`);
  const countryCode = watch(`locations.${index}.countryCode`);

  const hasContent = name || city || addressLine1;
  const [isExpanded, setIsExpanded] = useState(!hasContent);

  const toggle = useCallback(() => setIsExpanded((prev) => !prev), []);

  const locationErrors = errors.locations?.[index];
  const summary = formatAddress([city, region, countryCode]);

  return (
    <div className="collapsible-card">
      <div className="collapsible-card-header">
        <button
          type="button"
          onClick={toggle}
          className="collapsible-card-toggle"
        >
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            {hasContent ? (
              <>
                <div className="text-sm font-medium text-foreground">
                  {name || 'Unnamed Location'}
                </div>
                {summary && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {summary}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-muted-foreground">New Location</div>
            )}
          </div>
        </button>

        <div className="flex items-center gap-2">
          {canDelete && (
            <button
              type="button"
              onClick={onRemove}
              className="btn-icon-danger"
              title="Delete location"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button type="button" onClick={toggle} className="p-1.5">
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="collapsible-card-body">
              <div className="space-y-4">
                <FormInput
                  label="Location Name"
                  id={`locations.${index}.name`}
                  required
                  placeholder={PLACEHOLDERS.location.name}
                  error={locationErrors?.name?.message}
                  {...register(`locations.${index}.name`)}
                />
                <FormInput
                  label="Address Line 1"
                  id={`locations.${index}.addressLine1`}
                  required
                  placeholder={PLACEHOLDERS.location.addressLine1}
                  error={locationErrors?.addressLine1?.message}
                  {...register(`locations.${index}.addressLine1`)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="City"
                    id={`locations.${index}.city`}
                    required
                    placeholder={PLACEHOLDERS.location.city}
                    error={locationErrors?.city?.message}
                    {...register(`locations.${index}.city`)}
                  />
                  <FormInput
                    label="State/Region"
                    id={`locations.${index}.region`}
                    required
                    placeholder={PLACEHOLDERS.location.region}
                    error={locationErrors?.region?.message}
                    {...register(`locations.${index}.region`)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Postal Code"
                    id={`locations.${index}.postalCode`}
                    required
                    placeholder={PLACEHOLDERS.location.postalCode}
                    error={locationErrors?.postalCode?.message}
                    {...register(`locations.${index}.postalCode`)}
                  />
                  <FormInput
                    label="Country Code"
                    id={`locations.${index}.countryCode`}
                    required
                    placeholder={PLACEHOLDERS.location.countryCode}
                    maxLength={2}
                    helperText={PLACEHOLDERS.helperText.countryCode}
                    error={locationErrors?.countryCode?.message}
                    {...register(`locations.${index}.countryCode`, {
                      setValueAs: (v: string) => v.toUpperCase(),
                    })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
