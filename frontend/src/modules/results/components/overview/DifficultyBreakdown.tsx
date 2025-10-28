/**
 * DifficultyBreakdown Component
 *
 * Displays performance by difficulty level with animated progress bars
 * for Easy, Medium, and Hard questions.
 *
 * @module modules/results/components
 */

import { Badge } from "@shared/ui/badge";
import { Progress } from "@shared/ui/progress";
import { cn } from "@shared/utils/cn";

const MAX_SCORE = 100;
const ANIMATION_STAGGER_DELAY_MS = 100;

interface IDifficultyBreakdownProps {
  easy: { score: number; count: number };
  medium: { score: number; count: number };
  hard: { score: number; count: number };
}

interface IDifficultyLevel {
  label: string;
  data: { score: number; count: number };
  progressColor: string;
  textColor: string;
}

/**
 * Individual difficulty progress bar with label and score
 */
const DifficultyBar: React.FC<{
  level: IDifficultyLevel;
  index: number;
}> = ({ level, index }) => {
  const { label, data, progressColor, textColor } = level;
  const { score, count } = data;

  // Calculate percentage for progress bar
  const percentage = count > 0 ? (score / MAX_SCORE) * 100 : 0;

  // Format score display
  const scoreDisplay =
    count > 0 ? `${Math.round(score)}/${MAX_SCORE}` : "0/100";

  // Aria label for accessibility
  const ariaLabel = `${label} difficulty: ${Math.round(score)} out of ${MAX_SCORE}, ${count} questions`;

  return (
    <div
      className="mb-4 last:mb-0"
      role="group"
      aria-label={ariaLabel}
      style={{ animationDelay: `${index * ANIMATION_STAGGER_DELAY_MS}ms` }}
    >
      {/* Label and score header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">
            {label} Questions
          </span>
          <Badge
            variant="secondary"
            className="text-xs bg-gray-700/50 text-gray-400"
          >
            {count}
          </Badge>
        </div>
        <span className={cn("text-sm font-semibold", textColor)}>
          {scoreDisplay}
        </span>
      </div>

      {/* Progress bar */}
      <Progress
        value={percentage}
        className="h-2 bg-white/10 rounded"
        indicatorClassName={cn(
          "transition-all duration-500 ease-out rounded shadow-[0_0_10px_rgba(120,119,198,0.5)]",
          progressColor,
        )}
        aria-valuenow={Math.round(score)}
        aria-valuemin={0}
        aria-valuemax={MAX_SCORE}
      />
    </div>
  );
};

/**
 * DifficultyBreakdown Component
 *
 * Shows performance metrics broken down by difficulty level:
 * - Easy (green)
 * - Medium (cyan)
 * - Hard (orange)
 *
 * Each bar animates on mount with staggered delays.
 */
export const DifficultyBreakdown: React.FC<IDifficultyBreakdownProps> = ({
  easy,
  medium,
  hard,
}) => {
  const difficultyLevels: IDifficultyLevel[] = [
    {
      label: "Easy",
      data: easy,
      progressColor: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      label: "Medium",
      data: medium,
      progressColor: "bg-cyan-500",
      textColor: "text-cyan-500",
    },
    {
      label: "Hard",
      data: hard,
      progressColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
  ];

  return (
    <div
      className="glass-card-static p-6 rounded-2xl"
      role="region"
      aria-label="Performance by Difficulty"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[rgba(120,219,255,0.3)] to-[rgba(120,219,255,0.1)]">
            📈
          </div>
          <div>
            <h3 className="text-lg font-semibold">By Difficulty</h3>
            <p className="text-xs text-gray-400">Performance breakdown</p>
          </div>
        </div>
      </div>

      {/* Progress bars */}
      <div>
        {difficultyLevels.map((level, index) => (
          <DifficultyBar key={level.label} level={level} index={index} />
        ))}
      </div>
    </div>
  );
};
