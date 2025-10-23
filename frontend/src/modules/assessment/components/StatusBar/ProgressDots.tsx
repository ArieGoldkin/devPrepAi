/**
 * ProgressDots Component
 * Visual progress indicator with animated dots showing question completion
 * Features framer-motion animations for smooth transitions
 */

import { motion } from "framer-motion";
import React from "react";

export interface IProgressDotsProps {
  current: number;
  total: number;
}

// Animation constants
const DOT_SCALE_COMPLETED = 1.1;
const DOT_SCALE_PENDING = 1;
const DOT_SCALE_INITIAL = 0;
const ANIMATION_STAGGER_DELAY = 0.05; // 50ms delay per dot

/**
 * ProgressDots Component
 * Displays animated dots representing question progress
 * - Completed dots: green (matching reference design)
 * - Pending dots: gray
 * - Shows "Question X of Y" text
 * - Staggered entrance animation (50ms delay per dot)
 */
export function ProgressDots({
  current,
  total,
}: IProgressDotsProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i < current
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                : "bg-gray-600"
            }`}
            initial={{ scale: DOT_SCALE_INITIAL }}
            animate={{
              scale: i < current ? DOT_SCALE_COMPLETED : DOT_SCALE_PENDING,
            }}
            transition={{ delay: i * ANIMATION_STAGGER_DELAY }}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-white">
        Question {current} of {total}
      </span>
    </div>
  );
}
