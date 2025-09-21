import type * as React from "react";

import { Select } from "@components/ui/select";

interface IRoleFocusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RoleFocusSelector({
  value,
  onChange,
}: IRoleFocusSelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-body font-medium mb-2">Role Focus</label>
      <Select
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        placeholder="Select focus"
      >
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Full-stack</option>
        <option value="devops">DevOps</option>
        <option value="mobile">Mobile</option>
      </Select>
    </div>
  );
}
