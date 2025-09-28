"use client";
import React from "react";

import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";
import { Label } from "@shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@shared/ui/radio-group";
import { Textarea } from "@shared/ui/textarea";

interface ICodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  language: "javascript" | "typescript" | "python";
  placeholder?: string | undefined;
}

export function CodeInput({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  language,
  placeholder,
}: ICodeInputProps): React.JSX.Element {
  return (
    <div className="rounded-lg border">
      <CodeMirrorEditor
        value={value}
        onChange={onChange}
        language={language}
        placeholder={
          placeholder ||
          "// Write your solution here...\n// Use Ctrl+Enter to submit"
        }
        onKeyDown={onKeyDown}
        onSubmit={onSubmit}
        autoFocus={true}
        minHeight="300px"
        maxHeight="600px"
      />
    </div>
  );
}

interface IMultipleChoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function MultipleChoiceInput({
  value,
  onChange,
  options,
}: IMultipleChoiceInputProps): React.JSX.Element {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="space-y-3">
        {options.map((option, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <RadioGroupItem
              value={option}
              id={`option-${idx}`}
              className="mt-0.5"
            />
            <Label
              htmlFor={`option-${idx}`}
              className="flex-1 cursor-pointer text-sm"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}

interface ITextInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string | undefined;
}

export function TextInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
}: ITextInputProps): React.JSX.Element {
  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={
          placeholder ||
          "Type your answer here... (Ctrl+Enter to submit)"
        }
        className="min-h-[150px] resize-y"
        autoFocus
      />
      <div className="flex justify-end text-xs text-muted-foreground">
        <span>
          {value.split(/\s+/).filter(Boolean).length} words •{" "}
          {value.length} characters
        </span>
      </div>
    </>
  );
}