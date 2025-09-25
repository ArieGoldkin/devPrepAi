import { Target } from "lucide-react";
import React from "react";

interface IFocusAreasProps {
  interests: string[];
}

export function FocusAreas({ interests }: IFocusAreasProps): React.JSX.Element {
  return (
    <div>
      <p className="text-sm font-medium mb-2 flex items-center gap-1">
        <Target className="h-3 w-3" />
        Interview Focus
      </p>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span key={interest} className="badge-primary text-xs">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
