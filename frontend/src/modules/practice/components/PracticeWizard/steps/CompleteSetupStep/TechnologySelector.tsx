import { Target } from "lucide-react";

import { Label } from "@/shared/ui/label";

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
    <Label className="flex items-center gap-2">
      <Target className="h-4 w-4" />
      Technologies
    </Label>
    <div className="grid grid-cols-2 gap-2 tech-grid-scrollable">
      {ALL_TECHNOLOGIES.map((tech) => {
        const isSelected = selectedTechs.includes(tech);
        return (
          <label
            key={tech}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer
              ${isSelected ? "bg-primary/20 text-primary" : ""}
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(tech)}
              className="rounded"
            />
            <span className="text-sm">{tech}</span>
          </label>
        );
      })}
    </div>
  </div>
);
