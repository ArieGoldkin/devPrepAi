"use client"

import React, { useEffect, useState } from 'react'

import { TIME_CONSTANTS, UI_THRESHOLDS } from '../../store/constants'
import { useAppStore } from '../../store/useAppStore'

interface ITimerProps {
  onTimeUp?: () => void
  className?: string
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE)
  const secs = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE
  return `${mins.toString().padStart(2, '0')  }:${  secs.toString().padStart(2, '0')}`
}

export function Timer({ onTimeUp, className = '' }: ITimerProps): React.JSX.Element {
  const { isActive: assessmentActive, timeRemaining, settings, updateTimer } = useAppStore()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(assessmentActive)
  }, [assessmentActive])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        const newTime = timeRemaining - 1
        updateTimer(newTime)
        
        if (newTime <= 0) {
          setIsActive(false)
          onTimeUp?.()
        }
      }, TIME_CONSTANTS.MS_PER_SECOND)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, timeRemaining, updateTimer, onTimeUp])

  const getColorClass = (): string => {
    const totalTime = settings.duration * TIME_CONSTANTS.SECONDS_PER_MINUTE
    const percentRemaining = (timeRemaining / totalTime) * 100

    if (percentRemaining <= UI_THRESHOLDS.TIME_CRITICAL_PERCENT) return 'text-red-600'
    if (percentRemaining <= UI_THRESHOLDS.TIME_WARNING_PERCENT) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className={`font-mono text-2xl font-bold ${  getColorClass()  } ${  className}`}>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
        <span>{formatTime(timeRemaining)}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {Math.floor(timeRemaining / TIME_CONSTANTS.SECONDS_PER_MINUTE)}m {timeRemaining % TIME_CONSTANTS.SECONDS_PER_MINUTE}s remaining
      </div>
    </div>
  )
}
