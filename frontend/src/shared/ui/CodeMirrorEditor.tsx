"use client";

import type { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useMemo, useRef } from "react";

import {
  EDITOR_DEFAULTS,
  EDITOR_THEME_CLASSES,
  themeCompartment,
  languageCompartment,
} from "@shared/constants/editor-config";
import {
  useCodeMirrorConfig,
  useCodeMirrorKeymap,
} from "@shared/hooks/useCodeMirrorConfig";
import { cn } from "@shared/utils/cn";
import { createEditorExtensions } from "@shared/utils/editor-extensions";

interface ICodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "javascript" | "typescript" | "python";
  theme?: "dark" | "light" | "high-contrast";
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onSubmit?: () => void;
  onSave?: () => void;
  onToggleHints?: () => void;
  autoFocus?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

// eslint-disable-next-line max-lines-per-function
export function CodeMirrorEditor({
  value,
  onChange,
  language = "javascript",
  theme = "dark",
  placeholder = EDITOR_DEFAULTS.placeholder,
  readOnly = false,
  className = "",
  onKeyDown,
  onSubmit,
  onSave,
  onToggleHints,
  autoFocus = false,
  minHeight = EDITOR_DEFAULTS.minHeight,
  maxHeight = EDITOR_DEFAULTS.maxHeight,
}: ICodeMirrorEditorProps): React.JSX.Element {
  const viewRef = useRef<EditorView | null>(null);
  const { getLanguageExtension, getThemeExtension } = useCodeMirrorConfig(
    language,
    theme
  );
  const customKeymap = useCodeMirrorKeymap(onSubmit, onSave, onToggleHints);

  const extensions = useMemo(
    () =>
      createEditorExtensions({
        getLanguageExtension,
        getThemeExtension,
        customKeymap,
        minHeight,
        maxHeight,
        theme,
        readOnly,
        onKeyDown,
        onChange,
      }),
    [
      getLanguageExtension,
      getThemeExtension,
      customKeymap,
      minHeight,
      maxHeight,
      theme,
      readOnly,
      onKeyDown,
      onChange,
    ]
  );

  // Update theme dynamically
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: themeCompartment.reconfigure(getThemeExtension()),
      });
    }
  }, [theme, getThemeExtension]);

  // Update language dynamically
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: languageCompartment.reconfigure(getLanguageExtension()),
      });
    }
  }, [language, getLanguageExtension]);

  // Handle autofocus
  useEffect(() => {
    if (autoFocus && viewRef.current) {
      viewRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      className={cn(
        "code-editor-wrapper relative rounded-lg overflow-hidden",
        EDITOR_THEME_CLASSES[theme],
        className
      )}
      role="group"
      aria-label={`Code editor for ${language}`}
      aria-describedby="editor-shortcuts"
    >
      <div
        className={cn(
          "absolute top-2 right-2 z-10 text-xs uppercase",
          theme === "light" ? "text-gray-500" : "text-gray-400"
        )}
      >
        {language}
      </div>
      <CodeMirror
        value={value}
        extensions={extensions}
        placeholder={placeholder}
        editable={!readOnly}
        onCreateEditor={(view) => {
          viewRef.current = view;
        }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          highlightSelectionMatches: true,
          searchKeymap: true,
        }}
      />
      <div id="editor-shortcuts" className="sr-only">
        Keyboard shortcuts: Control plus Enter to submit, Control plus S to
        save, Control plus forward slash to toggle hints
      </div>
    </div>
  );
}

export default CodeMirrorEditor;