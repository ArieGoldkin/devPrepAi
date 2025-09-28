"use client";

import { AlertTriangle } from "lucide-react";
import React from "react";

import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";

interface IHintLevel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  penalty: number;
  emoji: string;
  description: string;
  buttonVariant: "secondary" | "outline" | "destructive";
  confirmationRequired: boolean;
}

interface IHintControlsProps {
  hintLevel: IHintLevel;
  nextHintIndex: number;
  hintsDisabled: boolean;
  totalPenalty: number;
  confirmationOpen: boolean;
  onConfirmationChange: (open: boolean) => void;
  onRevealHint: () => void;
  onCancel: () => void;
  onHintRequest: () => void;
}

export function HintControls({
  hintLevel,
  nextHintIndex,
  hintsDisabled,
  totalPenalty,
  confirmationOpen,
  onConfirmationChange,
  onRevealHint,
  onCancel,
  onHintRequest,
}: IHintControlsProps): React.JSX.Element {
  return (
    <div className="pt-2 border-t border-amber-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{hintLevel.emoji}</span>
          <span className="text-sm text-amber-800">
            Next: {hintLevel.label} (-{hintLevel.penalty} points)
          </span>
        </div>

        <Dialog open={confirmationOpen} onOpenChange={onConfirmationChange}>
          <DialogTrigger asChild>
            <Button
              variant={hintLevel.buttonVariant}
              size="sm"
              disabled={hintsDisabled}
              onClick={onHintRequest}
              className="focus-visible:ring-amber-500"
              aria-label={`Reveal ${hintLevel.label} hint`}
            >
              Reveal Hint {nextHintIndex + 1}
            </Button>
          </DialogTrigger>

          {hintLevel.confirmationRequired && (
            <DialogContent
              className="sm:max-w-md"
              aria-describedby="hint-confirmation-description"
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{hintLevel.emoji}</span>
                  Reveal {hintLevel.label}?
                </DialogTitle>
                <DialogDescription id="hint-confirmation-description">
                  This hint will provide {hintLevel.description.toLowerCase()}
                  and reduce your score by {hintLevel.penalty} points.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800">Score Impact</p>
                    <p className="text-amber-700">
                      Current penalty: -{totalPenalty} points
                      <br />
                      After this hint: -{totalPenalty + hintLevel.penalty} points
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={onRevealHint}>
                  Reveal Hint (-{hintLevel.penalty} points)
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
