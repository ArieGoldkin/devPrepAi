"use client";

import React, { useState } from "react";

import { StatusBar } from "../feedback";
import { HintSystem } from "../hints";

import { ExampleAnswerArea } from "./ExampleAnswerArea";
import { exampleQuestion } from "./exampleData";
import { ExampleQuestionCard } from "./ExampleQuestionCard";

export function AssessmentWithHintsExample(): React.JSX.Element {
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAutoSave = (answer: string): void => {
    console.warn("Demo: Auto-saving answer:", answer);
    // In real implementation, this would save to backend or local storage
  };

  const handleSubmit = (): void => {
    setIsSubmitted(true);
    console.warn("Demo: Submitting answer:", userAnswer);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Assessment with Hints Demo</h1>
        <p className="text-muted-foreground">
          Try the hint system while answering this example question
        </p>
      </div>

      {/* Status Bar */}
      <StatusBar
        currentAnswer={userAnswer}
        onAutoSave={handleAutoSave}
        questionType="coding"
      />

      {/* Question */}
      <ExampleQuestionCard question={exampleQuestion} />

      {/* Hint System */}
      <HintSystem question={exampleQuestion} questionId={exampleQuestion.id} />

      {/* Answer Area */}
      <ExampleAnswerArea
        userAnswer={userAnswer}
        isSubmitted={isSubmitted}
        onAnswerChange={setUserAnswer}
        onSubmit={handleSubmit}
        onAutoSave={handleAutoSave}
      />

      {/* Demo Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Demo Features:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Hint system with progressive disclosure and scoring penalties
          </li>
          <li>• Auto-save functionality (simulated with console logs)</li>
          <li>• Responsive design for mobile and desktop</li>
          <li>• Accessibility features with proper ARIA labels</li>
        </ul>
      </div>
    </div>
  );
}
