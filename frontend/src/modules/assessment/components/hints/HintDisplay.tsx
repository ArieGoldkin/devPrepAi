"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";

interface IHintLevel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  penalty: number;
  emoji: string;
  description: string;
  buttonVariant: "secondary" | "outline" | "destructive";
  confirmationRequired: boolean;
}

interface IHintDisplayProps {
  question: IQuestion;
  revealedHints: number[];
  hintLevels: Record<number, IHintLevel>;
}

export function HintDisplay({
  question,
  revealedHints,
  hintLevels,
}: IHintDisplayProps): React.JSX.Element | null {
  if (revealedHints.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-amber-800">Revealed Hints:</h4>
      {revealedHints.map((hintIndex) => {
        const hintLevel = hintLevels[hintIndex];
        if (!hintLevel) return null;

        const IconComponent = hintLevel.icon;

        return (
          <div
            key={hintIndex}
            className="flex gap-3 p-3 bg-white border border-amber-200 rounded-lg animate-slide-down"
            role="region"
            aria-label={`Hint ${hintIndex + 1}: ${hintLevel.label}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <IconComponent className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{hintLevel.emoji}</span>
                <span className="text-sm font-medium text-amber-800">
                  {hintLevel.label} (-{hintLevel.penalty} points)
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {question.hints[hintIndex]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
