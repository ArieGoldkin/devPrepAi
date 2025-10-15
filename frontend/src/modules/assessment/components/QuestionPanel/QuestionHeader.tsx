import React from "react";

import { Badge } from "@shared/ui/badge";

interface IQuestionHeaderProps {
  questionNumber: number;
  difficulty: number;
}

const MEDIUM_DIFFICULTY_THRESHOLD = 3;
const HARD_DIFFICULTY_THRESHOLD = 6;

const getDifficultyConfig = (
  difficulty: number,
): { label: string; className: string } => {
  if (difficulty <= MEDIUM_DIFFICULTY_THRESHOLD) {
    return {
      label: "Easy",
      className: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    };
  } else if (difficulty <= HARD_DIFFICULTY_THRESHOLD) {
    return {
      label: "Medium",
      className: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
  } else {
    return {
      label: "Hard",
      className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
  }
};

export const QuestionHeader: React.FC<IQuestionHeaderProps> = ({
  questionNumber,
  difficulty,
}) => {
  const difficultyConfig = getDifficultyConfig(difficulty);

  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-300">
        Question {questionNumber}
      </span>
      <Badge
        variant="outline"
        className={`rounded-full ${difficultyConfig.className}`}
      >
        {difficultyConfig.label}
      </Badge>
    </div>
  );
};
