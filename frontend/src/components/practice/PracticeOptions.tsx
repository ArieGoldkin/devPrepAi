import React from "react";

import type { IUserProfile } from "../../store/types";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LoadingSpinner } from "../ui/loading-spinner";

import { BackToProfileButton } from "./BackToProfileButton";
import { FocusAreas } from "./FocusAreas";
import { Technologies } from "./Technologies";

interface IPracticeOptionsProps {
  userProfile: IUserProfile;
  loading: boolean;
  onGenerateQuestions: () => void;
  onEditProfile: () => void;
}

export function PracticeOptions({
  userProfile,
  loading,
  onGenerateQuestions,
  onEditProfile,
}: IPracticeOptionsProps): React.JSX.Element {
  return (
    <>
      <Card variant="feature" className="animate-slide-up">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            Practice questions tailored for {userProfile.roleFocus} roles with{" "}
            {userProfile.experienceLevel} experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FocusAreas interests={[userProfile.interviewType]} />
            <Technologies technologies={userProfile.technologies} />
          </div>

          <div className="pt-4">
            <Button
              onClick={onGenerateQuestions}
              disabled={loading}
              size="lg"
              variant="accent"
              className="w-full"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Generating Questions...
                </>
              ) : (
                "Start Practice Session"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <BackToProfileButton onEditProfile={onEditProfile} />
    </>
  );
}
