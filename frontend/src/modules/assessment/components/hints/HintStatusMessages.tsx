"use client";

import React from "react";

interface IHintStatusMessagesProps {
  totalPenalty: number;
  canRevealNext: boolean;
  revealedHintsCount: number;
  totalHintsCount: number;
}

export function HintStatusMessages({
  totalPenalty,
  canRevealNext,
  revealedHintsCount,
  totalHintsCount,
}: IHintStatusMessagesProps): React.JSX.Element | null {
  // All hints revealed
  if (!canRevealNext && revealedHintsCount > 0) {
    return (
      <div className="text-center p-3 bg-amber-100 border border-amber-300 rounded-lg">
        <p className="text-sm text-amber-800 font-medium">
          All hints revealed! Total score penalty: -{totalPenalty} points
        </p>
      </div>
    );
  }

  // No hints available
  if (totalHintsCount === 0) {
    return (
      <div className="text-center p-3 bg-gray-100 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600">
          No hints available for this question.
        </p>
      </div>
    );
  }

  return null;
}
