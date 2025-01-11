'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { TaskItem } from './task-item'
import { FocusModeInfo } from './focus-mode-info'
import type { Task } from '@/types/task'
import type { FilterType } from '@/hooks/use-tasks'

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  filter, 
  onFilterChange 
}: TaskListProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Filter Tasks</span>
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[120px] bg-background text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="ghost" 
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setIsInfoOpen(true)}
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          What&apos;s Focus Mode?
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      <FocusModeInfo 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  )
}

