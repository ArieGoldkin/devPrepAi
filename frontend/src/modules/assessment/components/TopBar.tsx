"use client"

import { Timer, Keyboard } from "lucide-react"
import React, { useState, useEffect } from "react"

import { Badge } from "@shared/ui/badge"
import { Card, CardContent } from "@shared/ui/card"

import { AutoSaveIndicator } from "./feedback/AutoSaveIndicator"
import { KeyboardShortcuts } from "./feedback/KeyboardShortcuts"
import { ValidationIndicator } from "./feedback/ValidationIndicator"
import { useCountdown } from "./hooks/useCountdown"

// Constants
const AUTO_SAVE_DELAY = 30000
const MIN_ANSWER_LENGTH = 50

interface ITopBarProps {
  currentAnswer: string
  onAutoSave: () => void
  questionType: string
  onTimeUp: () => void
  currentIndex: number
  totalQuestions: number
}

const TimerSection: React.FC<{formattedTime: string; colorClass: string; label: string}> = ({formattedTime, colorClass, label}) => {
  const getBadgeColorClass = (): string => {
    if (colorClass === "text-red-500") return "bg-red-50 text-red-700"
    if (colorClass === "text-yellow-500") return "bg-yellow-50 text-yellow-700"
    return "bg-blue-50 text-blue-700"
  }

  return (
    <div className="flex items-center gap-3">
      <Timer className="w-4 h-4 text-gray-500" />
      <div className="flex items-center gap-2">
        <Badge className={`${getBadgeColorClass()} font-mono text-base px-3 py-1`}>
          {formattedTime}
        </Badge>
        <span className="text-xs text-gray-500 hidden lg:inline">
          {label}
        </span>
      </div>
    </div>
  )
}

export const TopBar: React.FC<ITopBarProps> = ({
  currentAnswer,
  onAutoSave,
  questionType,
  onTimeUp,
  currentIndex,
  totalQuestions
}) => {
  const [lastSaveTime, setLastSaveTime] = useState<number>(Date.now())

  const { formattedTime, colorClass, isExpired } = useCountdown({
    initialTime: 3600,
    onTimeUp
  })

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100

  // Auto-save effect
  useEffect(() => {
    if (currentAnswer.length > 0) {
      const timer = setTimeout(() => {
        onAutoSave()
        setLastSaveTime(Date.now())
      }, AUTO_SAVE_DELAY)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [currentAnswer, onAutoSave])

  const getTimerLabel = (): string => {
    if (isExpired) return "Time's up!"
    const parts = formattedTime.split(":")
    const hours = parts[0] || "0"
    const minutes = parts[1] || "0"
    const h = parseInt(hours, 10)
    const m = parseInt(minutes, 10)

    if (h === 0 && m <= 5) return "Critical"
    if (h === 0 && m <= 10) return "Warning"
    return "Time Remaining"
  }

  const getValidationStatus = (): "valid" | "invalid" | "empty" => {
    if (currentAnswer.length >= MIN_ANSWER_LENGTH) return "valid"
    if (currentAnswer.length > 0) return "invalid"
    return "empty"
  }

  return (
    <Card className="sticky top-0 z-50 rounded-none border-x-0 border-t-0 shadow-sm bg-white/95 backdrop-blur-sm">
      <CardContent className="py-3 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Timer Section */}
          <TimerSection
            formattedTime={formattedTime}
            colorClass={colorClass}
            label={getTimerLabel()}
          />

          {/* Progress Section */}
          <div className="flex items-center gap-3 md:col-span-2">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3 justify-end">
            <AutoSaveIndicator
              status={currentAnswer.length > 0 ? "saved" : "typing"}
              isOnline={true}
              lastSaveTime={lastSaveTime}
            />
            <ValidationIndicator
              status={getValidationStatus()}
              questionType={questionType as "behavioral" | "system-design" | "coding" | "conceptual"}
            />
            <KeyboardShortcuts />
          </div>
        </div>

        {/* Mobile-only compact view */}
        <div className="md:hidden mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>Type: {questionType}</span>
          <span className="flex items-center gap-1">
            <Keyboard className="w-3 h-3" />
            Shortcuts available
          </span>
        </div>
      </CardContent>
    </Card>
  )
}