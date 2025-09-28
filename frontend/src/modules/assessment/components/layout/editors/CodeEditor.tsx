"use client";
import React from "react";

import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";

import { AutoSaveIndicator } from "../../feedback/AutoSaveIndicator";

interface ICodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onSubmit: () => void;
  onSave: () => void;
  language: "javascript" | "typescript" | "python";
  lineCount: number;
  syntaxErrors: string[];
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastAutoSaved: Date | null;
}

export function CodeEditor({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  onSave,
  language,
  lineCount,
  syntaxErrors,
  isSaving,
  hasUnsavedChanges,
  lastAutoSaved,
}: ICodeEditorProps): React.JSX.Element {
  // Calculate save status
  let saveStatus: "idle" | "saving" | "saved" | "error" | "typing";
  if (isSaving) {
    saveStatus = "saving";
  } else if (hasUnsavedChanges) {
    saveStatus = "typing";
  } else {
    saveStatus = "saved";
  }

  // Calculate last save time with null check
  const lastSaveTime = lastAutoSaved?.getTime() ?? Date.now();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Code Solution
        </label>
        <div className="flex items-center gap-3">
          <AutoSaveIndicator
            status={saveStatus}
            isOnline={true}
            lastSaveTime={lastSaveTime}
          />
          <span className="text-xs text-muted-foreground">
            {lineCount} lines
          </span>
        </div>
      </div>
      <div className="relative">
        <CodeMirrorEditor
          value={value}
          onChange={onChange}
          language={language}
          placeholder={`// Write your ${language} solution here...\n// Use Ctrl+Enter to submit, Ctrl+S to save`}
          onKeyDown={onKeyDown}
          onSubmit={onSubmit}
          onSave={onSave}
          autoFocus={true}
          minHeight="300px"
          maxHeight="600px"
        />
        {syntaxErrors.length > 0 && (
          <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="text-xs font-medium text-destructive mb-1">Syntax Issues:</div>
            <ul className="text-xs text-destructive space-y-1">
              {syntaxErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground">
        <strong>Shortcuts:</strong> Ctrl+Enter (Submit) • Ctrl+S (Save) • Ctrl+/ (Toggle hints)
      </div>
    </div>
  );
}
