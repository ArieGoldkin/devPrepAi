import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionCardProps {
  question: IQuestion;
  questionNumber: number;
  children?: React.ReactNode;
}

export const QuestionCard: React.FC<IQuestionCardProps> = ({ children }) => (
  <div
    className="
        rounded-xl
        p-6
        backdrop-blur-[20px]
        border
        shadow-lg
      "
    style={{
      background: "rgba(20, 15, 40, 0.85)",
      borderColor: "rgba(120, 119, 198, 0.3)",
    }}
  >
    {children}
  </div>
);
