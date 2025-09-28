"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

interface IExampleQuestionCardProps {
  question: IQuestion;
}

export function ExampleQuestionCard({
  question,
}: IExampleQuestionCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{question.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="capitalize">{question.type}</span>
          <span>Difficulty: {question.difficulty}/5</span>
          <span>{question.timeEstimate} minutes</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <p>{question.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
