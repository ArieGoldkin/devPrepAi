import type * as React from "react";

import { TECHNOLOGY_OPTIONS } from "../wizard/constants";

interface ITechnologySelectorProps {
  selectedTechs: string[];
  onToggle: (tech: string) => void;
}

// Flatten all technologies into a single array
const ALL_TECHNOLOGIES = Object.values(TECHNOLOGY_OPTIONS).flat();

export function TechnologySelector({
  selectedTechs,
  onToggle,
}: ITechnologySelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2">
        Technologies (select all that apply)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
        {ALL_TECHNOLOGIES.map((tech) => (
          <label key={tech} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={selectedTechs.includes(tech)}
              onChange={(): void => onToggle(tech)}
              className="rounded"
            />
            <span className="text-body">{tech}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
