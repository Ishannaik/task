/* eslint-disable react/no-unescaped-entities */

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface FocusModeInfoProps {
  isOpen: boolean
  onClose: () => void
}

export function FocusModeInfo({ isOpen, onClose }: FocusModeInfoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Focus Mode</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          Focus Mode helps you concentrate on a single task for 25 minutes. It uses the Pomodoro Technique to boost your productivity. To use Focus Mode, click the "Start Focus" button on any task.
        </p>
      </DialogContent>
    </Dialog>
  )
}

