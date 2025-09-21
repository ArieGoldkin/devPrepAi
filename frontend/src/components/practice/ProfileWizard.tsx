"use client";

import type * as React from "react";
import { useState } from "react";

import { useAppStore } from "../../store/useAppStore";
import type {
  CompanySize,
  InterviewType,
  IUserProfile,
  RoleFocus,
} from "../../types/ai";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  CompanySizeSelector,
  ExperienceSelector,
  InterviewExperienceSelector,
  RoleFocusSelector,
  TechnologySelector,
  YearsExperienceInput,
} from "./profile-wizard";

interface IProfileWizardProps {
  onComplete?: () => void;
  selectedInterviewType: InterviewType | null;
}

export function ProfileWizard({
  onComplete,
  selectedInterviewType,
}: IProfileWizardProps): React.JSX.Element {
  const { setUserProfile } = useAppStore();
  const [experience, setExperience] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [techs, setTechs] = useState<string[]>([]);
  const [roleFocus, setRoleFocus] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [interviewExperience, setInterviewExperience] = useState("");

  const toggleTech = (tech: string): void => {
    setTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const handleSubmit = (): void => {
    if (
      experience &&
      techs.length > 0 &&
      roleFocus &&
      companySize &&
      interviewExperience &&
      selectedInterviewType
    ) {
      const profile: IUserProfile = {
        experienceLevel: experience as "junior" | "mid" | "senior",
        yearsOfExperience,
        technologies: techs,
        roleFocus: roleFocus as RoleFocus,
        interviewType: selectedInterviewType,
        companySizePreference: companySize as CompanySize,
        previousInterviewExperience: interviewExperience as
          | "none"
          | "some"
          | "extensive",
      };
      setUserProfile(profile);
      onComplete?.();
    }
  };

  const isFormValid = Boolean(
    experience &&
      techs.length > 0 &&
      roleFocus &&
      companySize &&
      interviewExperience &&
      selectedInterviewType,
  );

  return (
    <Card
      variant="elevated"
      className="w-full max-w-2xl mx-auto animate-slide-up"
    >
      <CardHeader>
        <CardTitle>Setup Profile</CardTitle>
        <CardDescription>
          Configure your interview practice for {selectedInterviewType}{" "}
          questions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <ExperienceSelector value={experience} onChange={setExperience} />
          <YearsExperienceInput
            value={yearsOfExperience}
            onChange={setYearsOfExperience}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <RoleFocusSelector value={roleFocus} onChange={setRoleFocus} />
          <CompanySizeSelector value={companySize} onChange={setCompanySize} />
        </div>
        <InterviewExperienceSelector
          value={interviewExperience}
          onChange={setInterviewExperience}
        />
        <TechnologySelector selectedTechs={techs} onToggle={toggleTech} />
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          variant="accent"
          className="w-full"
        >
          Complete Setup
        </Button>
      </CardContent>
    </Card>
  );
}
