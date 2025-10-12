import React from "react";

import { Checkbox } from "@shared/ui/checkbox";
import { cn } from "@shared/utils/cn";

interface IGlassCheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function GlassCheckboxItem({
  label,
  checked,
  onChange,
  className,
}: IGlassCheckboxItemProps): React.JSX.Element {
  return (
    <label
      className={cn(
        "flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300",
        "bg-white/[0.03] border border-white/40 hover:bg-white/[0.08] hover:border-[rgba(120,119,198,0.3)]",
        checked &&
          "bg-[rgba(120,119,198,0.2)] border-[#7877c6] shadow-[0_0_10px_rgba(120,119,198,0.3)]",
        className,
      )}
    >
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-[rgba(229,229,255,0.9)]">{label}</span>
    </label>
  );
}
