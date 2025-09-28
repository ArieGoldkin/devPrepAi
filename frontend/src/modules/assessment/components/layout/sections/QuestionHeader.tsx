"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { DIFFICULTY_EASY_MAX, DIFFICULTY_MEDIUM_MAX } from "@shared/constants/ui-constants";
import { cn } from "@shared/utils/cn";

interface IQuestionHeaderProps {
  question: IQuestion;
}

interface IDifficultyConfig {
  label: string;
  className: string;
}

const getDifficultyConfig = (difficulty?: number): IDifficultyConfig | null => {
  if (difficulty === null || difficulty === undefined) return null;

  if (difficulty <= DIFFICULTY_EASY_MAX) {
    return {
      label: "Easy",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    };
  }

  if (difficulty <= DIFFICULTY_MEDIUM_MAX) {
    return {
      label: "Medium",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    };
  }

  return {
    label: "Hard",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
};

export function QuestionHeader({ question }: IQuestionHeaderProps): React.JSX.Element {
  const difficultyConfig = getDifficultyConfig(question.difficulty);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Question {question.id}
        </span>
        {difficultyConfig && (
          <span className={cn("text-xs px-2 py-1 rounded-full", difficultyConfig.className)}>
            {difficultyConfig.label}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold">{question.title || "Coding Challenge"}</h3>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-foreground/90">{question.content}</p>
      </div>

      {question.category && (
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
            {question.category}
          </span>
          {question.subcategory && (
            <span className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md">
              {question.subcategory}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
