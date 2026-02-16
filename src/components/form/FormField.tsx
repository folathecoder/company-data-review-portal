'use client';

import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="form-label">
      {label}
      {required && <span className="form-required-dot" />}
    </label>

    {children}

    {helperText && !error && <p className="form-helper">{helperText}</p>}
    {error && (
      <p className="form-error">
        <AlertTriangle className="h-3 w-3" /> {error}
      </p>
    )}
  </div>
);
