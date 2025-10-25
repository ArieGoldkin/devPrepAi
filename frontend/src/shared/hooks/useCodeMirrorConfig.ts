import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import type { Extension } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";
import { useCallback, useMemo } from "react";

import { darkTheme } from "@shared/themes/dark-theme";

interface ICodeMirrorConfig {
  getLanguageExtension: () => Extension;
  getThemeExtension: () => Extension;
}

export function useCodeMirrorConfig(
  language: "javascript" | "typescript" | "python",
  theme: "dark" | "light",
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
      case "dark":
        return darkTheme;
      default:
        return darkTheme;
    }
  }, [theme]);

  return { getLanguageExtension, getThemeExtension };
}

export function useCodeMirrorKeymap(
  onSubmit?: () => void,
  onSave?: () => void,
  onToggleHints?: () => void,
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
    [onSubmit, onSave, onToggleHints],
  );
}
