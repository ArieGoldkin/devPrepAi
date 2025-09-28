"use client";

import React from "react";

interface IAutoSaveStatusProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastAutoSaved: Date | null;
}

export function AutoSaveStatus({
  isSaving,
  hasUnsavedChanges,
  lastAutoSaved,
}: IAutoSaveStatusProps): React.JSX.Element {
  if (isSaving) {
    return (
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full" />
        Saving...
      </span>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <span className="text-xs text-orange-600 dark:text-orange-400">
        Unsaved changes
      </span>
    );
  }

  if (lastAutoSaved) {
    return (
      <span className="text-xs text-green-600 dark:text-green-400">
        Saved {lastAutoSaved.toLocaleTimeString()}
      </span>
    );
  }

  return <span className="text-xs text-muted-foreground">Start typing...</span>;
}