import React from "react";

interface ISplitScreenContainerProps {
  questionPanel: React.ReactNode;
  answerPanel: React.ReactNode;
}

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
      h-[calc(100vh-100px)]
      w-full
      overflow-hidden
    "
  >
    {/* Left Panel: Question (20-25% on desktop, max-h-50vh on mobile) */}
    <div className="flex flex-col overflow-hidden max-h-[50vh] lg:max-h-none">
      {questionPanel}
    </div>

    {/* Right Panel: Answer (75-80% on desktop) */}
    <div className="flex flex-col overflow-hidden">{answerPanel}</div>
  </div>
);
