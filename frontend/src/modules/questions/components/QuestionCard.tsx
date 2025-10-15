import React from "react";

import type { IQuestion } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader } from "@shared/ui/card";

interface IQuestionCardProps {
  question: IQuestion;
  questionNumber?: number;
  totalQuestions?: number;
  onClick?: () => void;
}

const DIFFICULTY_THRESHOLD_MEDIUM = 3;
const DIFFICULTY_THRESHOLD_HARD = 6;

/**
 * QuestionCard - Questions Module
 *
 * Simple card for displaying questions in browsing/list views.
 * This is separate from the assessment QuestionPanel components which
 * are designed for the glassmorphism split-screen assessment UI.
 */
export function QuestionCard({
  question,
  questionNumber = 1,
  totalQuestions = 1,
  onClick,
}: IQuestionCardProps): React.ReactElement {
  const getDifficultyColor = (difficulty: number): string => {
    if (difficulty <= DIFFICULTY_THRESHOLD_MEDIUM)
      return "bg-green-500/20 text-green-400";
    if (difficulty <= DIFFICULTY_THRESHOLD_HARD)
      return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  return (
    <Card
      onClick={onClick}
      className={`w-full ${onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge className={getDifficultyColor(question.difficulty)}>
            Difficulty: {question.difficulty}/10
          </Badge>
        </div>
        <h3 className="text-lg font-semibold">{question.title}</h3>
        <div className="flex gap-2 mt-2">
          {question.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {question.content}
        </p>
      </CardContent>
    </Card>
  );
}
