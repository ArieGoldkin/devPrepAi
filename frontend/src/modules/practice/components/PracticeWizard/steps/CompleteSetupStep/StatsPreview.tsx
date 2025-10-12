import { Clock } from "lucide-react";
import React from "react";

import { Badge } from "@shared/ui/badge";

import type { PracticeSettings } from "../../constants";

export const StatsPreview = ({
  settings,
  selectedTechs,
}: {
  settings: PracticeSettings;
  selectedTechs: string[];
}): React.JSX.Element => (
  <div className="bg-white/[0.03] border border-white/20 rounded-xl p-4 space-y-3">
    {/* Header */}
    <div className="flex items-center gap-2 text-sm font-semibold text-glow">
      <Clock className="h-4 w-4" />
      <span>Session Summary</span>
    </div>

    {/* Stats Grid */}
    <div className="space-y-3">
      {/* Duration and Questions Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-[rgba(229,229,255,0.6)] mb-0.5">
            Duration
          </div>
          <div className="text-xl font-bold text-white">
            {settings.duration} min
          </div>
        </div>
        <div>
          <div className="text-xs text-[rgba(229,229,255,0.6)] mb-0.5">
            Questions
          </div>
          <div className="text-xl font-bold text-white">
            {settings.questionCount}
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <div className="text-xs text-[rgba(229,229,255,0.6)] mb-1">
          Difficulty
        </div>
        <div className="flex items-center gap-2">
          {settings.difficulty === "easy" && (
            <span className="text-xl">🟢</span>
          )}
          {settings.difficulty === "medium" && (
            <span className="text-xl">🟡</span>
          )}
          {settings.difficulty === "hard" && (
            <span className="text-xl">🔴</span>
          )}
          <span className="text-base font-semibold text-white capitalize">
            {settings.difficulty}
          </span>
        </div>
      </div>

      {/* Focus Areas */}
      <div>
        <div className="text-xs text-[rgba(229,229,255,0.6)] mb-0.5">
          Focus Areas
        </div>
        <div className="text-xl font-bold text-white">
          {settings.focusAreas.length}
        </div>
      </div>

      {/* Technologies */}
      {selectedTechs.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {selectedTechs.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                className="bg-[rgba(120,119,198,0.3)] border-[rgba(120,119,198,0.5)] text-white text-xs px-2.5 py-0.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
