import React from "react";

interface IQuestionPanelProps {
  children: React.ReactNode;
}

/**
 * QuestionPanel
 *
 * Vertical layout container for question content and hints
 * - h-full: Fills the left grid cell completely (20-25% of screen)
 * - flex flex-col: Stacks children vertically
 * - overflow-hidden: Prevents panel itself from scrolling
 * - Children (question card, hints) have their own scroll areas
 */
export const QuestionPanel: React.FC<IQuestionPanelProps> = ({ children }) => (
  <div className="h-full w-full flex flex-col gap-4 p-1 overflow-hidden">
    {children}
  </div>
);
