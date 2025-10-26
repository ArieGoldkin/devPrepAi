"use client";

import { useState } from "react";

import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";
import { cn } from "@shared/utils/cn";

import type { ICodeEditorProps, TCodeLanguage } from "../types";

/**
 * Get short language label for badge display
 */
function getLanguageLabel(language: TCodeLanguage): string {
  const labels = {
    typescript: "TS",
    javascript: "JS",
    python: "PY",
  };
  return labels[language];
}

/**
 * CodeAnswerEditor - Enhanced CodeMirror wrapper for coding questions
 *
 * Features (Phase A):
 * - Dark theme by default matching design system
 * - Multi-language support (JavaScript, TypeScript, Python)
 * - Keyboard shortcuts (Ctrl+Enter to submit, Ctrl+S to save)
 * - Responsive min/max heights
 * - Character and line count display
 *
 * Future (Phase B/C):
 * - Language switching toolbar
 * - Autocomplete with custom suggestions
 * - Code formatting (Prettier integration)
 * - Auto-save with debouncing
 */
export function CodeAnswerEditor({
  value,
  onChange,
  language = "javascript",
  theme = "dark",
  placeholder = "// Write your solution here...\n// Use Ctrl+Enter to submit, Ctrl+S to save",
  readOnly = false,
  autoFocus = false,
  minHeight = "350px",
  maxHeight = "600px",
  onSubmit,
  onSave,
  onToggleHints,
}: ICodeEditorProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  // Calculate editor stats
  const totalLines = value.split("\n").length;
  const totalChars = value.length;

  return (
    <div
      className={cn(
        "code-answer-editor relative flex flex-col",
        "transition-all duration-300 ease-in-out",
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Language badge (top-right overlay) */}
      <div
        className={cn(
          "absolute top-4 right-4 z-20",
          "px-3 py-1 rounded-lg",
          "bg-[rgba(120,119,198,0.15)] backdrop-blur-[10px]",
          "border border-[rgba(120,119,198,0.3)]",
          "text-xs font-semibold uppercase tracking-wider",
          "text-purple-200 transition-all duration-200",
          isFocused &&
            "bg-[rgba(120,119,198,0.25)] border-[rgba(120,119,198,0.5)]",
        )}
        aria-label={`Programming language: ${language}`}
      >
        {getLanguageLabel(language)}
      </div>

      {/* CodeMirror Editor */}
      <div className="flex-1">
        <CodeMirrorEditor
          value={value}
          onChange={onChange}
          language={language}
          theme={theme}
          placeholder={placeholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          minHeight={minHeight}
          maxHeight={maxHeight}
          {...(onSubmit && { onSubmit })}
          {...(onSave && { onSave })}
          {...(onToggleHints && { onToggleHints })}
          className={cn(
            "h-full w-full",
            readOnly && "opacity-75 cursor-not-allowed",
          )}
        />
      </div>

      {/* Editor footer - Stats and hints */}
      <footer
        className={cn(
          "mt-4 flex items-center justify-between",
          "px-4 py-3 rounded-lg",
          "bg-[rgba(20,15,40,0.6)] backdrop-blur-[10px]",
          "border border-[rgba(120,119,198,0.2)]",
          "text-xs text-gray-400",
        )}
        aria-label="Editor statistics"
      >
        {/* Left: Stats */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="text-purple-400">Lines:</span>
            <span className="font-mono font-semibold text-gray-300">
              {totalLines}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-purple-400">Characters:</span>
            <span className="font-mono font-semibold text-gray-300">
              {totalChars}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-purple-400">Language:</span>
            <span className="font-mono font-semibold text-gray-300 capitalize">
              {language}
            </span>
          </span>
        </div>

        {/* Right: Keyboard shortcuts hint */}
        <div className="hidden md:flex items-center gap-3 text-gray-500">
          <kbd className="px-2 py-1 rounded bg-[rgba(120,119,198,0.1)] font-mono text-[10px]">
            Ctrl+Enter
          </kbd>
          <span>Submit</span>
          <span className="text-gray-700">|</span>
          <kbd className="px-2 py-1 rounded bg-[rgba(120,119,198,0.1)] font-mono text-[10px]">
            Ctrl+S
          </kbd>
          <span>Save</span>
        </div>
      </footer>
    </div>
  );
}

export default CodeAnswerEditor;
