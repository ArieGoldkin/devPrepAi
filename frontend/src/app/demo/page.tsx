"use client";

import React, { useState } from "react";

import { Timer } from "@modules/assessment/components/Timer";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { sampleQuestions } from "@shared/mocks/sampleQuestions";
import { AnswerInput } from "@shared/ui/AnswerInput";
import { Button } from "@shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@shared/ui/card";
import { QuestionCard } from "@shared/ui/QuestionCard";

export default function DemoPage(): React.JSX.Element {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1;

  const handleAnswerChange = (questionId: string, answer: string): void => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = (): void => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = (): void => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const progressPercentage = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Demo Assessment</h1>
          <p className="text-gray-600">
            Experience our assessment platform with sample questions. This is a
            preview of the full assessment experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Question {currentQuestionIndex + 1} of {sampleQuestions.length}
              </h2>
              <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <Timer className="text-lg" />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Demo Mode</CardTitle>
              <CardDescription>
                This is a demonstration. Your answers will not be saved or
                evaluated.
              </CardDescription>
            </CardHeader>
          </Card>

          {currentQuestion && (
            <div className="space-y-6">
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={sampleQuestions.length}
                showDifficulty={true}
                showTags={true}
                showExamples={true}
              />
              <AnswerInput
                question={currentQuestion}
                value={answers[currentQuestion.id] || ""}
                onChange={(answer: string) =>
                  handleAnswerChange(currentQuestion.id, answer)
                }
                placeholder="Enter your answer here..."
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            <div className="space-x-2">
              <Button onClick={handleReset} variant="outline">
                Reset Demo
              </Button>

              {isLastQuestion ? (
                <Button onClick={handleReset}>Restart Demo</Button>
              ) : (
                <Button onClick={handleNext}>Next Question</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
