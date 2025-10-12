import { Settings, Target, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Label } from "@shared/ui/label";
import { Separator } from "@shared/ui/separator";
import { useAppStore } from "@store";

import {
  DurationSettings,
  QuestionCountSettings,
  DifficultySettings,
  FocusAreaSettings,
} from "../components/SettingsHelpers";
import type { PracticeSettings } from "../constants";
import { TECHNOLOGY_OPTIONS } from "../constants";

interface ICompleteSetupStepProps {
  settings: PracticeSettings;
  onSettingsChange: (settings: PracticeSettings) => void;
  selectedInterviewType: InterviewType | null;
  selectedTechnologies: string[];
  onTechnologiesChange: (technologies: string[]) => void;
}

// Flatten all technologies into a single array
const ALL_TECHNOLOGIES = Object.values(TECHNOLOGY_OPTIONS).flat();

const TechnologySelector = ({
  selectedTechs,
  onToggle,
}: {
  selectedTechs: string[];
  onToggle: (tech: string) => void;
}): React.JSX.Element => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      <Target className="h-4 w-4" />
      Technologies
    </Label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 glass-surface rounded-lg">
      {ALL_TECHNOLOGIES.map((tech) => {
        const isSelected = selectedTechs.includes(tech);
        return (
          <label
            key={tech}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer
              ${isSelected ? "bg-primary/20 text-primary" : ""}
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(tech)}
              className="rounded"
            />
            <span className="text-sm">{tech}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const StatsPreview = ({
  settings,
  selectedTechs,
}: {
  settings: PracticeSettings;
  selectedTechs: string[];
}): React.JSX.Element => (
  <div className="glass-card p-4 space-y-3">
    <div className="flex items-center gap-2 text-sm font-medium">
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <span>Configuration Summary</span>
    </div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <span className="text-muted-foreground">Duration:</span>
        <span className="ml-2 font-medium">{settings.duration} min</span>
      </div>
      <div>
        <span className="text-muted-foreground">Questions:</span>
        <span className="ml-2 font-medium">{settings.questionCount}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Difficulty:</span>
        <Badge variant="outline" className="ml-2 capitalize">
          {settings.difficulty === "easy" && "🟢"}
          {settings.difficulty === "medium" && "🟡"}
          {settings.difficulty === "hard" && "🔴"}
          <span className="ml-1">{settings.difficulty}</span>
        </Badge>
      </div>
      <div>
        <span className="text-muted-foreground">Focus Areas:</span>
        <span className="ml-2 font-medium">{settings.focusAreas.length}</span>
      </div>
    </div>
    {selectedTechs.length > 0 && (
      <div>
        <span className="text-muted-foreground text-sm">Technologies:</span>
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTechs.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {selectedTechs.length > 5 && (
            <Badge variant="secondary" className="text-xs">
              +{selectedTechs.length - 5} more
            </Badge>
          )}
        </div>
      </div>
    )}
  </div>
);

export function CompleteSetupStep({
  settings,
  onSettingsChange,
  selectedInterviewType,
  selectedTechnologies,
  onTechnologiesChange,
}: ICompleteSetupStepProps): React.JSX.Element {
  const { userProfile, setUserProfile } = useAppStore();
  const [techs, setTechs] = useState<string[]>(
    selectedTechnologies.length > 0
      ? selectedTechnologies
      : userProfile?.technologies || [],
  );

  const updateSettings = (updates: Partial<PracticeSettings>): void => {
    onSettingsChange({ ...settings, ...updates });
  };

  const toggleTech = (tech: string): void => {
    const updatedTechs = techs.includes(tech)
      ? techs.filter((t) => t !== tech)
      : [...techs, tech];
    setTechs(updatedTechs);
    onTechnologiesChange(updatedTechs);

    // Update user profile with selected technologies
    if (userProfile) {
      setUserProfile({ ...userProfile, technologies: updatedTechs });
    }
  };

  return (
    <Card className="glass-card fade-in max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Settings className="h-5 w-5 icon-glow" />
          Complete Setup
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your practice session for {selectedInterviewType} questions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings Section */}
        <div className="space-y-4">
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
        </div>

        <Separator />

        {/* Technology Selection */}
        <TechnologySelector selectedTechs={techs} onToggle={toggleTech} />

        <Separator />

        {/* Stats Preview */}
        <StatsPreview settings={settings} selectedTechs={techs} />
      </CardContent>
    </Card>
  );
}
