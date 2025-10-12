import React from "react";

import type { IAssessmentResults } from "@/types/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { formatTimeSpent } from "@shared/utils/time";

import { ResultsDisplay } from "./ResultsDisplay";

interface IResultCardProps {
  result: IAssessmentResults;
  index: number;
  totalResults: number;
}

export function ResultCard({
  result,
  index,
  totalResults,
}: IResultCardProps): React.JSX.Element {

  const averageScore =
    result.questions.reduce((acc, q) => acc + q.feedback.score, 0) /
    result.questions.length;

  return (
    <Card variant="elevated" className="mb-4 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-title">
          Assessment #{totalResults - index}
        </CardTitle>
        <CardDescription>
          Completed on {new Date(result.completedAt).toLocaleDateString()} at{" "}
          {new Date(result.completedAt).toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-body">
          <div>
            <span className="font-medium text-body">Questions:</span>{" "}
            {result.questions.length}
          </div>
          <div>
            <span className="font-medium text-body">Time Spent:</span>{" "}
            {formatTimeSpent(result.totalTimeSpent)}
          </div>
          <div>
            <span className="font-medium text-body">Average Score:</span>{" "}
            {averageScore.toFixed(1)}%
          </div>
          <div>
            <span className="font-medium text-body">Completion:</span> 100%
          </div>
        </div>
        <ResultsDisplay assessmentResults={result} className="mt-4" />
      </CardContent>
    </Card>
  );
}
