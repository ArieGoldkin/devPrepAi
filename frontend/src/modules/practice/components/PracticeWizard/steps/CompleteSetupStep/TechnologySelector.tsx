import { Target } from "lucide-react";
import React from "react";

import { GlassCheckboxItem } from "../../components/GlassCheckboxItem";
import { TECHNOLOGY_OPTIONS } from "../../constants";

// Flatten all technologies into a single array
const ALL_TECHNOLOGIES = Object.values(TECHNOLOGY_OPTIONS).flat();

export const TechnologySelector = ({
  selectedTechs,
  onToggle,
}: {
  selectedTechs: string[];
  onToggle: (tech: string) => void;
}): React.JSX.Element => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-glow">
      <Target className="h-4 w-4" />
      Technologies
    </label>
    <div className="grid grid-cols-2 gap-2 tech-grid-scrollable">
      {ALL_TECHNOLOGIES.map((tech) => {
        const isSelected = selectedTechs.includes(tech);
        return (
          <GlassCheckboxItem
            key={tech}
            label={tech}
            checked={isSelected}
            onChange={() => onToggle(tech)}
          />
        );
      })}
    </div>
  </div>
);
