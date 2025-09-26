import { Code2 } from "lucide-react";
import React from "react";

interface ITechnologiesProps {
  technologies: string[];
}

export function Technologies({
  technologies,
}: ITechnologiesProps): React.JSX.Element {
  return (
    <div>
      <p className="text-sm font-medium mb-2 flex items-center gap-1">
        <Code2 className="h-3 w-3" />
        Technologies
      </p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span key={tech} className="badge-secondary text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
