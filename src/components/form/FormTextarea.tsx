'use client';

import { forwardRef } from 'react';
import { FormField } from '@/components/form/FormField';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => (
    <FormField
      label={label}
      htmlFor={id ?? ''}
      required={required}
      error={error}
      helperText={helperText}
    >
      <textarea
        ref={ref}
        id={id}
        className={`form-textarea ${error ? 'form-input-error' : ''} ${
          className ?? ''
        }`}
        rows={props.rows ?? 3}
        {...props}
      />
    </FormField>
  )
);

FormTextarea.displayName = 'FormTextarea';
