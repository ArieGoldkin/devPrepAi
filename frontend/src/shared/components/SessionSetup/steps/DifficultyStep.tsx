import React from 'react';

import type { ISessionSettings } from '@/lib/store/slices/sessionSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';
import { Label } from '@shared/ui/label';
import { Slider } from '@shared/ui/slider';

const DEFAULT_DURATION = 30;

interface IDifficultyStepProps {
  settings: Partial<ISessionSettings>;
  onUpdate: (updates: Partial<ISessionSettings>) => void;
}

export function DifficultyStep({ settings, onUpdate }: IDifficultyStepProps): React.JSX.Element {
  const isTimedMode = settings.mode === "assessment" || settings.mode === "mock-interview";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Difficulty & Questions</CardTitle>
        <CardDescription>
          Customize the challenge level for your session
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Difficulty Level: {settings.difficulty ?? 5}</Label>
          <Slider
            value={[settings.difficulty ?? 5]}
            onValueChange={([value]) => {
              if (typeof value === 'number') {
                onUpdate({ difficulty: value });
              }
            }}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Expert</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Number of Questions: {settings.questionCount ?? 5}</Label>
          <Slider
            value={[settings.questionCount ?? 5]}
            onValueChange={([value]) => {
              if (typeof value === 'number') {
                onUpdate({ questionCount: value });
              }
            }}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        {isTimedMode && (
          <div className="space-y-3">
            <Label>Time Limit: {settings.duration ?? DEFAULT_DURATION} minutes</Label>
            <Slider
              value={[settings.duration ?? DEFAULT_DURATION]}
              onValueChange={([value]) => {
                if (typeof value === 'number') {
                  onUpdate({ duration: value });
                }
              }}
              min={15}
              max={90}
              step={15}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}