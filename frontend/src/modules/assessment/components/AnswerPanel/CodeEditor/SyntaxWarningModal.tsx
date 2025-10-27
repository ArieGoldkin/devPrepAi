"use client";

import { AlertTriangle } from "lucide-react";

import type { TCodeLanguage } from "@modules/assessment/components/AnswerPanel/types";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { cn } from "@shared/utils/cn";

/**
 * Props for SyntaxWarningModal
 */
interface ISyntaxWarningModalProps {
  /** Whether the modal is open */
  open: boolean;

  /** Callback when modal should close */
  onOpenChange: (open: boolean) => void;

  /** Current programming language */
  currentLanguage: TCodeLanguage;

  /** Target language user wants to switch to */
  newLanguage: TCodeLanguage;

  /** Warning message from syntax detection */
  warningMessage: string;

  /** Callback when user confirms the language switch */
  onConfirm: () => void;

  /** Callback when user cancels the language switch */
  onCancel: () => void;
}

/**
 * Language display names
 */
const LANGUAGE_NAMES: Record<TCodeLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
};

/**
 * SyntaxWarningModal Component
 * Phase B: Warning dialog for syntax incompatibility
 *
 * Features:
 * - Glassmorphism dialog styling
 * - Clear warning message
 * - Confirm/Cancel actions
 * - Keyboard navigation (Escape to close)
 * - Accessible ARIA labels
 */
export function SyntaxWarningModal({
  open,
  onOpenChange,
  currentLanguage,
  newLanguage,
  warningMessage,
  onConfirm,
  onCancel,
}: ISyntaxWarningModalProps): React.JSX.Element {
  const handleCancel = (): void => {
    onCancel();
    onOpenChange(false);
  };

  const handleConfirm = (): void => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Glassmorphism styling
          "bg-[rgba(20,15,40,0.95)] backdrop-blur-[20px]",
          "border border-[rgba(120,119,198,0.4)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",

          // Size and spacing
          "max-w-md p-6 rounded-2xl",

          // Text colors
          "text-gray-100",
        )}
      >
        <DialogHeader className="space-y-4">
          {/* Warning icon */}
          <div className="flex justify-center">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                "bg-[rgba(251,191,36,0.1)]",
                "border-2 border-yellow-500/30",
              )}
            >
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <DialogTitle className="text-xl font-bold text-center text-white">
            ⚠️ Syntax Incompatibility Detected
          </DialogTitle>

          <DialogDescription className="text-center text-gray-300 space-y-3">
            <p className="text-sm leading-relaxed">{warningMessage}</p>

            <div
              className={cn(
                "p-4 rounded-lg",
                "bg-[rgba(120,119,198,0.1)]",
                "border border-[rgba(120,119,198,0.2)]",
              )}
            >
              <p className="text-sm font-medium text-gray-200">
                Switching from{" "}
                <span className="text-blue-400 font-semibold">
                  {LANGUAGE_NAMES[currentLanguage]}
                </span>{" "}
                to{" "}
                <span className="text-green-400 font-semibold">
                  {LANGUAGE_NAMES[newLanguage]}
                </span>{" "}
                will <span className="text-yellow-400">not modify</span> your
                code.
              </p>
            </div>

            <p className="text-xs text-gray-400">
              You may need to manually adjust your code to match{" "}
              {LANGUAGE_NAMES[newLanguage]} syntax.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 mt-6">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className={cn(
              "flex-1 text-gray-300",
              "hover:bg-[rgba(120,119,198,0.2)]",
              "hover:text-white",
              "transition-colors duration-200",
            )}
          >
            Cancel
          </Button>

          <Button
            variant="default"
            onClick={handleConfirm}
            className={cn(
              "flex-1",
              "bg-gradient-to-r from-purple-500 to-pink-500",
              "hover:from-purple-600 hover:to-pink-600",
              "text-white font-semibold",
              "shadow-lg shadow-purple-500/30",
              "transition-all duration-200",
            )}
          >
            Switch Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
