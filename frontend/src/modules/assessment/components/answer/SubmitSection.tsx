import type * as React from "react";

import { Button } from "@shared/ui/button";

interface ISubmitSectionProps {
  onSubmit: () => void;
  disabled: boolean;
  inputEmpty: boolean;
  submitButtonText: string;
}

export function SubmitSection({
  onSubmit,
  disabled,
  inputEmpty,
  submitButtonText,
}: ISubmitSectionProps): React.ReactElement {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to submit quickly
      </p>
      <Button
        onClick={onSubmit}
        disabled={disabled || inputEmpty}
        className="min-w-32"
      >
        {submitButtonText}
      </Button>
    </div>
  );
}
