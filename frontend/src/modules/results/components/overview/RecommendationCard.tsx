/**
 * RecommendationCard Component
 *
 * Displays AI-generated recommendation with gradient glassmorphism design.
 * Features a large icon, title, message, and placeholder CTA button.
 *
 * @module modules/results/components
 */

interface IRecommendationCardProps {
  title: string;
  message: string;
  icon?: string; // emoji (default: "✨")
}

/**
 * RecommendationCard Component
 *
 * Gradient glassmorphism card displaying personalized recommendations
 * based on user performance analysis.
 *
 * @example
 * <RecommendationCard
 *   title="Outstanding Performance!"
 *   message="You're ready for advanced challenges. Consider increasing difficulty..."
 *   icon="🚀"
 * />
 */
export const RecommendationCard: React.FC<IRecommendationCardProps> = ({
  title,
  message,
  icon = "✨",
}) => (
  <div
    className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 text-center mt-6"
    role="article"
    aria-label="Performance recommendation"
  >
    {/* Icon */}
    <div
      className="text-6xl mb-4"
      role="img"
      aria-label={`Recommendation icon: ${icon}`}
    >
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>

    {/* Message */}
    <p className="text-gray-300 mb-4 leading-relaxed">{message}</p>

    {/* CTA Button (Placeholder) */}
    {/* TODO: Connect to practice flow when ready */}
    <button
      type="button"
      disabled
      title="Coming soon: Continue to practice mode"
      className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all cursor-not-allowed opacity-50"
      aria-label="Continue learning button (disabled, coming soon)"
    >
      Continue Learning →
    </button>
  </div>
);
