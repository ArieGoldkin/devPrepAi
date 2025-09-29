"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { cn } from "@shared/utils/cn";

import {
  getDifficultyColor,
  getDifficultyLabel,
  ID_DISPLAY_LENGTH,
} from "./utils";

interface IQuestionMetadataProps {
  questionNumber: number;
  totalQuestions: number;
  question: IQuestion;
  showDifficulty?: boolean;
  showTags?: boolean;
}

export function QuestionMetadata({
  questionNumber,
  totalQuestions,
  question,
  showDifficulty = true,
  showTags = true,
}: IQuestionMetadataProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      {/* Progress and metadata row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge variant="outline" className="text-xs font-mono">
            {question.id.slice(0, ID_DISPLAY_LENGTH)}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {showDifficulty && (
            <Badge
              className={cn(
                "text-xs font-medium",
                getDifficultyColor(question.difficulty),
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
      <h2 className="text-xl font-semibold leading-tight">{question.title}</h2>

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
    </div>
  );
}
