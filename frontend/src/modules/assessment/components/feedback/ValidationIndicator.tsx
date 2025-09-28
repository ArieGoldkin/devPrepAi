import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import React from "react";

import { Badge } from "@shared/ui/badge";

import type { ValidationStatus } from "./utils/validationUtils";

interface IValidationIndicatorProps {
  status: ValidationStatus;
  questionType: "behavioral" | "system-design" | "coding" | "conceptual";
}

export function ValidationIndicator({
  status,
  questionType,
}: IValidationIndicatorProps): React.JSX.Element {
  const getValidationIcon = (): React.JSX.Element => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "invalid":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "empty":
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getValidationText = (): string => {
    switch (status) {
      case "valid":
        return "Answer looks good";
      case "invalid":
        return getInvalidMessage();
      case "empty":
      default:
        return "Start typing your answer";
    }
  };

  const getInvalidMessage = (): string => {
    switch (questionType) {
      case "coding":
        return "Add code structure or logic";
      case "system-design":
        return "Include system components";
      case "behavioral":
        return "Use STAR method (Situation, Task, Action, Result)";
      default:
        return "Add more detail to your answer";
    }
  };

  const getValidationColor = (): string => {
    switch (status) {
      case "valid":
        return "bg-green-50 text-green-700 border-green-200";
      case "invalid":
        return "bg-red-50 text-red-700 border-red-200";
      case "empty":
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-2 px-3 py-1 ${getValidationColor()}`}
    >
      {getValidationIcon()}
      <span className="text-sm font-medium">{getValidationText()}</span>
    </Badge>
  );
}