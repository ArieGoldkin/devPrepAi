"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { cn } from "@shared/utils/cn";

interface IQuestionDisplayProps {
  questionNumber: number;
  totalQuestions: number;
  question: IQuestion;
  timeLimit?: string | undefined;
  className?: string;
}

// Helper: Map difficulty to color
function getDifficultyColor(difficulty: string | number): string {
  const diffStr = String(difficulty).toLowerCase();
  switch (diffStr) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Helper: Map question type to display name
function getTypeDisplay(type: string): string {
  switch (type) {
    case "coding":
      return "Coding";
    case "system-design":
      return "System Design";
    case "behavioral":
      return "Behavioral";
    case "conceptual":
      return "Conceptual";
    default:
      return type;
  }
}

// Helper: Render value as string
function renderValue(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}

// Sub-component: Question Metadata
interface IQuestionMetadataProps {
  questionNumber: number;
  totalQuestions: number;
  type: string;
  timeLimit?: string | undefined;
  difficulty: string | number;
}

function QuestionMetadata({
  questionNumber,
  totalQuestions,
  type,
  timeLimit,
  difficulty,
}: IQuestionMetadataProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <span className="font-medium">
        {questionNumber} of {totalQuestions}
      </span>
      <span>•</span>
      <span>{getTypeDisplay(type)}</span>
      {timeLimit !== undefined && timeLimit !== "" && (
        <>
          <span>•</span>
          <span>⏱ {timeLimit}</span>
        </>
      )}
      <span>•</span>
      <Badge
        variant="secondary"
        className={cn("font-medium", getDifficultyColor(difficulty))}
      >
        {difficulty}
      </Badge>
    </div>
  );
}

// Sub-component: Example Display
interface IExampleDisplayProps {
  examples: Array<{
    input?: unknown;
    output?: unknown;
    explanation?: string;
  }>;
}

function ExampleDisplay({ examples }: IExampleDisplayProps): React.JSX.Element {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
      <p className="text-sm font-medium text-blue-900 mb-1">Example:</p>
      {examples.map((example, index) => (
        <div key={index} className="text-sm text-blue-800">
          {example.input !== undefined && (
            <div className="mb-1">
              <span className="font-medium">Input:</span>{" "}
              <code className="font-mono bg-blue-100 px-1 rounded">
                {renderValue(example.input)}
              </code>
            </div>
          )}
          {example.output !== undefined && (
            <div>
              <span className="font-medium">Output:</span>{" "}
              <code className="font-mono bg-blue-100 px-1 rounded">
                {renderValue(example.output)}
              </code>
            </div>
          )}
          {example.explanation !== undefined && example.explanation !== "" && (
            <p className="mt-1 text-blue-700">{example.explanation}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function QuestionDisplay({
  questionNumber,
  totalQuestions,
  question,
  timeLimit,
  className,
}: IQuestionDisplayProps): React.JSX.Element {
  const hasExamples =
    question.examples !== undefined && question.examples.length > 0;
  const hasTags = question.tags !== undefined && question.tags.length > 0;

  return (
    <div className={cn("container max-w-4xl mx-auto px-6 py-8", className)}>
      {/* Metadata line */}
      <QuestionMetadata
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        type={question.type}
        timeLimit={timeLimit}
        difficulty={question.difficulty}
      />

      {/* Question title */}
      <h1 className="text-3xl font-bold text-foreground mb-4">
        {question.title}
      </h1>

      {/* Description */}
      <p className="text-base text-foreground/90 mb-6 leading-relaxed whitespace-pre-wrap">
        {question.content}
      </p>

      {/* Example (if exists) */}
      {hasExamples && <ExampleDisplay examples={question.examples ?? []} />}

      {/* Tags */}
      {hasTags && (
        <div className="flex flex-wrap gap-2">
          {question.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
