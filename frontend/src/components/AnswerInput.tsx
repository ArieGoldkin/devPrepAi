import type * as React from 'react'
import { useState } from 'react'

import { Button } from './ui/button'

const DEFAULT_MAX_LENGTH = 2000
const MIN_TEXTAREA_HEIGHT = 32

interface IAnswerInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (answer: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  submitButtonText?: string
}

const useAnswerInput = (
  value: string,
  onChange?: (value: string) => void,
  maxLength: number = DEFAULT_MAX_LENGTH
) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  const [localValue, setLocalValue] = useState(value)
  
  const inputValue = onChange ? value : localValue
  const characterCount = inputValue.length

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value
    if (newValue.length <= maxLength) {
      if (onChange) {
        onChange(newValue)
      } else {
        setLocalValue(newValue)
      }
    }
  }

  return { inputValue, characterCount, handleChange }
}

const CharacterCounter = ({ 
  count, 
  maxLength 
}: { 
  count: number
  maxLength: number 
}): React.ReactElement => (
  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-1">
    {count}/{maxLength}
  </div>
)

const SubmitSection = ({
  onSubmit,
  disabled,
  inputValue,
  submitButtonText
}: {
  onSubmit?: (answer: string) => void
  disabled: boolean
  inputValue: string
  submitButtonText: string
}): React.ReactElement => {
  const handleSubmit = (): void => {
    if (onSubmit && inputValue.trim()) {
      onSubmit(inputValue.trim())
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to submit quickly
      </p>
      <Button
        onClick={handleSubmit}
        disabled={disabled || !inputValue.trim()}
        className="min-w-32"
      >
        {submitButtonText}
      </Button>
    </div>
  )
}

export function AnswerInput({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Type your answer here...',
  maxLength = DEFAULT_MAX_LENGTH,
  disabled = false,
  submitButtonText = 'Submit Answer'
}: IAnswerInputProps): React.ReactElement {
  const { inputValue, characterCount, handleChange } = useAnswerInput(value, onChange, maxLength)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      if (onSubmit && inputValue.trim()) {
        onSubmit(inputValue.trim())
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full min-h-${MIN_TEXTAREA_HEIGHT} p-3 border border-input bg-background rounded-md text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Answer input"
        />
        <CharacterCounter count={characterCount} maxLength={maxLength} />
      </div>
      {/* @ts-expect-error TypeScript exactOptionalPropertyTypes is too strict here */}
      <SubmitSection
        onSubmit={onSubmit}
        disabled={disabled}
        inputValue={inputValue}
        submitButtonText={submitButtonText}
      />
    </div>
  )
}
