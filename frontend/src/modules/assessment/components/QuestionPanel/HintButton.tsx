import React from "react";

interface IHintButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  hintsUsed: number;
  maxHints: number;
}

/**
 * HintButton Component
 *
 * Full-width button with 3 states: default, loading, disabled
 * Changes text based on hints used: "Get Hint" → "Get Next Hint" → "All Hints Used"
 * Purple-pink gradient background with hover lift effect
 *
 * Design ref: Prototype lines 386-412
 */
export const HintButton: React.FC<IHintButtonProps> = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  hintsUsed,
  maxHints,
}) => {
  // Determine button text based on state
  const getButtonText = (): string => {
    if (isLoading) return "Generating hint...";
    if (hintsUsed >= maxHints) return "All Hints Used";
    if (hintsUsed === 0) return "Get Hint";
    return "Get Next Hint";
  };

  // Check if button should be disabled
  const disabled = isDisabled || isLoading || hintsUsed >= maxHints;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        px-4
        py-2.5
        rounded-[10px]
        text-[12px]
        font-semibold
        border
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        hover:enabled:transform
        hover:enabled:-translate-y-0.5
        hover:enabled:shadow-[0_4px_20px_rgba(120,119,198,0.3)]
      "
      style={{
        background:
          "linear-gradient(135deg, rgba(120, 119, 198, 0.2) 0%, rgba(255, 119, 198, 0.15) 100%)",
        borderColor: disabled
          ? "rgba(120, 119, 198, 0.2)"
          : "rgba(120, 119, 198, 0.4)",
        color: "#e5e5ff",
      }}
      aria-label={getButtonText()}
      aria-busy={isLoading}
    >
      {/* Icon */}
      {isLoading && <span className="animate-spin">⏳</span>}
      {!isLoading && hintsUsed >= maxHints && <span>🔒</span>}
      {!isLoading && hintsUsed < maxHints && <span>💡</span>}

      {/* Button text */}
      <span>{getButtonText()}</span>
    </button>
  );
};
