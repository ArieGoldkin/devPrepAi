"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@/shared/ui/button";

interface IDesktopNavigationProps {
  onNavigate?: (direction: "next" | "previous") => void;
  onSubmit: () => void;
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
}

export function DesktopNavigation({
  onNavigate,
  onSubmit,
  isFirstQuestion = false,
  isLastQuestion = false,
}: IDesktopNavigationProps): React.JSX.Element {
  return (
    <div className="flex justify-between items-center p-4 border-t bg-background">
      <Button
        variant="outline"
        onClick={() => onNavigate?.("previous")}
        disabled={isFirstQuestion}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={onSubmit}
        >
          {isLastQuestion ? "Submit Assessment" : "Submit Answer"}
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={() => onNavigate?.("next")}
        disabled={isLastQuestion}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}