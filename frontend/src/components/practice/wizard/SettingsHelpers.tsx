import { Timer } from "lucide-react";
import React from "react";

import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";

import type { PracticeSettings } from "./constants";
import {
  DURATION_OPTIONS,
  QUESTION_COUNT_OPTIONS,
  DIFFICULTY_OPTIONS,
  FOCUS_AREAS,
} from "./constants";

interface ISettingsHelperProps {
  settings: PracticeSettings;
  updateSettings: (updates: Partial<PracticeSettings>) => void;
}

export function DurationSettings({
  settings,
  updateSettings,
}: ISettingsHelperProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Session Duration</label>
      <div className="grid grid-cols-3 gap-2">
        {DURATION_OPTIONS.map((duration) => (
          <Button
            key={duration}
            variant={settings.duration === duration ? "default" : "outline"}
            size="sm"
            onClick={() => updateSettings({ duration })}
          >
            <Timer className="mr-1 h-3 w-3" />
            {duration} min
          </Button>
        ))}
      </div>
    </div>
  );
}

export function QuestionCountSettings({
  settings,
  updateSettings,
}: ISettingsHelperProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Number of Questions</label>
      <div className="grid grid-cols-4 gap-2">
        {QUESTION_COUNT_OPTIONS.map((count) => (
          <Button
            key={count}
            variant={settings.questionCount === count ? "default" : "outline"}
            size="sm"
            onClick={() => updateSettings({ questionCount: count })}
          >
            {count}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function DifficultySettings({
  settings,
  updateSettings,
}: ISettingsHelperProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Difficulty Level</label>
      <div className="grid grid-cols-3 gap-2">
        {DIFFICULTY_OPTIONS.map((level) => (
          <Button
            key={level}
            variant={settings.difficulty === level ? "default" : "outline"}
            size="sm"
            onClick={() => updateSettings({ difficulty: level })}
            className="capitalize"
          >
            {level === "easy" && "🟢"}
            {level === "medium" && "🟡"}
            {level === "hard" && "🔴"}
            <span className="ml-1">{level}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export function FocusAreaSettings({
  settings,
  updateSettings,
}: ISettingsHelperProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Focus Areas</label>
      <div className="flex flex-wrap gap-2">
        {FOCUS_AREAS.map((area) => {
          const isSelected = settings.focusAreas.includes(area);
          return (
            <Badge
              key={area}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => {
                const newFocusAreas = isSelected
                  ? settings.focusAreas.filter((a) => a !== area)
                  : [...settings.focusAreas, area];
                updateSettings({ focusAreas: newFocusAreas });
              }}
            >
              {area}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
