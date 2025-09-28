"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

// Constants
const DIFFICULTY_EASY_THRESHOLD = 3;
const DIFFICULTY_MEDIUM_THRESHOLD = 7;

interface IQuestionDisplayProps {
  question: IQuestion;
  variant?: "default" | "compact" | "assessment" | "practice";
  showDifficulty?: boolean;
  showType?: boolean;
  showTags?: boolean;
  className?: string;
}

const getDifficultyColor = (
  difficulty: number
): "secondary" | "default" | "destructive" => {
  if (difficulty <= DIFFICULTY_EASY_THRESHOLD) return "secondary";
  if (difficulty <= DIFFICULTY_MEDIUM_THRESHOLD) return "default";
  return "destructive";
};

const getDifficultyLabel = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_EASY_THRESHOLD) return "Easy";
  if (difficulty <= DIFFICULTY_MEDIUM_THRESHOLD) return "Medium";
  return "Hard";
};

// Helper component for constraints list
function ConstraintsList({
  constraints,
}: {
  constraints?: string[] | undefined;
}): React.JSX.Element | null {
  if (!constraints || constraints.length === 0) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Constraints:</h4>
      <ul className="text-sm text-muted-foreground space-y-1">
        {constraints.map((constraint, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{constraint}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper component for examples
function ExamplesList({
  examples,
}: {
  examples?: Array<{ input: string; output: string; explanation?: string }> | undefined;
}): React.JSX.Element | null {
  if (!examples || examples.length === 0) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Examples:</h4>
      <div className="space-y-3">
        {examples.map((example, idx) => (
          <div key={idx} className="bg-muted rounded-lg p-3">
            <div className="text-sm font-mono space-y-1">
              <div>
                <span className="text-muted-foreground">Input:</span>{" "}
                {example.input}
              </div>
              <div>
                <span className="text-muted-foreground">Output:</span>{" "}
                {example.output}
              </div>
              {example.explanation && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {example.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Solution preview component
function SolutionPreview({
  solution,
}: {
  solution?: string;
}): React.JSX.Element | null {
  if (!solution) return null;
  return (
    <details className="rounded-lg bg-muted p-4">
      <summary className="cursor-pointer font-medium text-sm">
        View Solution
      </summary>
      <pre className="text-sm overflow-x-auto mt-2">
        <code>{solution}</code>
      </pre>
    </details>
  );
}

// Tags display component
function TagsList({ tags }: { tags?: string[] | undefined }): React.JSX.Element | null {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {tags.map((tag, idx) => (
        <Badge key={idx} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// Header badges component
function HeaderBadges({
  question,
  showType,
  showDifficulty,
}: {
  question: IQuestion;
  showType: boolean;
  showDifficulty: boolean;
}): React.JSX.Element | null {
  if (!showType && !showDifficulty) return null;
  return (
    <div className="flex gap-2 flex-shrink-0">
      {showType && (
        <Badge variant="outline" className="text-xs">
          {question.type}
        </Badge>
      )}
      {showDifficulty && (
        <Badge
          variant={getDifficultyColor(question.difficulty)}
          className="text-xs"
        >
          {getDifficultyLabel(question.difficulty)}
        </Badge>
      )}
    </div>
  );
}

export function QuestionDisplay({
  question,
  variant = "default",
  showDifficulty = true,
  showType = true,
  showTags = false,
  className = "",
}: IQuestionDisplayProps): React.JSX.Element {
  const isCompact = variant === "compact";

  return (
    <Card className={`${className} ${isCompact ? "p-4" : ""}`}>
      <CardHeader className={isCompact ? "p-0" : ""}>
        <div className="flex items-start justify-between gap-4">
          <CardTitle
            className={`${isCompact ? "text-base" : "text-lg"} leading-6`}
          >
            {question.title}
          </CardTitle>
          <HeaderBadges
            question={question}
            showType={showType}
            showDifficulty={showDifficulty}
          />
        </div>
      </CardHeader>

      <CardContent className={isCompact ? "p-0 mt-4" : ""}>
        <div className="space-y-4">
          {/* Question Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground">{question.content}</p>
          </div>

          {variant === "practice" && (
            <SolutionPreview solution={question.solution} />
          )}

          <ConstraintsList constraints={question.constraints || undefined} />
          <ExamplesList examples={question.examples || undefined} />

          {showTags && <TagsList tags={question.tags} />}
        </div>
      </CardContent>
    </Card>
  );
}
