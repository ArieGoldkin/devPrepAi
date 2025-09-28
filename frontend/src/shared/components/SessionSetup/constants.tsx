import { Brain, Clock, Target } from 'lucide-react';
import React from 'react';

import type { SessionMode } from '@/lib/store/slices/sessionSlice';

export const MODES: Array<{
  value: SessionMode;
  label: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}> = [
  {
    value: "practice",
    label: "Practice Mode",
    description: "Learn at your own pace with hints and unlimited time",
    icon: <Brain className="w-5 h-5" />,
    features: ["Unlimited time", "Hints available", "Skip questions", "Detailed feedback"],
  },
  {
    value: "assessment",
    label: "Assessment Mode",
    description: "Test your skills with timed challenges",
    icon: <Clock className="w-5 h-5" />,
    features: ["Timed session", "Limited hints", "Score tracking", "Performance metrics"],
  },
  {
    value: "mock-interview",
    label: "Mock Interview",
    description: "Simulate real interview conditions",
    icon: <Target className="w-5 h-5" />,
    features: ["Interview timer", "No hints", "Realistic pressure", "Detailed evaluation"],
  },
];