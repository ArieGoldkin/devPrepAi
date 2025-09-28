"use client";

import React, { useCallback, useMemo } from "react";

import type { IQuestion } from "@/types/ai";
import { Label } from "@shared/ui/label";

import { CodeInput, MultipleChoiceInput, TextInput } from "./AnswerInputTypes";

import { AutoSaveIndicator } from "@/modules/assessment/components/feedback/AutoSaveIndicator";

interface IAnswerInputProps {
  question: IQuestionOptions;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  showAutoSave?: boolean;
  autoSaveStatus?: "idle" | "typing" | "saving" | "saved" | "error";
  isOnline?: boolean;
  lastSaveTime?: number;
  placeholder?: string;
  className?: string;
}

interface IQuestionOptions extends IQuestion {
  options?: string[];
}

export function AnswerInput({
  question,
  value,
  onChange,
  onSubmit,
  onKeyDown,
  showAutoSave = false,
  autoSaveStatus = "idle",
  isOnline = true,
  lastSaveTime,
  placeholder,
  className = "",
}: IAnswerInputProps): React.JSX.Element {
  const answerType = question.type.toLowerCase();

  // Determine which input type to use
  const inputType = useMemo(() => {
    if (answerType.includes("code") || answerType.includes("algorithm")) {
      return "code";
    }
    if (answerType.includes("multiple") || answerType.includes("choice")) {
      return "multiple-choice";
    }
    return "text";
  }, [answerType]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Submit on Ctrl/Cmd + Enter
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onSubmit?.();
      }
      onKeyDown?.(e);
    },
    [onSubmit, onKeyDown]
  );

  // Get language for code editor
  const language = useMemo(() => {
    const tags = question.tags?.map((t) => t.toLowerCase()) ?? [];
    if (tags.includes("python")) return "python";
    if (tags.includes("typescript")) return "typescript";
    return "javascript";
  }, [question.tags]) as "javascript" | "typescript" | "python";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with auto-save indicator */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Your Answer</Label>
        {showAutoSave && (
          <AutoSaveIndicator
            status={autoSaveStatus}
            isOnline={isOnline}
            lastSaveTime={lastSaveTime ?? 0}
          />
        )}
      </div>

      {/* Input based on question type */}
      {inputType === "code" && (
        <CodeInput
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onSubmit={onSubmit || (() => {})}
          language={language}
          placeholder={placeholder || undefined}
        />
      )}

      {inputType === "multiple-choice" && question.options && (
        <MultipleChoiceInput
          value={value}
          onChange={onChange}
          options={question.options}
        />
      )}

      {inputType === "text" && (
        <TextInput
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || undefined}
        />
      )}

      {/* Keyboard shortcuts hint */}
      <div className="text-xs text-muted-foreground">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-muted rounded">
          Ctrl+Enter
        </kbd>{" "}
        to submit
      </div>
    </div>
  );
}
