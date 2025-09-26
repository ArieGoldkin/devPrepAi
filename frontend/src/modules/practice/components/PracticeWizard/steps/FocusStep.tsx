import { Target, ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import { useAppStore } from "@lib/store/useAppStore";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

import { TECHNOLOGY_OPTIONS } from "../constants";

interface IFocusStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedInterviewType: InterviewType | null;
  onTechnologiesChange: (technologies: string[]) => void;
  selectedTechnologies: string[];
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
  <div>
    <label className="block text-body font-medium mb-2">
      Technologies (select all that apply)
    </label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
      {ALL_TECHNOLOGIES.map((tech) => (
        <label key={tech} className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={selectedTechs.includes(tech)}
            onChange={(): void => onToggle(tech)}
            className="rounded"
          />
          <span className="text-body">{tech}</span>
        </label>
      ))}
    </div>
  </div>
);

export function FocusStep({
  onNext,
  onBack,
  selectedInterviewType,
  onTechnologiesChange,
  selectedTechnologies,
}: IFocusStepProps): React.JSX.Element {
  const { userProfile, setUserProfile } = useAppStore();
  const [techs, setTechs] = useState<string[]>(
    selectedTechnologies.length > 0
      ? selectedTechnologies
      : userProfile?.technologies || [],
  );

  const toggleTech = (tech: string): void => {
    const updatedTechs = techs.includes(tech)
      ? techs.filter((t) => t !== tech)
      : [...techs, tech];
    setTechs(updatedTechs);
    onTechnologiesChange(updatedTechs);
  };

  const handleNext = (): void => {
    if (techs.length > 0 && userProfile) {
      // Update user profile with selected technologies
      const updatedProfile = {
        ...userProfile,
        technologies: techs,
      };
      setUserProfile(updatedProfile);
      onNext();
    }
  };

  const isFormValid = techs.length > 0;

  return (
    <Card className="card-feature max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Focus & Technologies
        </CardTitle>
        <CardDescription>
          Select technologies and areas you want to practice for{" "}
          {selectedInterviewType} questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TechnologySelector selectedTechs={techs} onToggle={toggleTech} />
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!isFormValid} variant="accent">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
