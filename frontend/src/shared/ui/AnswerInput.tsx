"use client";

import React, { useMemo } from "react";

import type { IQuestion } from "@/types/ai";
import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";
import { Textarea } from "@shared/ui/textarea";
import { cn } from "@shared/utils/cn";

interface IAnswerInputProps {
  question: IQuestion;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

// Determine the programming language based on question tags or content
const getCodeLanguage = (question: IQuestion): "javascript" | "typescript" | "python" => {
  const tags = question.tags?.join(" ").toLowerCase() || "";
  const content = question.content.toLowerCase();

  if (tags.includes("python") || content.includes("python")) {
    return "python";
  }
  if (tags.includes("typescript") || content.includes("typescript")) {
    return "typescript";
  }
  return "javascript"; // default
};

export function AnswerInput({
  question,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  autoFocus = false,
}: IAnswerInputProps): React.JSX.Element {
  const isCodeQuestion = question.type === "coding";

  const language = useMemo(() => {
    if (!isCodeQuestion) return "javascript";
    return getCodeLanguage(question);
  }, [question, isCodeQuestion]);

  const defaultPlaceholder = isCodeQuestion
    ? `// Write your ${language} solution here...`
    : "Type your answer here. Take your time to think through the problem...";

  const actualPlaceholder = placeholder || defaultPlaceholder;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Your Answer
        </label>
        {isCodeQuestion && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Language: {language}
            </span>
          </div>
        )}
      </div>

      {/* Input field */}
      {isCodeQuestion ? (
        <div className="rounded-lg border border-border overflow-hidden">
          <CodeMirrorEditor
            value={value}
            onChange={onChange}
            language={language}
            placeholder={actualPlaceholder}
            readOnly={disabled}
            autoFocus={autoFocus}
            minHeight="300px"
            maxHeight="500px"
            theme="dark"
            className="text-sm"
          />
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={actualPlaceholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(
            "min-h-[200px] resize-y",
            "text-base leading-relaxed",
            "focus:ring-2 focus:ring-primary",
            "transition-all duration-200"
          )}
        />
      )}

      {/* Helper text */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {isCodeQuestion ? (
            <span>Write clean, readable code with proper formatting</span>
          ) : (
            <span>Be clear and concise in your explanation</span>
          )}
        </div>
        <div>
          {value.length > 0 && (
            <span>{value.length} characters</span>
          )}
        </div>
      </div>
    </div>
  );
}