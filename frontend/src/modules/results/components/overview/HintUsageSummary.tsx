/**
 * HintUsageSummary Component
 *
 * Displays hint usage metrics and effectiveness in a responsive layout
 * with color-coded effectiveness indicator and glassmorphism design.
 *
 * @module modules/results/components
 */

interface IHintUsageSummaryProps {
  totalHints: number;
  effectiveness: number; // 0-100 percentage
  averagePerQuestion: number; // decimal (e.g., 1.4)
}

/**
 * HintUsageSummary Component
 *
 * Displays hint usage overview with 3 key metrics:
 * - Total Hints Used (orange/amber)
 * - Hint Effectiveness (green)
 * - Average Hints per Question (dark teal card)
 */
export const HintUsageSummary: React.FC<IHintUsageSummaryProps> = ({
  totalHints,
  effectiveness,
  averagePerQuestion,
}) => (
  <div
    className="glass-card-static p-6 rounded-2xl"
    role="region"
    aria-label="Hint Usage Summary"
  >
    {/* Header */}
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[rgba(255,179,71,0.3)] to-[rgba(255,179,71,0.1)]">
          💡
        </div>
        <div>
          <h3 className="text-lg font-semibold">Hint Usage</h3>
          <p className="text-xs text-gray-400">How hints helped you</p>
        </div>
      </div>
    </div>

    {/* Grid layout for Total Hints and Effectiveness */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Total Hints - Large Display */}
      <div className="text-center">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Total Hints
        </div>
        <div className="text-[48px] font-bold text-[#ffb347]">{totalHints}</div>
      </div>

      {/* Effectiveness */}
      <div className="text-center">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
          Effectiveness
        </div>
        <div className="text-[42px] font-bold text-[#00ff88]">
          {Math.round(effectiveness)}%
        </div>
      </div>
    </div>

    {/* Average per Question - Separate teal card */}
    <div
      className="bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] rounded-[10px] p-4 text-center"
      role="article"
      aria-label={`Average hints per question: ${averagePerQuestion.toFixed(1)}`}
    >
      <div className="text-[12px] text-gray-400 uppercase tracking-wide mb-2">
        Average per Question
      </div>
      <div className="text-[32px] font-bold text-[#78dbff]">
        {averagePerQuestion.toFixed(1)}
      </div>
    </div>
  </div>
);
