export interface Task {
  id: string
  title: string
  description: string | null
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface NewTask {
  title: string
  description: string | null
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
}

