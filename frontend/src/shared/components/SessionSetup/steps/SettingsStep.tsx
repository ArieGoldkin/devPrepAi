import React from 'react';

import type { ISessionSettings } from '@/lib/store/slices/sessionSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';
import { Label } from '@shared/ui/label';
import { Switch } from '@shared/ui/switch';

interface ISettingsStepProps {
  settings: Partial<ISessionSettings>;
  onUpdate: (updates: Partial<ISessionSettings>) => void;
}

export function SettingsStep({ settings, onUpdate }: ISettingsStepProps): React.JSX.Element {
  const isPracticeMode = settings.mode === "practice";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Settings</CardTitle>
        <CardDescription>
          Fine-tune your session preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPracticeMode && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="hints">Allow Hints</Label>
              <Switch
                id="hints"
                checked={Boolean(settings.allowHints)}
                onCheckedChange={(checked) =>
                  onUpdate({ allowHints: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="skip">Allow Skipping Questions</Label>
              <Switch
                id="skip"
                checked={Boolean(settings.allowSkip)}
                onCheckedChange={(checked) =>
                  onUpdate({ allowSkip: checked })
                }
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="autosave">Auto-save Answers</Label>
          <Switch
            id="autosave"
            checked={Boolean(settings.autoSave)}
            onCheckedChange={(checked) =>
              onUpdate({ autoSave: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="timer">Show Timer</Label>
          <Switch
            id="timer"
            checked={Boolean(settings.showTimer)}
            onCheckedChange={(checked) =>
              onUpdate({ showTimer: checked })
            }
          />
        </div>

        {!isPracticeMode && (
          <div className="flex items-center justify-between">
            <Label htmlFor="autosubmit">
              Auto-submit When Time Expires
            </Label>
            <Switch
              id="autosubmit"
              checked={Boolean(settings.autoSubmit)}
              onCheckedChange={(checked) =>
                onUpdate({ autoSubmit: checked })
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}