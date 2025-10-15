import { Clock, List, Zap, Target } from "lucide-react";
import React from "react";

import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";

import type { PracticeSettings } from "../constants";
import {
  DURATION_OPTIONS,
  QUESTION_COUNT_OPTIONS,
  DIFFICULTY_OPTIONS,
  FOCUS_AREAS,
} from "../constants";

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
      <label className="flex items-center gap-2 text-sm font-semibold text-glow">
        <Clock className="h-4 w-4" />
        Duration
      </label>
      <div className="grid grid-cols-3 gap-2">
        {DURATION_OPTIONS.map((duration) => {
          const isActive = settings.duration === duration;
          return (
            <Button
              key={duration}
              variant="glass"
              size="sm"
              onClick={() => updateSettings({ duration })}
              className={
                isActive
                  ? "bg-gradient-to-br from-[rgba(120,119,198,0.3)] to-[rgba(255,119,198,0.3)] border-[#7877c6] shadow-[0_0_20px_rgba(120,119,198,0.5)] text-white"
                  : ""
              }
            >
              {duration} min
            </Button>
          );
        })}
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
      <label className="flex items-center gap-2 text-sm font-semibold text-glow">
        <List className="h-4 w-4" />
        Questions
      </label>
      <div className="grid grid-cols-4 gap-2">
        {QUESTION_COUNT_OPTIONS.map((count) => {
          const isActive = settings.questionCount === count;
          return (
            <Button
              key={count}
              variant="glass"
              size="sm"
              onClick={() => updateSettings({ questionCount: count })}
              className={
                isActive
                  ? "bg-gradient-to-br from-[rgba(120,119,198,0.3)] to-[rgba(255,119,198,0.3)] border-[#7877c6] shadow-[0_0_20px_rgba(120,119,198,0.5)] text-white"
                  : ""
              }
            >
              {count}
            </Button>
          );
        })}
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
      <label className="flex items-center gap-2 text-sm font-semibold text-glow">
        <Zap className="h-4 w-4" />
        Difficulty
      </label>
      <div className="grid grid-cols-3 gap-2">
        {DIFFICULTY_OPTIONS.map((level) => {
          const isActive = settings.difficulty === level;
          return (
            <Button
              key={level}
              variant="glass"
              size="sm"
              onClick={() => updateSettings({ difficulty: level })}
              className={`capitalize ${
                isActive
                  ? "bg-gradient-to-br from-[rgba(120,119,198,0.3)] to-[rgba(255,119,198,0.3)] border-[#7877c6] shadow-[0_0_20px_rgba(120,119,198,0.5)] text-white"
                  : ""
              }`}
            >
              {level === "easy" && "🟢"}
              {level === "medium" && "🟡"}
              {level === "hard" && "🔴"}
              <span className="ml-1">{level}</span>
            </Button>
          );
        })}
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
      <label className="flex items-center gap-2 text-sm font-semibold text-glow">
        <Target className="h-4 w-4" />
        Focus Areas
      </label>
      <div className="flex flex-wrap gap-2">
        {FOCUS_AREAS.map((area) => {
          const isSelected: boolean = settings.focusAreas.includes(area);
          return (
            <Badge
              key={area}
              variant="glass"
              className={`cursor-pointer ${
                isSelected
                  ? "bg-[rgba(120,119,198,0.2)] border-[#7877c6] shadow-[0_0_15px_rgba(120,119,198,0.5)] text-white"
                  : ""
              }`}
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
