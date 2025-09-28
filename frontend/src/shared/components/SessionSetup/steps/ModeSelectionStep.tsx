import React from 'react';

import type { SessionMode, ISessionSettings } from '@/lib/store/slices/sessionSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';
import { Label } from '@shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@shared/ui/radio-group';

import { MODES } from '../constants';

interface IModeSelectionStepProps {
  settings: Partial<ISessionSettings>;
  onUpdate: (updates: Partial<ISessionSettings>) => void;
}

export function ModeSelectionStep({ settings, onUpdate }: IModeSelectionStepProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Session Mode</CardTitle>
        <CardDescription>
          Select how you want to practice today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={settings.mode || "practice"}
          onValueChange={(value) => {
            const updates: Partial<ISessionSettings> = {
              mode: value as SessionMode,
              allowHints: value === "practice",
              allowSkip: value === "practice",
              showTimer: value !== "practice",
              autoSubmit: value === "mock-interview",
            };

            if (value === "assessment") {
              updates.duration = 30;
            } else if (value === "mock-interview") {
              updates.duration = 45;
            }

            onUpdate(updates);
          }}
        >
          <div className="space-y-4">
            {MODES.map((mode) => (
              <div
                key={mode.value}
                className="relative rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem
                  value={mode.value}
                  id={mode.value}
                  className="absolute top-4 right-4"
                />
                <Label
                  htmlFor={mode.value}
                  className="flex flex-col space-y-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {mode.icon}
                    <div>
                      <div className="font-semibold">{mode.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {mode.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mode.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}