import { Compartment } from "@codemirror/state";

export const EDITOR_DEFAULTS = {
  minHeight: "200px",
  maxHeight: "600px",
  fontSize: "14px",
  fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  lineHeight: "1.6",
  padding: "16px",
  placeholder: "// Start typing your code...",
} as const;

export const EDITOR_THEME_CLASSES = {
  light: "bg-white",
  dark: "bg-gray-900",
  "high-contrast": "bg-black border-2 border-white",
} as const;

export const EDITOR_FOCUS_STYLES = {
  default: "2px solid rgba(59, 130, 246, 0.5)",
  highContrast: "2px solid white",
} as const;

export const themeCompartment = new Compartment();
export const languageCompartment = new Compartment();