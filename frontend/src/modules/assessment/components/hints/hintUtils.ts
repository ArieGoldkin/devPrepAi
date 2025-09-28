import { Lightbulb, Brain, FileText, CheckCircle } from "lucide-react";
import type React from "react";

import { SECONDS_PER_MINUTE, ASSESSMENT_TIMING } from "@shared/constants/time";

export interface IHintLevel {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  penalty: number;
  emoji: string;
  description: string;
  buttonVariant: "secondary" | "outline" | "destructive";
  confirmationRequired: boolean;
}

export const HINT_LEVELS: Record<number, IHintLevel> = {
  0: {
    icon: Lightbulb,
    label: "Gentle Nudge",
    penalty: 5,
    emoji: "💡",
    description: "A subtle hint to guide your thinking",
    buttonVariant: "secondary",
    confirmationRequired: false,
  },
  1: {
    icon: Brain,
    label: "Conceptual Hint",
    penalty: 10,
    emoji: "🧠",
    description: "Reveals key concepts or approaches",
    buttonVariant: "outline",
    confirmationRequired: false,
  },
  2: {
    icon: FileText,
    label: "Structural Guidance",
    penalty: 15,
    emoji: "📝",
    description: "Shows structural approach to the solution",
    buttonVariant: "outline",
    confirmationRequired: true,
  },
  3: {
    icon: CheckCircle,
    label: "Near-Solution",
    penalty: 20,
    emoji: "✅",
    description: "Provides significant solution details",
    buttonVariant: "destructive",
    confirmationRequired: true,
  },
};

export const HINT_TIMING_THRESHOLD = ASSESSMENT_TIMING.HINT_TIMING_THRESHOLD;

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
