'use client';

import { Check } from 'lucide-react';
import type { SectionStep } from '@/types';

interface ProgressBarProps {
  steps: SectionStep[];
  activeSection: string;
  onStepClick: (sectionId: string) => void;
}

export const ProgressBar = ({
  steps,
  activeSection,
  onStepClick,
}: ProgressBarProps) => (
  <div className="flex items-center justify-center gap-2 py-6">
    {steps.map((step, index) => {
      const isActive = step.id === activeSection;
      const isCompleted = step.completed;
      const isLast = index === steps.length - 1;

      return (
        <div key={step.id} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onStepClick(step.id)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity duration-150"
          >
            <div
              className={`step-indicator ${
                isCompleted
                  ? 'step-indicator-completed'
                  : isActive
                  ? 'step-indicator-active'
                  : ''
              }`}
            >
              {isCompleted ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span className="text-xs font-semibold">{index + 1}</span>
              )}
            </div>

            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'text-foreground'
                  : isCompleted
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/60'
              }`}
            >
              {step.label}
            </span>
          </button>

          {!isLast && (
            <div
              className={`step-connector ${
                isCompleted ? 'step-connector-completed' : ''
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);
