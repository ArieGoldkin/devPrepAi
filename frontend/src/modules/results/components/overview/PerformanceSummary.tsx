/**
 * PerformanceSummary Component
 *
 * Displays 4 key performance metrics in a responsive grid layout
 * with color-coded scoring and glassmorphism design.
 *
 * @module modules/results/components
 */

import { cn } from "@shared/utils/cn";

const MINUTES_PER_HOUR = 60;
const MAX_SCORE = 100;

interface IPerformanceSummaryProps {
  averageScore: number; // 0-100
  completionRate: number; // 0-100 (percentage)
  totalTime: number; // in minutes
  avgImprovement: number; // percentage change
}

interface IStatCardProps {
  value: string;
  label: string;
  colorClass: string;
  ariaLabel: string;
}

/**
 * Individual stat card with value and label
 */
const StatCard: React.FC<IStatCardProps> = ({
  value,
  label,
  colorClass,
  ariaLabel,
}) => (
  <div
    className="bg-white/[0.05] border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] hover:-translate-y-1 transition-all flex flex-col items-center justify-center"
    role="article"
    aria-label={ariaLabel}
  >
    <div className={cn("text-4xl font-bold mb-2", colorClass)}>{value}</div>
    <div className="text-xs text-gray-400 uppercase tracking-[0.5px]">
      {label}
    </div>
  </div>
);

/**
 * PerformanceSummary Component
 *
 * Displays performance overview with 4 key metrics:
 * - Average Score (green)
 * - Completion Rate (cyan)
 * - Total Time Spent (green)
 * - Average Improvement (cyan)
 */
export const PerformanceSummary: React.FC<IPerformanceSummaryProps> = ({
  averageScore,
  completionRate,
  totalTime,
  avgImprovement,
}) => {
  // Format time display (e.g., "42m" or "1h 30m")
  const formatTime = (minutes: number): string => {
    if (minutes < MINUTES_PER_HOUR) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / MINUTES_PER_HOUR);
    const mins = Math.round(minutes % MINUTES_PER_HOUR);
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Format improvement display (e.g., "+15%" or "-5%")
  const formatImprovement = (improvement: number): string => {
    const sign = improvement >= 0 ? "+" : "";
    return `${sign}${Math.round(improvement)}%`;
  };

  const stats: IStatCardProps[] = [
    {
      value: `${Math.round(averageScore)}/${MAX_SCORE}`,
      label: "Average Score",
      colorClass: "text-[#00ff88] [text-shadow:0_0_15px_rgba(0,255,136,0.5)]",
      ariaLabel: `Average score: ${Math.round(averageScore)} out of ${MAX_SCORE}`,
    },
    {
      value: `${Math.round(completionRate)}%`,
      label: "Completion Rate",
      colorClass: "text-[#78dbff] [text-shadow:0_0_15px_rgba(120,219,255,0.5)]",
      ariaLabel: `Completion rate: ${Math.round(completionRate)} percent`,
    },
    {
      value: formatTime(totalTime),
      label: "Total Time",
      colorClass: "text-[#00ff88] [text-shadow:0_0_15px_rgba(0,255,136,0.5)]",
      ariaLabel: `Total time spent: ${formatTime(totalTime)}`,
    },
    {
      value: formatImprovement(avgImprovement),
      label: "Avg Improvement",
      colorClass: "text-[#78dbff] [text-shadow:0_0_15px_rgba(120,219,255,0.5)]",
      ariaLabel: `Average improvement: ${formatImprovement(avgImprovement)}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};
