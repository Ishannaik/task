'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { TaskForm } from '@/components/task-form'
import { TaskList } from '@/components/task-list'
import { useTasks } from '@/hooks/use-tasks'
import { Button } from '@/components/ui/button'
import type { NewTask } from '@/types/task'

export default function TaskManager() {
  const { tasks, addTask, deleteTask, toggleTask, filter, setFilter } = useTasks()
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
  })

  const handleAddTask = async () => {
    await addTask(newTask)
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <Button onClick={() => signOut({ callbackUrl: '/login' })}>Sign Out</Button>
      </div>
      <TaskForm
        newTask={newTask}
        onTaskChange={setNewTask}
        onSubmit={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  )
}

