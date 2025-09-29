"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Card, CardContent, CardHeader } from "@shared/ui/card";
import { cn } from "@shared/utils/cn";

import { QuestionContent } from "./QuestionContent";
import { QuestionMetadata } from "./QuestionMetadata";

interface IQuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: IQuestion;
  className?: string;
  showDifficulty?: boolean;
  showTags?: boolean;
  showExamples?: boolean;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  className,
  showDifficulty = true,
  showTags = true,
  showExamples = true,
}: IQuestionCardProps): React.JSX.Element {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <QuestionMetadata
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          question={question}
          showDifficulty={showDifficulty}
          showTags={showTags}
        />
      </CardHeader>

      <CardContent>
        <QuestionContent question={question} showExamples={showExamples} />
      </CardContent>
    </Card>
  );
}
