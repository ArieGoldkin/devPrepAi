import type * as React from "react";

import { Input } from "@shared/ui/input";

interface IYearsExperienceInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function YearsExperienceInput({
  value,
  onChange,
}: IYearsExperienceInputProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2 text-glow">
        Years of Experience
      </label>
      <Input
        type="number"
        min={0}
        max={50}
        value={value}
        onChange={(e): void => onChange(Number(e.target.value))}
        className="bg-white/5 backdrop-blur-md border-white/10"
      />
    </div>
  );
}
