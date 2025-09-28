"use client";

import React, { useRef, useEffect, useCallback } from "react";

import { HIGH_PERCENTAGE_THRESHOLD } from "@shared/constants/ui-constants";

import { AutoSaveStatus } from "../status/AutoSaveStatus";

import { MAX_TEXT_LENGTH } from "./answerAreaUtils";

interface ITextEditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  characterCount: number;
  wordCount: number;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastAutoSaved: Date | null;
}

export function TextEditor({
  value,
  onChange,
  onKeyDown,
  characterCount,
  wordCount,
  isSaving,
  hasUnsavedChanges,
  lastAutoSaved,
}: ITextEditorProps): React.JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const autoResizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  // Focus management
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize on value change
  useEffect(() => {
    autoResizeTextarea();
  }, [value, autoResizeTextarea]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="answer-textarea" className="text-sm font-medium text-foreground">
          Your Answer
        </label>
        <div className="flex items-center gap-3">
          <AutoSaveStatus
            isSaving={isSaving}
            hasUnsavedChanges={hasUnsavedChanges}
            lastAutoSaved={lastAutoSaved}
          />
          <span className="text-xs text-muted-foreground">
            {wordCount} words • {characterCount}/{MAX_TEXT_LENGTH} chars
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          id="answer-textarea"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Share your thoughts, approach, and solution...

Use Ctrl+Enter to submit or Ctrl+S to save manually.

💡 Tip: Be detailed in your explanation - mention your thought process, any assumptions, and alternative approaches you considered."
          className="w-full min-h-[200px] max-h-[500px] p-3 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ overflowY: 'auto' }}
          aria-label="Answer input"
          aria-describedby="answer-help"
        />

        {/* Character limit indicator */}
        <div className="absolute bottom-2 right-2">
          <span className={`text-xs px-2 py-1 rounded ${
            characterCount > MAX_TEXT_LENGTH * HIGH_PERCENTAGE_THRESHOLD
              ? 'bg-destructive/10 text-destructive'
              : 'bg-muted text-muted-foreground'
          }`}>
            {characterCount}/{MAX_TEXT_LENGTH}
          </span>
        </div>
      </div>

      <div id="answer-help" className="text-xs text-muted-foreground">
        <strong>Shortcuts:</strong> Ctrl+Enter (Submit) • Ctrl+S (Save) |
        <strong> Markdown supported:</strong> **bold**, *italic*, `code`, [link](url)
      </div>
    </div>
  );
}