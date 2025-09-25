import React from "react";

export function EmptyQuestionState(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-subtitle text-gray-500">No questions available</div>
    </div>
  );
}
