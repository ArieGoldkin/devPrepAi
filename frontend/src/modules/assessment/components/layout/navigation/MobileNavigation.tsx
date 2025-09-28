"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@/shared/ui/button";

interface IMobileNavigationProps {
  onNavigate?: (direction: "next" | "previous") => void;
  onSubmit: () => void;
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
}

export function MobileNavigation({
  onNavigate,
  onSubmit,
  isFirstQuestion = false,
  isLastQuestion = false,
}: IMobileNavigationProps): React.JSX.Element {
  return (
    <div className="flex gap-2 p-4 border-t bg-background">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onNavigate?.("previous")}
        disabled={isFirstQuestion}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      <Button
        className="flex-1"
        onClick={onSubmit}
      >
        {isLastQuestion ? "Submit Assessment" : "Submit Answer"}
      </Button>
      {!isLastQuestion && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.("next")}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  );
}