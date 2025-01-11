'use server'

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "@/lib/auth"
import { hash } from "bcrypt"
import { NewTask, Task } from "@/types/task"

export async function createUser(data: { name: string; email: string; password: string }) {
  const hashedPassword = await hash(data.password, 10)
  
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  })

  return { id: user.id, name: user.name, email: user.email }
}

export async function createTask(newTask: NewTask): Promise<Task> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create tasks")
  }

  const task = await prisma.task.create({
    data: {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      userId: session.user.id,
    },
  })

  revalidatePath("/tasks")
  return task as Task
}

export async function getTasks(): Promise<Task[]> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return []
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return tasks as Task[]
}

export async function updateTask(taskId: string, data: { completed?: boolean }): Promise<Task> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error("You must be logged in to update tasks")
  }

  const task = await prisma.task.update({
    where: {
      id: taskId,
      userId: session.user.id,
    },
    data,
  })

  revalidatePath("/tasks")
  return task as Task
}

export async function deleteTask(taskId: string): Promise<void> {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete tasks")
  }

  await prisma.task.delete({
    where: {
      id: taskId,
      userId: session.user.id,
    },
  })

  revalidatePath("/tasks")
}

