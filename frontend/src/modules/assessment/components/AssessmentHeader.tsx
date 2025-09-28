import React from "react";

interface IAssessmentHeaderProps {
  currentIndex: number;
  totalQuestions: number;
}

export function AssessmentHeader({
  currentIndex,
  totalQuestions,
}: IAssessmentHeaderProps): React.JSX.Element {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full">
      <h2 className="text-headline font-bold">
        Question {currentIndex + 1} of {totalQuestions}
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-brand-primary h-2 rounded-full transition-all duration-300 animate-scale-in"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
