import type * as React from "react";
import { useState } from "react";

import type { IQuestion } from "@/types/ai";

import { CodeAnswerSection } from "./CodeAnswerSection";
import { SubmitSection } from "./SubmitSection";
import { TextAnswerSection } from "./TextAnswerSection";
import { DEFAULT_MAX_LENGTH, isCodingQuestion } from "./utils";

interface IAnswerInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (answer: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  submitButtonText?: string;
  question?: IQuestion;
}

interface IUseAnswerInput {
  inputValue: string;
  setValue: (val: string) => void;
}

const useAnswerInput = (
  value: string,
  onChange?: (value: string) => void,
): IUseAnswerInput => {
  const [localValue, setLocalValue] = useState(value);
  const inputValue = onChange ? value : localValue;
  const setValue = (val: string): void => {
    if (onChange) onChange(val);
    else setLocalValue(val);
  };
  return { inputValue, setValue };
};

export function AnswerInput({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Type your answer here...",
  maxLength = DEFAULT_MAX_LENGTH,
  disabled = false,
  submitButtonText = "Submit Answer",
  question,
}: IAnswerInputProps): React.ReactElement {
  const { inputValue, setValue } = useAnswerInput(value, onChange);
  const isCodeQuestion = isCodingQuestion(question);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length <= maxLength) setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      e.key === "Enter" &&
      (e.ctrlKey || e.metaKey) &&
      onSubmit &&
      inputValue.trim()
    ) {
      e.preventDefault();
      onSubmit(inputValue.trim());
    }
  };

  const handleSubmit = (): void => {
    if (onSubmit && inputValue.trim()) onSubmit(inputValue.trim());
  };

  return (
    <div className="space-y-4">
      {isCodeQuestion ? (
        <CodeAnswerSection
          inputValue={inputValue}
          onChange={setValue}
          disabled={disabled}
        />
      ) : (
        <TextAnswerSection
          inputValue={inputValue}
          characterCount={inputValue.length}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}
      <SubmitSection
        onSubmit={handleSubmit}
        disabled={disabled}
        inputEmpty={!inputValue.trim()}
        submitButtonText={submitButtonText}
      />
    </div>
  );
}
