/**
 * Code Mirror View Management Hook
 * Handles dynamic theme/language updates and autofocus for CodeMirror editor
 */
import type { Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import { useEffect, type RefObject } from "react";

import {
  themeCompartment,
  languageCompartment,
} from "@shared/constants/editor-config";

interface IUseCodeMirrorViewParams {
  viewRef: RefObject<EditorView | null>;
  theme: string;
  language: string;
  autoFocus: boolean;
  getThemeExtension: () => Extension;
  getLanguageExtension: () => Extension;
}

/**
 * Custom hook to manage CodeMirror view updates and focus
 * Extracted to reduce parent component complexity
 */
export function useCodeMirrorView({
  viewRef,
  theme,
  language,
  autoFocus,
  getThemeExtension,
  getLanguageExtension,
}: IUseCodeMirrorViewParams): void {
  // Update theme dynamically
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: themeCompartment.reconfigure(getThemeExtension()),
      });
    }
  }, [theme, getThemeExtension, viewRef]);

  // Update language dynamically
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: languageCompartment.reconfigure(getLanguageExtension()),
      });
    }
  }, [language, getLanguageExtension, viewRef]);

  // Handle autofocus
  useEffect(() => {
    if (autoFocus && viewRef.current) {
      viewRef.current.focus();
    }
  }, [autoFocus, viewRef]);
}
