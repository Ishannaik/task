import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '@/app/actions'
import type { Task, NewTask } from '@/types/task'

export type FilterType = 'all' | 'completed' | 'pending'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks()
    setTasks(fetchedTasks)
  }

  const addTask = async (newTask: NewTask) => {
    const task = await createTask(newTask)
    setTasks(prevTasks => [...prevTasks, task])
  }

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      const updatedTask = await updateTask(id, { completed: !task.completed })
      setTasks(prevTasks => prevTasks.map(t => t.id === id ? updatedTask : t))
    }
  }

  const removeTask = async (id: string) => {
    await deleteTask(id)
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return {
    tasks: filteredTasks,
    addTask,
    deleteTask: removeTask,
    toggleTask,
    filter,
    setFilter,
  }
}

