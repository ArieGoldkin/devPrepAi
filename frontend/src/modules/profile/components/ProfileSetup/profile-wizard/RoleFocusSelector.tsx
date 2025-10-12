import type * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

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
      <label className="block text-body font-medium mb-2 text-glow">
        Role Focus
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/5 backdrop-blur-md border-white/10">
          <SelectValue placeholder="Select focus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="frontend">Frontend</SelectItem>
          <SelectItem value="backend">Backend</SelectItem>
          <SelectItem value="fullstack">Full-stack</SelectItem>
          <SelectItem value="devops">DevOps</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
