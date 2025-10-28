/**
 * LearningStyleCard Component
 * Display user's learning style profile with hint utilization
 * Tab 4: Learning Insights
 */

import * as React from "react";

import type { ILearningStyle } from "@/modules/results/utils/insights";
import { Card, CardHeader, CardContent } from "@shared/ui/card";
import { Progress } from "@shared/ui/progress";

/**
 * Props interface for LearningStyleCard component
 */
export interface ILearningStyleCardProps {
  /** Learning style data */
  style: ILearningStyle;
}

/**
 * LearningStyleCard - User's learning style profile
 * Two-column layout with description and metrics
 * Shows hint utilization with progress bar
 */
export function LearningStyleCard({
  style,
}: ILearningStyleCardProps): React.JSX.Element {
  return (
    <Card className="glass-card-static">
      <CardHeader className="flex-row items-center gap-4">
        <div className="text-3xl">🎨</div>
        <div>
          <div className="card-title">Your Learning Style</div>
          <div className="card-subtitle">
            Based on hint usage and performance patterns
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {/* Left Column: Description */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div style={{ fontSize: "48px", lineHeight: 1 }}>
                {style.icon}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#78dbff",
                }}
              >
                {style.type}
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(229, 229, 255, 0.7)",
                lineHeight: 1.6,
              }}
            >
              {style.description}
            </p>
          </div>

          {/* Right Column: Metrics */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgba(229, 229, 255, 0.7)",
                  }}
                >
                  Hint Utilization
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#00ff88",
                  }}
                >
                  {style.hintUtilization.label}
                </span>
              </div>
              <Progress
                value={style.hintUtilization.percentage}
                className="h-2"
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(229, 229, 255, 0.6)",
                  marginTop: "8px",
                }}
              >
                {style.hintUtilization.avgPerQuestion.toFixed(1)} hints per
                question is ideal for your skill level
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
