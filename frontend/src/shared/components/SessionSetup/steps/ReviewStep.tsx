import React from 'react';

import type { ISessionSettings } from '@/lib/store/slices/sessionSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';

import { MODES } from '../constants';

interface IReviewStepProps {
  settings: Partial<ISessionSettings>;
}

export function ReviewStep({ settings }: IReviewStepProps): React.JSX.Element {
  const modeLabel = MODES.find((m) => m.value === settings.mode)?.label;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ready to Start!</CardTitle>
        <CardDescription>
          Review your session configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Mode</span>
            <span className="text-sm font-medium">{modeLabel}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Questions</span>
            <span className="text-sm font-medium">{settings.questionCount}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-muted-foreground">Difficulty</span>
            <span className="text-sm font-medium">{settings.difficulty}/10</span>
          </div>
          {settings.duration !== undefined && settings.duration > 0 && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Time Limit</span>
              <span className="text-sm font-medium">{settings.duration} minutes</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}