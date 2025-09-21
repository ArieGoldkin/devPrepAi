import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import type { PracticeSettings } from "./constants";
import {
  DurationSettings,
  QuestionCountSettings,
  DifficultySettings,
  FocusAreaSettings,
} from "./SettingsHelpers";

interface ISettingsStepProps {
  settings: PracticeSettings;
  onSettingsChange: (settings: PracticeSettings) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SettingsStep({
  settings,
  onSettingsChange,
  onNext,
  onBack,
}: ISettingsStepProps): React.JSX.Element {
  const updateSettings = (updates: Partial<PracticeSettings>): void => {
    onSettingsChange({ ...settings, ...updates });
  };

  return (
    <Card className="card-feature max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Practice Settings
        </CardTitle>
        <CardDescription>
          Customize your practice session preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DurationSettings settings={settings} updateSettings={updateSettings} />
        <QuestionCountSettings
          settings={settings}
          updateSettings={updateSettings}
        />
        <DifficultySettings
          settings={settings}
          updateSettings={updateSettings}
        />
        <FocusAreaSettings
          settings={settings}
          updateSettings={updateSettings}
        />

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="accent" onClick={onNext}>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
