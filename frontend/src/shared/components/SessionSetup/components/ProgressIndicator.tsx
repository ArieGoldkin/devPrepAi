import React from 'react';

import { cn } from '@shared/utils/cn';

interface IProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: IProgressIndicatorProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
              idx <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-2 transition-colors",
                idx < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}