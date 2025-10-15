import { User } from "lucide-react";
import React from "react";

import type { InterviewType } from "@/types/ai";
import { ProfileSetup } from "@modules/profile/components/ProfileSetup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

interface IProfileStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedInterviewType: InterviewType | null;
}

export function ProfileStep({
  onNext,
  selectedInterviewType,
}: IProfileStepProps): React.JSX.Element {
  return (
    <Card className="glass-card-static fade-in max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 gradient-text">
          <User className="h-5 w-5 icon-glow" />
          Setup Your Profile
        </CardTitle>
        <CardDescription>
          Tell us about your background to personalize your practice session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileSetup
          onComplete={onNext}
          selectedInterviewType={selectedInterviewType}
        />
      </CardContent>
    </Card>
  );
}
