import React from "react";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

interface IProfilePromptProps {
  onSetupClick: () => void;
}

export function ProfilePrompt({
  onSetupClick,
}: IProfilePromptProps): React.JSX.Element {
  return (
    <Card variant="feature" className="animate-slide-up">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          We need some information about your background to generate
          personalized practice questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onSetupClick} variant="accent">
          Set Up Profile
        </Button>
      </CardContent>
    </Card>
  );
}
