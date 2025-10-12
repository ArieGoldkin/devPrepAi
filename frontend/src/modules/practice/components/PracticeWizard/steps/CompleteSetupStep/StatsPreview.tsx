import { CheckCircle2 } from "lucide-react";

import { Badge } from "@shared/ui/badge";

import type { PracticeSettings } from "../../constants";

export const StatsPreview = ({
  settings,
  selectedTechs,
}: {
  settings: PracticeSettings;
  selectedTechs: string[];
}): React.JSX.Element => (
  <div className="glass-card-static p-4 space-y-3">
    <div className="flex items-center gap-2 text-sm font-medium">
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <span>Configuration Summary</span>
    </div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <span className="text-muted-foreground">Duration:</span>
        <span className="ml-2 font-medium">{settings.duration} min</span>
      </div>
      <div>
        <span className="text-muted-foreground">Questions:</span>
        <span className="ml-2 font-medium">{settings.questionCount}</span>
      </div>
      <div>
        <span className="text-muted-foreground">Difficulty:</span>
        <Badge variant="outline" className="ml-2 capitalize">
          {settings.difficulty === "easy" && "🟢"}
          {settings.difficulty === "medium" && "🟡"}
          {settings.difficulty === "hard" && "🔴"}
          <span className="ml-1">{settings.difficulty}</span>
        </Badge>
      </div>
      <div>
        <span className="text-muted-foreground">Focus Areas:</span>
        <span className="ml-2 font-medium">{settings.focusAreas.length}</span>
      </div>
    </div>
    {selectedTechs.length > 0 && (
      <div>
        <span className="text-muted-foreground text-sm">Technologies:</span>
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTechs.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {selectedTechs.length > 5 && (
            <Badge variant="secondary" className="text-xs">
              +{selectedTechs.length - 5} more
            </Badge>
          )}
        </div>
      </div>
    )}
  </div>
);
