import * as React from "react";

import type { IAssessmentResults } from "@/types/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

interface IResultsSummaryProps {
  results: IAssessmentResults;
}

export function ResultsSummary({
  results,
}: IResultsSummaryProps): React.JSX.Element {
  const totalQuestions = results.questions.length;
  const averageScore =
    results.questions.reduce((acc, q) => acc + q.feedback.score, 0) /
    totalQuestions;

  return (
    <Card variant="gradient" className="animate-scale-in">
      <CardHeader>
        <CardTitle>Assessment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-headline font-bold text-white">
              {totalQuestions}
            </div>
            <div className="text-caption text-white/80">
              Questions Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-headline font-bold text-white">
              {averageScore.toFixed(1)}%
            </div>
            <div className="text-caption text-white/80">Average Score</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
