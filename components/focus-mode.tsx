/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useState, useEffect } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import type { Task } from '@/types/task'

interface FocusModeProps {
  task: Task
  isOpen: boolean
  onClose: () => void
}

export function FocusMode({ task, isOpen, onClose }: FocusModeProps) {
  const [focusTime, setFocusTime] = useState(25); // Default focus time in minutes
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1
          setProgress((((focusTime * 60) - newTime) / (focusTime * 60)) * 100)
          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setProgress(100)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, timeLeft])

  const handleStart = () => {
    setIsActive(true)
  }

  const handleReset = () => {
    setIsActive(false)
    setTimeLeft(focusTime * 60)
    setProgress(0)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Focus Mode</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 px-2 border rounded-lg">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
          <div className="flex justify-center">
            <span className="text-6xl font-bold tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Set Focus Time (minutes)
            </label>
            <input
              type="number"
              value={focusTime}
              onChange={(e) => {
                const newTime = Math.max(1, parseInt(e.target.value) || 1);
                setFocusTime(newTime);
                setTimeLeft(newTime * 60);
              }}
              className="w-full p-2 border rounded bg-background text-foreground"
              placeholder="Enter focus time in minutes"
              min="1"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleStart}
              disabled={isActive}
              className="w-24"
            >
              <Play className="mr-2 h-4 w-4" />
              Start
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-24"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

