import type * as React from 'react'

import { CodeEditor } from '../shared/CodeEditor'

interface ICodeAnswerSectionProps {
  inputValue: string
  onChange: (value: string) => void
  disabled: boolean
}

export function CodeAnswerSection({
  inputValue,
  onChange,
  disabled
}: ICodeAnswerSectionProps): React.ReactElement {
  return (
    <div>
      <div className="mb-2 text-sm text-muted-foreground">
        Write your code solution below:
      </div>
      <CodeEditor
        value={inputValue}
        onChange={onChange}
        language="tsx"
        placeholder="// Write your solution here..."
        disabled={disabled}
        minHeight="300px"
        maxHeight="500px"
      />
    </div>
  )
}