"use client";

import { Lightbulb } from "lucide-react";
import React, { useState } from "react";

import type { IQuestion } from "@/types/ai";
import { TIME_CONSTANTS } from "@lib/store/constants";
import { useAppStore } from "@lib/store/useAppStore";
import { Card, CardContent } from "@shared/ui/card";

import { HintControls } from "./HintControls";
import { HintDisplay } from "./HintDisplay";
import { HintStatusMessages } from "./HintStatusMessages";
import { HintTimingWarning } from "./HintTimingWarning";
import { HINT_LEVELS, HINT_TIMING_THRESHOLD, formatTime } from "./hintUtils";

interface IHintSystemProps {
  question: IQuestion;
  questionId: string;
  className?: string;
}

export function HintSystem({
  question,
  questionId,
  className = "",
}: IHintSystemProps): React.JSX.Element {
  const { revealHint, hintUsage, timeRemaining, settings } = useAppStore();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Get current hint usage for this question
  const currentHintUsage = hintUsage.find((hu) => hu.questionId === questionId);
  const revealedHints = currentHintUsage?.hintsRevealed || [];
  const totalPenalty = currentHintUsage?.scorePenalty ?? 0;

  // Calculate time elapsed since question started
  const totalTime = settings.duration * TIME_CONSTANTS.SECONDS_PER_MINUTE;
  const timeElapsed = totalTime - timeRemaining;
  const hintsDisabled = timeElapsed < HINT_TIMING_THRESHOLD;

  // Determine next available hint
  const nextHintIndex = revealedHints.length;
  const canRevealNext = nextHintIndex < question.hints.length;
  const nextHintLevel = HINT_LEVELS[nextHintIndex];

  const handleHintRequest = (): void => {
    if (nextHintLevel?.confirmationRequired) {
      setConfirmationOpen(true);
    } else {
      revealHint(questionId, nextHintIndex);
    }
  };

  const handleConfirmHint = (): void => {
    revealHint(questionId, nextHintIndex);
    setConfirmationOpen(false);
  };

  const handleCancelHint = (): void => {
    setConfirmationOpen(false);
  };

  return (
    <Card className={`border-amber-200 bg-amber-50/50 ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">Hints Available</h3>
            </div>
            {totalPenalty > 0 && (
              <div className="text-sm text-amber-700 font-medium">
                Score Impact: -{totalPenalty} points
              </div>
            )}
          </div>

          <HintTimingWarning
            timeRemaining={timeRemaining}
            hintsDisabled={hintsDisabled}
            formatTime={formatTime}
          />

          <HintDisplay
            question={question}
            revealedHints={revealedHints}
            hintLevels={HINT_LEVELS}
          />

          {canRevealNext && nextHintLevel && (
            <HintControls
              hintLevel={nextHintLevel}
              nextHintIndex={nextHintIndex}
              hintsDisabled={hintsDisabled}
              totalPenalty={totalPenalty}
              confirmationOpen={confirmationOpen}
              onConfirmationChange={setConfirmationOpen}
              onRevealHint={handleConfirmHint}
              onCancel={handleCancelHint}
              onHintRequest={handleHintRequest}
            />
          )}

          <HintStatusMessages
            totalPenalty={totalPenalty}
            canRevealNext={canRevealNext}
            revealedHintsCount={revealedHints.length}
            totalHintsCount={question.hints.length}
          />
        </div>
      </CardContent>
    </Card>
  );
}