"use client";

import React from "react";

import { Button } from "@shared/ui/button";

interface IDemoControlsProps {
  currentQuestionIndex: number;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function DemoControls({
  currentQuestionIndex,
  isLastQuestion,
  onPrevious,
  onNext,
  onReset,
}: IDemoControlsProps): React.JSX.Element {
  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        variant="outline"
      >
        Previous
      </Button>

      <div className="space-x-2">
        <Button onClick={onReset} variant="outline">
          Reset Demo
        </Button>

        {isLastQuestion ? (
          <Button onClick={onReset}>Restart Demo</Button>
        ) : (
          <Button onClick={onNext}>Next Question</Button>
        )}
      </div>
    </div>
  );
}
