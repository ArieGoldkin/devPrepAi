import type * as React from "react";

import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";

interface ICodeAnswerSectionProps {
  inputValue: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function CodeAnswerSection({
  inputValue,
  onChange,
  disabled,
}: ICodeAnswerSectionProps): React.ReactElement {
  return (
    <div>
      <div className="mb-2 text-sm text-muted-foreground">
        Write your code solution below:
      </div>
      <CodeMirrorEditor
        value={inputValue}
        onChange={onChange}
        language="typescript"
        placeholder="// Write your solution here..."
        readOnly={disabled}
        minHeight="300px"
        maxHeight="500px"
      />
    </div>
  );
}
