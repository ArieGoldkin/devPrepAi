/**
 * LearningInsightsTab Component
 * Main container orchestrating all learning insights components
 * Tab 4: Learning Insights
 */

import * as React from "react";

import { useLearningInsights } from "@/modules/results/hooks/useLearningInsights";
import { Card, CardHeader, CardContent } from "@shared/ui/card";

import { InteractiveInsightCard } from "./InteractiveInsightCard";
import { LearningStyleCard } from "./LearningStyleCard";
import { RecommendationsList } from "./RecommendationsList";

/**
 * LearningInsightsTab - Main tab component
 * Displays AI-powered insights, learning style, and recommendations
 * Handles insight clicks with alert + future navigation
 */
export function LearningInsightsTab(): React.JSX.Element {
  const {
    strengths,
    improvements,
    strategies,
    learningStyle,
    recommendations,
    isLoading,
  } = useLearningInsights();

  const handleInsightClick = (category: string, topic: string): void => {
    // Placeholder: Alert user (intentional for demo)
    // eslint-disable-next-line no-alert
    alert(
      `🤖 AI Learning Path Selected!\n\nCategory: ${category}\nTopic: ${topic}\n\n(This will connect to your AI learning tool in the future)`,
    );

    // Future: Navigate to AI learning tool
    // router.push(`/learn?category=${category}&topic=${topic}&context=results`);
  };

  if (isLoading) {
    return (
      <div className="glass-card-static p-12 text-center">
        <p className="text-gray-400">Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Interactive Learning Insights */}
      <Card className="glass-card-static">
        <CardHeader className="flex-row items-center gap-4">
          <div className="text-3xl">🌟</div>
          <div style={{ flex: 1 }}>
            <div className="card-title">AI-Powered Learning Insights</div>
            <div className="card-subtitle">
              Click any insight to start a personalized learning path
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Insight Cards Grid */}
          <div className="insights-grid">
            <InteractiveInsightCard
              category="strength"
              title="✅ Your Strengths"
              subtitle="Click to practice"
              insights={strengths}
              onInsightClick={handleInsightClick}
            />
            <InteractiveInsightCard
              category="improvement"
              title="📈 Growth Opportunities"
              subtitle="Click to learn"
              insights={improvements}
              onInsightClick={handleInsightClick}
            />
            <InteractiveInsightCard
              category="strategy"
              title="💡 Effective Strategies"
              subtitle="Click to deepen"
              insights={strategies}
              onInsightClick={handleInsightClick}
            />
          </div>

          {/* Helper Text */}
          <div className="helper-text">
            <div className="helper-text-title">
              🤖 AI-Powered Learning Paths (Coming Soon)
            </div>
            <div className="helper-text-desc">
              Click any insight above to generate a personalized learning plan.
              Our AI will create custom exercises, explanations, and practice
              problems tailored to your specific needs.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Style */}
      <LearningStyleCard style={learningStyle} />

      {/* Recommendations */}
      <Card className="glass-card-static">
        <CardHeader className="flex-row items-center gap-4">
          <div className="text-3xl">🚀</div>
          <div>
            <div className="card-title">Personalized Recommendations</div>
            <div className="card-subtitle">
              Next steps to accelerate your progress
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RecommendationsList recommendations={recommendations} />
        </CardContent>
      </Card>
    </div>
  );
}
