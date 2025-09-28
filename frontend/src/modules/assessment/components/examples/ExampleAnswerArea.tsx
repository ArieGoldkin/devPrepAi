"use client";

import React from "react";

import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Textarea } from "@shared/ui/textarea";

interface IExampleAnswerAreaProps {
  userAnswer: string;
  isSubmitted: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onAutoSave: (answer: string) => void;
}

export function ExampleAnswerArea({
  userAnswer,
  isSubmitted,
  onAnswerChange,
  onSubmit,
  onAutoSave,
}: IExampleAnswerAreaProps): React.JSX.Element {
  const handleChange = (value: string): void => {
    onAnswerChange(value);
    // Simulate auto-save after typing
    if (value.length > 10) {
      onAutoSave(value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Answer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-[200px] resize-y"
          disabled={isSubmitted}
        />
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {userAnswer.length} characters
            {userAnswer.length > 10 && (
              <span className="ml-2 text-green-600">• Auto-saved</span>
            )}
          </div>
          
          <Button
            onClick={onSubmit}
            disabled={userAnswer.trim().length === 0 || isSubmitted}
            variant={isSubmitted ? "outline" : "default"}
          >
            {isSubmitted ? "Submitted" : "Submit Answer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
