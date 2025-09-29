import React from "react";

import type { IAssessmentResults } from "@/types/ai";
import { Card, CardContent } from "@shared/ui/card";
import { formatTimeSpent } from "@shared/utils/time";

interface IStatisticsProps {
  results: IAssessmentResults[];
}

export function Statistics({ results }: IStatisticsProps): React.JSX.Element {

  const calculateAverageScore = (): number => {
    if (results.length === 0) return 0;

    const totalScore = results.reduce((acc, result) => {
      const resultScore =
        result.questions.reduce(
          (questionAcc, q) => questionAcc + q.feedback.score,
          0,
        ) / result.questions.length;
      return acc + resultScore;
    }, 0);

    return Math.round((totalScore / results.length) * 100) / 100;
  };

  const averageTime = Math.round(
    results.reduce((acc, r) => acc + r.totalTimeSpent, 0) / results.length,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
      <Card variant="feature">
        <CardContent className="pt-6">
          <div className="text-headline font-bold text-brand-primary">
            {results.length}
          </div>
          <p className="text-caption text-gray-600">Total Assessments</p>
        </CardContent>
      </Card>
      <Card variant="feature">
        <CardContent className="pt-6">
          <div className="text-headline font-bold text-brand-primary">
            {calculateAverageScore().toFixed(1)}%
          </div>
          <p className="text-caption text-gray-600">Average Score</p>
        </CardContent>
      </Card>
      <Card variant="feature">
        <CardContent className="pt-6">
          <div className="text-headline font-bold text-brand-primary">
            {formatTimeSpent(averageTime)}
          </div>
          <p className="text-caption text-gray-600">Average Time</p>
        </CardContent>
      </Card>
    </div>
  );
}
