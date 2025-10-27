"use client";

import { cn } from "@shared/utils/cn";

import { LanguageSelector } from "./LanguageSelector";

/**
 * Props for EditorToolbar
 */
interface IEditorToolbarProps {
  /** Optional className for custom styling */
  className?: string;
}

/**
 * EditorToolbar Component
 * Phase B: Toolbar with language selector
 *
 * Layout:
 * - Flex container with space-between
 * - Left side: Language selector
 * - Right side: Format button placeholder (Phase C)
 * - Responsive: Stack on mobile (<768px)
 *
 * Features:
 * - Glassmorphism card styling
 * - Smooth transitions
 * - Mobile-responsive layout
 */
export function EditorToolbar({
  className,
}: IEditorToolbarProps): React.JSX.Element {
  return (
    <div
      className={cn(
        // Layout
        "flex items-center justify-between gap-4",
        "px-4 py-3 rounded-t-xl",

        // Glassmorphism styling
        "bg-[rgba(20,15,40,0.6)] backdrop-blur-[10px]",
        "border border-[rgba(120,119,198,0.2)]",
        "border-b-0", // Connects to editor below

        // Responsive
        "flex-wrap md:flex-nowrap",

        className,
      )}
      role="toolbar"
      aria-label="Code editor toolbar"
    >
      {/* Left: Language Selector */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:inline">
          Language
        </span>
        <LanguageSelector />
      </div>

      {/* Right: Format button placeholder (Phase C) */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="hidden md:inline">Phase C: Format button</span>
      </div>
    </div>
  );
}
