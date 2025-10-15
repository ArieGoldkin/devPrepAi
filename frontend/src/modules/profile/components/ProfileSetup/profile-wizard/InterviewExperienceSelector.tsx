import type * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

interface IInterviewExperienceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function InterviewExperienceSelector({
  value,
  onChange,
}: IInterviewExperienceSelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2 text-glow">
        Previous Interview Experience
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/5 backdrop-blur-md border-white/10">
          <SelectValue placeholder="Select experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No previous interviews</SelectItem>
          <SelectItem value="some">Some interview experience</SelectItem>
          <SelectItem value="extensive">Extensive interview experience</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
