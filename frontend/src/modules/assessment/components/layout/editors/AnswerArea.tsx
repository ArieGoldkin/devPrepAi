"use client";

import type * as React from "react";
import { useCallback } from "react";

import type { IQuestion } from "@/types/ai";

import { isCodingQuestion } from "../../answer/utils";

import {
  detectLanguage,
  getCharacterCount,
  getLineCount,
  getWordCount,
  validateSyntax,
  MAX_TEXT_LENGTH,
} from "./answerAreaUtils";
import { CodeEditor } from "./CodeEditor";
import { TextEditor } from "./TextEditor";
import { useAnswerAutoSave } from "./useAnswerAutoSave";

interface IAnswerAreaProps {
  question: IQuestion;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AnswerArea({
  question,
  value,
  onChange,
  onSubmit,
}: IAnswerAreaProps): React.ReactElement {
  const {
    hasUnsavedChanges,
    lastAutoSaved,
    isSaving,
    handleChange: handleAutoSaveChange,
    handleManualSave,
  } = useAnswerAutoSave();

  const isCoding = isCodingQuestion(question);
  const language = isCoding ? detectLanguage(question) : "javascript";

  const characterCount = getCharacterCount(value);
  const lineCount = getLineCount(value);
  const wordCount = getWordCount(value);
  const syntaxErrors = validateSyntax(value, isCoding);

  const handleChange = useCallback((newValue: string) => {
    handleAutoSaveChange(question.id, newValue, onChange);
  }, [handleAutoSaveChange, question.id, onChange]);

  const handleSave = useCallback(() => {
    handleManualSave(question.id);
  }, [handleManualSave, question.id]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      handleSave();
      return;
    }
  }, [onSubmit, handleSave]);

  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= MAX_TEXT_LENGTH) {
      handleChange(newValue);
    }
  }, [handleChange]);

  if (isCoding) {
    return (
      <CodeEditor
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={onSubmit}
        onSave={handleSave}
        language={language}
        lineCount={lineCount}
        syntaxErrors={syntaxErrors}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastAutoSaved={lastAutoSaved}
      />
    );
  }

  return (
    <TextEditor
      value={value}
      onChange={handleTextareaChange}
      onKeyDown={handleKeyDown}
      characterCount={characterCount}
      wordCount={wordCount}
      isSaving={isSaving}
      hasUnsavedChanges={hasUnsavedChanges}
      lastAutoSaved={lastAutoSaved}
    />
  );
}