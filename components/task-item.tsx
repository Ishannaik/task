'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Target } from 'lucide-react'
import { FocusMode } from './focus-mode'
import type { Task } from '@/types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false)

  return (
    <>
      <div className="bg-card rounded-lg shadow-md p-4 flex items-start justify-between border border-border">
        <div className="flex items-start space-x-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
          />
          <div className="space-y-1">
            <h3
              className={`font-medium ${
                task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Due: {format(task.dueDate, 'yyyy-MM-dd')}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-primary"
            onClick={() => setIsFocusModeOpen(true)}
          >
            <Target className="w-4 h-4 mr-1" />
            Focus
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive"
          >
            Delete
          </Button>
        </div>
      </div>

      <FocusMode
        task={task}
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
      />
    </>
  )
}

