import React from "react";

interface IAccessibilityAnnouncementsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
}

export function AccessibilityAnnouncements({
  currentQuestionIndex,
  totalQuestions,
  hasAnswered,
}: IAccessibilityAnnouncementsProps): React.JSX.Element {
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      <div role="status">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      {hasAnswered && (
        <div role="alert">
          Answer submitted for question {currentQuestionIndex + 1}
        </div>
      )}
    </div>
  );
}