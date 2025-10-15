"use client";

import React from "react";

import {
  ConstraintsSection,
  ExamplesSection,
  QuestionCard,
  QuestionContent,
  QuestionHeader,
  QuestionPanel,
  SplitScreenContainer,
} from "@/modules/assessment/components";
import { sampleQuestions } from "@/shared/mocks/sampleQuestions";

export default function AssessmentTestPage() {
  // Use the first question with complete mock data (constraints, examples, etc.)
  const question = sampleQuestions[0];
  const questionNumber = 1;

  if (!question) {
    return <div className="p-8 text-white">No sample questions available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <h1 className="text-2xl font-bold text-white mb-4 px-2">
        DATABASE 1: Split Screen & Question Display
      </h1>

      <SplitScreenContainer
        questionPanel={
          <QuestionPanel>
            <QuestionCard question={question} questionNumber={questionNumber}>
              <QuestionHeader
                questionNumber={questionNumber}
                difficulty={question.difficulty}
              />
              <QuestionContent
                title={question.title}
                content={question.content}
              />
              {question.constraints && (
                <ConstraintsSection constraints={question.constraints} />
              )}
              {question.examples && (
                <ExamplesSection examples={question.examples} />
              )}
            </QuestionCard>
          </QuestionPanel>
        }
        answerPanel={
          <div className="rounded-xl p-6 backdrop-blur-[20px] border shadow-lg bg-[rgba(20,15,40,0.85)] border-[rgba(120,119,198,0.3)] h-full flex items-center justify-center">
            <p className="text-gray-400 text-center">
              Answer Panel (Tasks 4.1-4.13)
              <br />
              Will be implemented in DATABASE 3
            </p>
          </div>
        }
      />
    </div>
  );
}
