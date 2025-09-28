import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import type { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useCallback, useMemo } from "react";

interface ICodeMirrorConfig {
  getLanguageExtension: () => Extension;
  getThemeExtension: () => Extension;
}

export function useCodeMirrorConfig(
  language: "javascript" | "typescript" | "python",
  theme: "dark" | "light" | "high-contrast"
): ICodeMirrorConfig {
  const getLanguageExtension = useCallback((): Extension => {
    switch (language) {
      case "python":
        return python();
      case "typescript":
        return javascript({ typescript: true });
      default:
        return javascript();
    }
  }, [language]);

  const getThemeExtension = useCallback((): Extension => {
    switch (theme) {
      case "light":
        return githubLight;
      case "high-contrast":
        return oneDark;
      default:
        return oneDark;
    }
  }, [theme]);

  return { getLanguageExtension, getThemeExtension };
}

export function useCodeMirrorKeymap(
  onSubmit?: () => void,
  onSave?: () => void,
  onToggleHints?: () => void
): Extension {
  return useMemo(
    () =>
      keymap.of([
        {
          key: "Ctrl-Enter",
          mac: "Cmd-Enter",
          run: () => {
            onSubmit?.();
            return true;
          },
        },
        {
          key: "Ctrl-s",
          mac: "Cmd-s",
          preventDefault: true,
          run: () => {
            onSave?.();
            return true;
          },
        },
        {
          key: "Ctrl-/",
          mac: "Cmd-/",
          run: () => {
            onToggleHints?.();
            return true;
          },
        },
      ]),
    [onSubmit, onSave, onToggleHints]
  );
}