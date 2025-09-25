import { User, ChevronLeft } from "lucide-react";
import React from "react";

import type { InterviewType } from "@/types/ai";
import { ProfileSetup } from "@components/features/profile/ProfileSetup";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

interface IProfileStepProps {
  onNext: () => void;
  onBack: () => void;
  selectedInterviewType: InterviewType | null;
}

export function ProfileStep({
  onNext,
  onBack,
  selectedInterviewType,
}: IProfileStepProps): React.JSX.Element {
  return (
    <Card className="card-feature max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
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

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
