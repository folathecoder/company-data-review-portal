'use client';

import { forwardRef } from 'react';
import { FormField } from '@/components/form/FormField';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => (
    <FormField
      label={label}
      htmlFor={id ?? ''}
      required={required}
      error={error}
      helperText={helperText}
    >
      <input
        ref={ref}
        id={id}
        className={`form-input ${error ? 'form-input-error' : ''} ${
          className ?? ''
        }`}
        {...props}
      />
    </FormField>
  )
);

FormInput.displayName = 'FormInput';
