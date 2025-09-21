import type * as React from "react";

import { Select } from "../../ui/select";

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
      <label className="block text-body font-medium mb-2">
        Previous Interview Experience
      </label>
      <Select
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder="Select experience"
      >
        <option value="none">No previous interviews</option>
        <option value="some">Some interview experience</option>
        <option value="extensive">Extensive interview experience</option>
      </Select>
    </div>
  );
}
