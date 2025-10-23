import React from "react";

interface ISplitScreenContainerProps {
  questionPanel: React.ReactNode;
  answerPanel: React.ReactNode;
}

/**
 * SplitScreenContainer
 *
 * Height-constrained grid layout for assessment page
 * - h-full: Fills the main container (100% of viewport - StatusBar - padding)
 * - overflow-hidden: Prevents grid itself from scrolling
 * - Both panels also h-full: Fill their grid cells completely
 * - This ensures all content is constrained to viewport, enabling proper scrolling
 */
export const SplitScreenContainer: React.FC<ISplitScreenContainerProps> = ({
  questionPanel,
  answerPanel,
}) => (
  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-[minmax(320px,25%)_1fr]
      gap-5
      h-full
      w-full
      overflow-hidden
    "
  >
    {/* Left Panel: Question (20-25% on desktop) - Static wrapper */}
    <div className="flex flex-col h-full overflow-hidden">{questionPanel}</div>

    {/* Right Panel: Answer (75-80% on desktop) - Static wrapper */}
    <div className="flex flex-col h-full overflow-hidden">{answerPanel}</div>
  </div>
);
