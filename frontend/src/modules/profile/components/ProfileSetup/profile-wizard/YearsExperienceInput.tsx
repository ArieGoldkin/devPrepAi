import type * as React from "react";

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
      <label className="block text-body font-medium mb-2">
        Years of Experience
      </label>
      <input
        type="number"
        min="0"
        max="50"
        value={value}
        onChange={(e): void => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
