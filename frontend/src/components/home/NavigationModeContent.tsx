"use client";

import { ArrowRight, LogOut } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { useAppStore } from "../../store/useAppStore";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

export interface INavigationModeContentProps {
  mode: "default" | "practice" | "assessment" | "results";
  onExitAssessment: () => void;
}

export function NavigationModeContent({
  mode,
  onExitAssessment,
}: INavigationModeContentProps): ReactElement | null {
  const { isActive, currentQuestionIndex, questions } = useAppStore();

  switch (mode) {
    case "practice":
      return (
        <Badge
          variant="outline"
          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
        >
          Practice Mode
        </Badge>
      );

    case "assessment":
      return (
        <div className="flex items-center gap-4">
          {isActive && questions.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Progress: {currentQuestionIndex + 1}/{questions.length}
              </span>
              <Progress
                value={((currentQuestionIndex + 1) / questions.length) * 100}
                className="w-24 h-2"
              />
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExitAssessment}
            className="text-xs"
          >
            <LogOut className="mr-1 h-3 w-3" />
            Exit Assessment
          </Button>
        </div>
      );

    case "results":
      return (
        <Badge
          variant="outline"
          className="text-xs bg-green-50 text-green-700 border-green-200"
        >
          Results
        </Badge>
      );

    default:
      return null;
  }
}

export function NavigationActionButton({
  mode,
}: {
  mode: string;
}): ReactElement | null {
  switch (mode) {
    case "results":
      return (
        <Link href="/practice">
          <Button variant="accent" size="sm" className="hidden sm:flex">
            Try Again <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      );

    case "assessment":
      return null; // No action button in assessment mode

    default:
      return (
        <Link href="/practice">
          <Button variant="accent" size="sm" className="hidden sm:flex">
            Get Started <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      );
  }
}
