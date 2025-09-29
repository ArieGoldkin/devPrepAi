"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader } from "@shared/ui/card";
import { cn } from "@shared/utils/cn";

// Constants for difficulty thresholds
const DIFFICULTY_EASY_MAX = 3;
const DIFFICULTY_MEDIUM_MAX = 7;
const ID_DISPLAY_LENGTH = 8;

interface IQuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: IQuestion;
  className?: string;
  showDifficulty?: boolean;
  showTags?: boolean;
  showExamples?: boolean;
}

const getDifficultyLabel = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_EASY_MAX) return "Easy";
  if (difficulty <= DIFFICULTY_MEDIUM_MAX) return "Medium";
  return "Hard";
};

const getDifficultyColor = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_EASY_MAX) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (difficulty <= DIFFICULTY_MEDIUM_MAX) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
};

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
      <CardHeader className="space-y-4">
        {/* Progress and metadata row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Question counter */}
            <span className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>

            {/* Question ID badge */}
            <Badge variant="outline" className="text-xs font-mono">
              {question.id.slice(0, ID_DISPLAY_LENGTH)}
            </Badge>
          </div>

          {/* Difficulty and time estimate */}
          <div className="flex items-center gap-2">
            {showDifficulty && (
              <Badge
                className={cn(
                  "text-xs font-medium",
                  getDifficultyColor(question.difficulty)
                )}
              >
                {getDifficultyLabel(question.difficulty)}
              </Badge>
            )}

            {question.timeEstimate && (
              <Badge variant="secondary" className="text-xs">
                {question.timeEstimate} min
              </Badge>
            )}
          </div>
        </div>

        {/* Question title */}
        <h2 className="text-xl font-semibold leading-tight">
          {question.title}
        </h2>

        {/* Tags */}
        {showTags && Array.isArray(question.tags) && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Question content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed text-foreground">
            {question.content}
          </p>
        </div>

        {/* Constraints */}
        {question.constraints && question.constraints.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              Constraints:
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {question.constraints.map((constraint, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-0.5 text-primary">•</span>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        {showExamples && question.examples && question.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Examples:
            </h3>
            {question.examples.map((example, index) => (
              <div
                key={index}
                className="rounded-lg bg-muted/50 p-4 space-y-2"
              >
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="flex items-start">
                    <span className="text-muted-foreground mr-2">Input:</span>
                    <span className="text-foreground">{example.input}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-muted-foreground mr-2">Output:</span>
                    <span className="text-foreground">{example.output}</span>
                  </div>
                </div>
                {example.explanation && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {example.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}