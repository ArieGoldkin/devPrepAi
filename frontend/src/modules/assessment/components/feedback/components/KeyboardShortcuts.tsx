import { Keyboard } from "lucide-react";
import React from "react";

import { Badge } from "@shared/ui/badge";

interface IKeyboardShortcutsProps {
  isMobile?: boolean;
}

export function KeyboardShortcuts({
  isMobile = false,
}: IKeyboardShortcutsProps): React.JSX.Element {
  if (isMobile) return <></>;

  const shortcuts = [
    { keys: ["⌘", "Enter"], action: "Submit" },
    { keys: ["⌘", "S"], action: "Save" },
    { keys: ["←", "→"], action: "Navigate" },
    { keys: ["⌘", "/"], action: "Hints" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Keyboard className="w-4 h-4 text-gray-600" />
      <div className="flex items-center gap-2">
        {shortcuts.map((shortcut, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-gray-50 text-gray-600 border-gray-200 px-2 py-1"
          >
            <span className="text-xs">
              {shortcut.keys.join("+")} {shortcut.action}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}