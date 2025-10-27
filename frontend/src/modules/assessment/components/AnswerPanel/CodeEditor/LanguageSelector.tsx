"use client";

import { Check, ChevronDown, Code2 } from "lucide-react";

import type { TCodeLanguage } from "@modules/assessment/components/AnswerPanel/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { cn } from "@shared/utils/cn";
import { useAppStore } from "@store/hooks";

/** Language configuration */
const LANGUAGES = [
  {
    value: "javascript",
    label: "JavaScript",
    badge: "JS",
    color: "text-yellow-400",
  },
  {
    value: "typescript",
    label: "TypeScript",
    badge: "TS",
    color: "text-blue-400",
  },
  { value: "python", label: "Python", badge: "PY", color: "text-green-400" },
] as const;

/**
 * Props for LanguageSelector
 */
interface ILanguageSelectorProps {
  /** Current language */
  currentLanguage?: TCodeLanguage;

  /** Callback when language changes */
  onLanguageChange?: (language: TCodeLanguage) => void;
}

/**
 * LanguageSelector Component
 * Phase B: Interactive language selector with glassmorphism dropdown
 *
 * Features:
 * - Glassmorphism dropdown (blur, borders, shadows)
 * - Current language highlighted with checkmark
 * - Keyboard navigation (Tab, arrows, Enter, Escape)
 * - Touch targets ≥44px on mobile
 * - Accessible ARIA labels
 */
export function LanguageSelector({
  currentLanguage: currentLanguageProp,
  onLanguageChange,
}: ILanguageSelectorProps = {}): React.JSX.Element {
  const storeLanguage = useAppStore((state) => state.currentLanguage);
  const storeSetLanguage = useAppStore((state) => state.setLanguage);

  // Use prop if provided, otherwise use store
  const currentLanguage = currentLanguageProp || storeLanguage;
  const currentLangConfig = LANGUAGES.find((l) => l.value === currentLanguage);

  const handleLanguageChange = (language: TCodeLanguage): void => {
    if (language !== currentLanguage) {
      if (onLanguageChange) {
        onLanguageChange(language);
      } else {
        storeSetLanguage(language);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          // Base styles
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          "text-sm font-semibold transition-all duration-200",

          // Glassmorphism
          "bg-[rgba(120,119,198,0.1)] backdrop-blur-[10px]",
          "border border-[rgba(120,119,198,0.3)]",

          // Hover state
          "hover:bg-[rgba(120,119,198,0.2)]",
          "hover:border-[rgba(120,119,198,0.5)]",
          "hover:shadow-[0_4px_20px_rgba(120,119,198,0.3)]",
          "hover:-translate-y-0.5",

          // Focus state
          "focus:outline-none focus:ring-2 focus:ring-purple-500/50",

          // Mobile touch target
          "min-h-[44px]",
        )}
        aria-label="Select programming language"
      >
        <Code2 className="w-4 h-4 text-purple-400" />
        <span
          className={cn("uppercase tracking-wide", currentLangConfig?.color)}
        >
          {currentLangConfig?.badge}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          // Glassmorphism dropdown
          "bg-[rgba(20,15,40,0.95)] backdrop-blur-[20px]",
          "border border-[rgba(120,119,198,0.4)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          "rounded-xl p-2",

          // Animation
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        )}
        align="start"
        sideOffset={8}
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.value === currentLanguage;

          return (
            <DropdownMenuItem
              key={lang.value}
              onClick={() => handleLanguageChange(lang.value as TCodeLanguage)}
              className={cn(
                // Base styles
                "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer",
                "text-sm font-medium transition-colors duration-200",

                // Default state
                "text-gray-300",

                // Hover state
                "hover:bg-[rgba(120,119,198,0.2)]",
                "focus:bg-[rgba(120,119,198,0.2)]",

                // Active state
                isActive && [
                  "bg-[rgba(120,119,198,0.3)]",
                  "border-l-3 border-l-[hsl(var(--brand-primary))]",
                  "text-white",
                ],

                // Mobile touch target
                "min-h-[44px]",
              )}
            >
              {/* Checkmark for active language */}
              <div className="w-4 h-4 flex items-center justify-center">
                {isActive && <Check className="w-4 h-4 text-purple-400" />}
              </div>

              {/* Language label */}
              <div className="flex-1">
                <div className={cn("font-semibold", lang.color)}>
                  {lang.label}
                </div>
                <div className="text-xs text-gray-500">
                  .{lang.value} extension
                </div>
              </div>

              {/* Badge */}
              <div
                className={cn(
                  "px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
                  "bg-[rgba(120,119,198,0.15)]",
                  lang.color,
                )}
              >
                {lang.badge}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
