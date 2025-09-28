"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface IUseCountdownProps {
  initialTime: number
  onTimeUp: () => void
  isPaused?: boolean
}

interface IUseCountdownReturn {
  timeRemaining: number
  formattedTime: string
  colorClass: string
  isExpired: boolean
  isWarning: boolean
  isCritical: boolean
  pause: () => void
  resume: () => void
  reset: (newTime?: number) => void
}

// Format time as HH:MM:SS
const formatTime = (seconds: number): string => {
  const SECONDS_PER_HOUR = 3600
  const SECONDS_PER_MINUTE = 60
  const hours = Math.floor(seconds / SECONDS_PER_HOUR)
  const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
  const secs = seconds % SECONDS_PER_MINUTE

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

// Get color class based on remaining time
const getColorClass = (seconds: number): string => {
  const WARNING_THRESHOLD = 600 // 10 minutes
  const CRITICAL_THRESHOLD = 300 // 5 minutes

  if (seconds <= CRITICAL_THRESHOLD) {
    return "text-red-500"
  }
  if (seconds <= WARNING_THRESHOLD) {
    return "text-yellow-500"
  }
  return "text-green-500"
}

interface ITimerControls {
  isRunning: boolean
  setIsRunning: (value: boolean) => void
  pause: () => void
  resume: () => void
  reset: (newTime?: number) => number
}

const useTimerControls = (initialTime: number, timeRemaining: number): ITimerControls => {
  const [isRunning, setIsRunning] = useState(true)

  const pause = useCallback(() => setIsRunning(false), [])

  const resume = useCallback(() => {
    if (timeRemaining > 0) setIsRunning(true)
  }, [timeRemaining])

  const reset = useCallback((newTime?: number) => newTime ?? initialTime, [initialTime])

  return { isRunning, setIsRunning, pause, resume, reset }
}

export const useCountdown = ({
  initialTime,
  onTimeUp,
  isPaused = false
}: IUseCountdownProps): IUseCountdownReturn => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onTimeUpRef = useRef(onTimeUp)
  const controls = useTimerControls(initialTime, timeRemaining)

  // Keep onTimeUp ref updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Timer countdown effect
  useEffect(() => {
    if (controls.isRunning && timeRemaining > 0) {
      const MS_PER_SECOND = 1000
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            onTimeUpRef.current()
            return 0
          }
          return prev - 1
        })
      }, MS_PER_SECOND)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [controls.isRunning, timeRemaining])

  // Sync with external pause state
  useEffect(() => {
    controls.setIsRunning(!isPaused)
  }, [isPaused, controls])

  const WARNING_THRESHOLD = 600
  const CRITICAL_THRESHOLD = 300

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    colorClass: getColorClass(timeRemaining),
    isExpired: timeRemaining === 0,
    isWarning: timeRemaining <= WARNING_THRESHOLD && timeRemaining > CRITICAL_THRESHOLD,
    isCritical: timeRemaining <= CRITICAL_THRESHOLD && timeRemaining > 0,
    pause: controls.pause,
    resume: controls.resume,
    reset: (newTime?: number) => {
      setTimeRemaining(controls.reset(newTime))
      controls.setIsRunning(true)
    }
  }
}