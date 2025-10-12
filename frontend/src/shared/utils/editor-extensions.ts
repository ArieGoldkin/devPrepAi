import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import type { Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";

import {
  EDITOR_DEFAULTS,
  EDITOR_FOCUS_STYLES,
  languageCompartment,
  themeCompartment,
} from "@shared/constants/editor-config";

interface IExtensionConfig {
  getLanguageExtension: () => Extension;
  getThemeExtension: () => Extension;
  customKeymap: Extension;
  minHeight: string;
  maxHeight: string;
  theme: "dark" | "light" | "high-contrast";
  readOnly: boolean;
  onKeyDown: ((event: React.KeyboardEvent) => void) | undefined;
  onChange: (value: string) => void;
}

export function createEditorExtensions({
  getLanguageExtension,
  getThemeExtension,
  customKeymap,
  minHeight,
  maxHeight,
  theme,
  readOnly,
  onKeyDown,
  onChange,
}: IExtensionConfig): Extension[] {
  return [
    languageCompartment.of(getLanguageExtension()),
    themeCompartment.of(getThemeExtension()),
    customKeymap,
    keymap.of([
      indentWithTab,
      ...completionKeymap,
      ...closeBracketsKeymap,
      ...foldKeymap,
    ]),
    EditorView.lineWrapping,
    EditorView.theme({
      "&": {
        fontSize: EDITOR_DEFAULTS.fontSize,
        fontFamily: EDITOR_DEFAULTS.fontFamily,
      },
      ".cm-content": {
        padding: EDITOR_DEFAULTS.padding,
        minHeight,
        maxHeight,
      },
      ".cm-focused": { outline: "none" },
      ".cm-editor": {
        borderRadius: "0.5rem",
        overflow: "hidden",
      },
      ".cm-editor.cm-focused": {
        outline:
          theme === "high-contrast"
            ? EDITOR_FOCUS_STYLES.highContrast
            : EDITOR_FOCUS_STYLES.default,
        outlineOffset: "2px",
      },
      ".cm-placeholder": {
        color: "rgba(156, 163, 175, 0.6)",
        fontStyle: "italic",
      },
      ".cm-line": { lineHeight: EDITOR_DEFAULTS.lineHeight },
      ".cm-gutters": {
        borderRight:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        backgroundColor:
          theme === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
      },
    }),
    EditorView.domEventHandlers({
      keydown: (event) => {
        if (onKeyDown) {
          const reactEvent = event as unknown as React.KeyboardEvent;
          onKeyDown(reactEvent);
        }
      },
    }),
    EditorState.readOnly.of(readOnly),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    foldGutter(),
    EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    }),
  ];
}