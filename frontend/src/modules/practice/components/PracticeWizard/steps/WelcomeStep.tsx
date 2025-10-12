import { User, Briefcase, Code2, ChevronRight, Check } from "lucide-react";
import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import Logo from "@shared/ui/logo";
import { cn } from "@shared/utils/cn";

interface IWelcomeStepProps {
  onNext: (selectedInterviewType: InterviewType) => void;
}

export function WelcomeStep({ onNext }: IWelcomeStepProps): React.JSX.Element {
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);

  const practiceTypes = [
    {
      id: "coding",
      icon: Code2,
      label: "Coding Questions",
      description: "Algorithm & data structure challenges",
    },
    {
      id: "system-design",
      icon: Briefcase,
      label: "System Design",
      description: "Architecture & scalability problems",
    },
    {
      id: "behavioral",
      icon: User,
      label: "Behavioral",
      description: "Situational & leadership questions",
    },
  ];

  const handleNext = (): void => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <Card className="glass-card-static fade-in max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Logo size="lg" variant="gradient" showText={false} />
        </div>
        <CardTitle className="text-headline gradient-text">
          Welcome to Practice Mode
        </CardTitle>
        <CardDescription className="text-subtitle text-muted-foreground">
          Choose your interview type to get started with personalized practice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {practiceTypes.map((type) => {
            const isSelected = selectedType === type.id;
            const Icon = type.icon;

            return (
              <Card
                key={type.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  isSelected
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                    : "hover:border-primary/50",
                )}
                onClick={() => setSelectedType(type.id as InterviewType)}
              >
                <CardContent className="pt-6 text-center">
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">{type.label}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!selectedType}
            className="btn-primary-glass min-w-[200px]"
          >
            {selectedType ? "Continue" : "Select Interview Type"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
