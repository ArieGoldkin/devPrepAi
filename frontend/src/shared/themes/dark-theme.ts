/**
 * DevPrep AI Dark Theme for CodeMirror
 *
 * Standard OneDark syntax highlighting with custom background to match design system.
 */

import type { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

// Custom background overlay for unified dark purple background
const backgroundTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "rgba(20, 15, 40, 0.95) !important", // Purple-tinted dark background from design
      borderRadius: "12px",
      overflow: "hidden",
    },

    ".cm-content": {
      backgroundColor: "rgba(20, 15, 40, 0.95)",
    },

    ".cm-gutters": {
      backgroundColor: "rgba(20, 15, 40, 0.95) !important", // Same as editor background
      borderRight: "none",
      borderTopLeftRadius: "12px",
      borderBottomLeftRadius: "12px",
    },

    ".cm-scroller": {
      backgroundColor: "rgba(20, 15, 40, 0.95)",
      borderRadius: "12px",
    },
  },
  { dark: true },
);

export const darkTheme: Extension = [oneDark, backgroundTheme];
