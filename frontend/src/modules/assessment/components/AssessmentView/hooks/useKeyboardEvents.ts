import { useEffect } from "react";

interface IUseKeyboardEventsParams {
  handleKeyboardShortcuts: (event: KeyboardEvent) => void;
}

export function useKeyboardEvents({ handleKeyboardShortcuts }: IUseKeyboardEventsParams): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      handleKeyboardShortcuts(event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyboardShortcuts]);
}
