import { Settings } from "lucide-react";
import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import {
  DurationSettings,
  QuestionCountSettings,
  DifficultySettings,
  FocusAreaSettings,
} from "@modules/practice/components/PracticeWizard/components/SettingsHelpers";
import type { PracticeSettings } from "@modules/practice/components/PracticeWizard/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useAppStore } from "@store";

import { StatsPreview } from "./StatsPreview";
import { TechnologySelector } from "./TechnologySelector";

interface ICompleteSetupStepProps {
  settings: PracticeSettings;
  onSettingsChange: (settings: PracticeSettings) => void;
  selectedInterviewType: InterviewType | null;
  selectedTechnologies: string[];
  onTechnologiesChange: (technologies: string[]) => void;
}

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
    <Card className="glass-card-static fade-in w-[80vw] max-w-[1400px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <Settings className="h-5 w-5 icon-glow" />
          Complete Setup
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your practice session for {selectedInterviewType} questions
        </p>
      </CardHeader>
      <CardContent>
        <div className="split-container">
          {/* Left Column: Settings */}
          <div className="split-column">
            <DurationSettings
              settings={settings}
              updateSettings={updateSettings}
            />
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

          {/* Right Column: Technologies + Stats */}
          <div className="split-column">
            <TechnologySelector selectedTechs={techs} onToggle={toggleTech} />
            <StatsPreview settings={settings} selectedTechs={techs} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
