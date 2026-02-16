'use client';

import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDown, Trash2, User } from 'lucide-react';
import { FormInput } from '@/components/form';
import { AnimatePresence, motion } from 'framer-motion';
import { PLACEHOLDERS } from '@/lib/placeholders';
import type { CompanyFormValues } from '@/lib/schemas';

interface DirectorCardProps {
  index: number;
  onRemove: () => void;
  canDelete: boolean;
}

export const DirectorCard = ({
  index,
  onRemove,
  canDelete,
}: DirectorCardProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CompanyFormValues>();

  const name = watch(`directors.${index}.name`);
  const email = watch(`directors.${index}.email`);
  const phone = watch(`directors.${index}.phone`);

  const hasContent = name || email || phone;
  const [isExpanded, setIsExpanded] = useState(!hasContent);

  const toggle = useCallback(() => setIsExpanded((prev) => !prev), []);

  const directorErrors = errors.directors?.[index];

  return (
    <div className="collapsible-card">
      <div className="collapsible-card-header">
        <button
          type="button"
          onClick={toggle}
          className="collapsible-card-toggle"
        >
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            {hasContent ? (
              <>
                <div className="text-sm font-medium text-foreground">
                  {name || 'Unnamed Director'}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 flex flex-wrap items-center gap-3 max-w-full overflow-hidden">
                  {email && <span className="break-all">{email}</span>}
                  {phone && <span className="break-all">{phone}</span>}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">New Director</div>
            )}
          </div>
        </button>

        <div className="flex items-center gap-2">
          {canDelete && (
            <button
              type="button"
              onClick={onRemove}
              className="btn-icon-danger"
              title="Delete director"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  id={`directors.${index}.name`}
                  required
                  placeholder={PLACEHOLDERS.director.name}
                  error={directorErrors?.name?.message}
                  {...register(`directors.${index}.name`)}
                />
                <FormInput
                  label="Email Address"
                  id={`directors.${index}.email`}
                  type="email"
                  required
                  placeholder={PLACEHOLDERS.director.email}
                  error={directorErrors?.email?.message}
                  {...register(`directors.${index}.email`)}
                />
              </div>
              <div className="mt-4">
                <FormInput
                  label="Phone Number"
                  id={`directors.${index}.phone`}
                  type="tel"
                  required
                  placeholder={PLACEHOLDERS.director.phone}
                  error={directorErrors?.phone?.message}
                  {...register(`directors.${index}.phone`)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
