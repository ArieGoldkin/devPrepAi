import type * as React from "react";

import { Select } from "@shared/ui/select";

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
      <label className="block text-body font-medium mb-2">Experience</label>
      <Select
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder="Select level"
      >
        <option value="junior">Junior</option>
        <option value="mid">Mid-level</option>
        <option value="senior">Senior</option>
      </Select>
    </div>
  );
}
