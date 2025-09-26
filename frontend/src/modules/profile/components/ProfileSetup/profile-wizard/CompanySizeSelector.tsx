import type * as React from "react";

import { Select } from "@shared/ui/select";

interface ICompanySizeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CompanySizeSelector({
  value,
  onChange,
}: ICompanySizeSelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2">
        Company Size Preference
      </label>
      <Select
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder="Select preference"
      >
        <option value="startup">Startup (1-50 employees)</option>
        <option value="mid-size">Mid-size (50-500 employees)</option>
        <option value="enterprise">Enterprise (500+ employees)</option>
        <option value="any">Any size</option>
      </Select>
    </div>
  );
}
