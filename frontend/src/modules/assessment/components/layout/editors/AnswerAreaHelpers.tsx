"use client";

import React from "react";

import { THRESHOLDS } from "@shared/constants/limits";

interface IAnswerStatsProps {
  characterCount: number;
  lineCount: number;
  wordCount: number;
  maxLength: number;
}

export function AnswerStats({
  characterCount,
  lineCount,
  wordCount,
  maxLength,
}: IAnswerStatsProps): React.JSX.Element {
  const isNearLimit = characterCount > maxLength * THRESHOLDS.HIGH_PROGRESS;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>Characters: {characterCount.toLocaleString()}</span>
      <span>Words: {wordCount.toLocaleString()}</span>
      <span>Lines: {lineCount.toLocaleString()}</span>
      
      {isNearLimit && (
        <span className={isOverLimit ? "text-red-600" : "text-yellow-600"}>
          {isOverLimit ? "Limit exceeded" : "Near limit"}
        </span>
      )}
    </div>
  );
}

interface IAutoSaveIndicatorProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastAutoSaved: Date | null;
}

export function AutoSaveIndicator({
  hasUnsavedChanges,
  isSaving,
  lastAutoSaved,
}: IAutoSaveIndicatorProps): React.JSX.Element {
  if (isSaving) {
    return (
      <span className="text-blue-600 text-sm">
        <span className="animate-pulse">•</span> Saving...
      </span>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <span className="text-yellow-600 text-sm">
        • Unsaved changes
      </span>
    );
  }

  if (lastAutoSaved) {
    return (
      <span className="text-green-600 text-sm">
        • Saved {lastAutoSaved.toLocaleTimeString()}
      </span>
    );
  }

  return <span className="text-sm text-muted-foreground">Ready</span>;
}
