import type * as React from "react";

const MIN_TEXTAREA_HEIGHT = 32;

interface ITextAnswerSectionProps {
  inputValue: string;
  characterCount: number;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
  maxLength: number;
}

const CharacterCounter = ({
  count,
  maxLength,
}: {
  count: number;
  maxLength: number;
}): React.ReactElement => (
  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-1">
    {count}/{maxLength}
  </div>
);

export function TextAnswerSection({
  inputValue,
  characterCount,
  handleChange,
  handleKeyDown,
  placeholder,
  disabled,
  maxLength,
}: ITextAnswerSectionProps): React.ReactElement {
  return (
    <div className="relative">
      <textarea
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full min-h-${MIN_TEXTAREA_HEIGHT} p-3 border border-input bg-background rounded-md text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Answer input"
      />
      <CharacterCounter count={characterCount} maxLength={maxLength} />
    </div>
  );
}
