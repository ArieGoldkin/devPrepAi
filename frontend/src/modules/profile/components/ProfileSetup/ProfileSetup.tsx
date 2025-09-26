"use client";

import type * as React from "react";
import { useState } from "react";

import type {
  IUserProfile,
  InterviewType,
  RoleFocus,
  CompanySize,
} from "@/types/ai";
import { useAppStore } from "@lib/store/useAppStore";
import { Button } from "@shared/ui/button";

import {
  ExperienceSelector,
  YearsExperienceInput,
  RoleFocusSelector,
  CompanySizeSelector,
  InterviewExperienceSelector,
} from "./profile-wizard";

interface IProfileSetupProps {
  onComplete?: () => void;
  selectedInterviewType: InterviewType | null;
}

export function ProfileSetup({
  onComplete,
  selectedInterviewType,
}: IProfileSetupProps): React.JSX.Element {
  const { userProfile, setUserProfile } = useAppStore();
  const [experience, setExperience] = useState(
    userProfile?.experienceLevel || "",
  );
  const [yearsOfExperience, setYearsOfExperience] = useState(
    userProfile?.yearsOfExperience ?? 0,
  );
  const [roleFocus, setRoleFocus] = useState(userProfile?.roleFocus || "");
  const [companySize, setCompanySize] = useState(
    userProfile?.companySizePreference || "",
  );
  const [interviewExperience, setInterviewExperience] = useState(
    userProfile?.previousInterviewExperience || "",
  );

  const handleSubmit = (): void => {
    if (
      experience &&
      roleFocus &&
      companySize &&
      interviewExperience &&
      selectedInterviewType
    ) {
      const profile: IUserProfile = {
        experienceLevel: experience as "junior" | "mid" | "senior",
        yearsOfExperience,
        technologies: userProfile?.technologies || [], // Keep existing technologies or empty array
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
      roleFocus &&
      companySize &&
      interviewExperience &&
      selectedInterviewType,
  );

  return (
    <div className="space-y-6">
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

      <Button
        onClick={handleSubmit}
        disabled={!isFormValid}
        variant="accent"
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}
