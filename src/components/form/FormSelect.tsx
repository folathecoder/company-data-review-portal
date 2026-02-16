'use client';

import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormField } from '@/components/form/FormField';
import type { SelectOption } from '@/types';

interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      required,
      id,
      placeholder = 'Select...',
      className,
      ...props
    },
    ref
  ) => (
    <FormField
      label={label}
      htmlFor={id ?? ''}
      required={required}
      error={error}
      helperText={helperText}
    >
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={`form-input appearance-none pr-10 ${
            error ? 'form-input-error' : ''
          } ${className ?? ''}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </FormField>
  )
);

FormSelect.displayName = 'FormSelect';
