import type * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

interface IExperienceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExperienceSelector({
  value,
  onChange,
}: IExperienceSelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2 text-glow">
        Experience
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/5 backdrop-blur-md border-white/10">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="junior">Junior</SelectItem>
          <SelectItem value="mid">Mid-level</SelectItem>
          <SelectItem value="senior">Senior</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
