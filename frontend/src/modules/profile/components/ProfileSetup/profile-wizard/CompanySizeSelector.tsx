import type * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

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
      <label className="block text-body font-medium mb-2 text-glow">
        Company Size Preference
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/5 backdrop-blur-md border-white/10">
          <SelectValue placeholder="Select preference" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
          <SelectItem value="mid-size">Mid-size (50-500 employees)</SelectItem>
          <SelectItem value="enterprise">Enterprise (500+ employees)</SelectItem>
          <SelectItem value="any">Any size</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
