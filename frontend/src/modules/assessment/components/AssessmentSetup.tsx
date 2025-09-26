"use client";
import type * as React from "react";
import { useState } from "react";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Select } from "@shared/ui/select";

const DEFAULT_TIMER_DURATION = 30;
const DEFAULT_QUESTION_COUNT = 10;

export interface IAssessmentSettings {
  timerDuration: number;
  questionCount: number;
  difficultyLevel: string;
}

interface IAssessmentSetupProps {
  onComplete: (settings: IAssessmentSettings) => void;
  onBack: () => void;
}

const TimerSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}): React.JSX.Element => (
  <div>
    <label className="block text-body font-medium mb-2">Timer Duration</label>
    <Select
      value={value.toString()}
      onChange={(e): void => onChange(parseInt(e.target.value, 10))}
      placeholder="Select duration"
    >
      <option value="15">15 minutes</option>
      <option value="30">30 minutes</option>
      <option value="45">45 minutes</option>
      <option value="60">60 minutes</option>
    </Select>
  </div>
);

const QuestionCountSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}): React.JSX.Element => (
  <div>
    <label className="block text-body font-medium mb-2">
      Number of Questions
    </label>
    <Select
      value={value.toString()}
      onChange={(e): void => onChange(parseInt(e.target.value, 10))}
      placeholder="Select count"
    >
      <option value="5">5 questions</option>
      <option value="10">10 questions</option>
      <option value="15">15 questions</option>
    </Select>
  </div>
);

const DifficultySelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => (
  <div>
    <label className="block text-body font-medium mb-2">Difficulty Level</label>
    <Select
      value={value}
      onChange={(e): void => onChange(e.target.value)}
      placeholder="Select difficulty"
    >
      <option value="junior">Junior</option>
      <option value="mid">Mid-level</option>
      <option value="senior">Senior</option>
    </Select>
  </div>
);

const saveToStorage = (settings: IAssessmentSettings): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "devprep-assessment-settings",
      JSON.stringify(settings),
    );
  }
};

const navigate = (): void => {
  if (typeof window !== "undefined") {
    window.location.href = "/assessment";
  }
};

export function AssessmentSetup({
  onComplete,
  onBack,
}: IAssessmentSetupProps): React.JSX.Element {
  const [timerDuration, setTimerDuration] = useState<number>(
    DEFAULT_TIMER_DURATION,
  );
  const [questionCount, setQuestionCount] = useState<number>(
    DEFAULT_QUESTION_COUNT,
  );
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");

  const handleSubmit = (): void => {
    if (timerDuration && questionCount && difficultyLevel) {
      const settings: IAssessmentSettings = {
        timerDuration,
        questionCount,
        difficultyLevel,
      };
      saveToStorage(settings);
      onComplete(settings);
      navigate();
    }
  };

  const isFormValid = Boolean(
    timerDuration && questionCount && difficultyLevel,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-display text-gray-900 mb-2">Assessment Setup</h1>
        <p className="text-subtitle text-gray-600">
          Configure your timed assessment settings
        </p>
      </div>

      <Card
        variant="elevated"
        className="w-full max-w-md mx-auto animate-slide-up"
      >
        <CardHeader>
          <CardTitle>Assessment Configuration</CardTitle>
          <CardDescription>Set up your timed coding assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TimerSelector value={timerDuration} onChange={setTimerDuration} />
          <QuestionCountSelector
            value={questionCount}
            onChange={setQuestionCount}
          />
          <DifficultySelector
            value={difficultyLevel}
            onChange={setDifficultyLevel}
          />

          <div className="pt-4 space-y-2">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              variant="accent"
              className="w-full"
            >
              Start Assessment
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full">
              Back to Main
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AssessmentSetup;
