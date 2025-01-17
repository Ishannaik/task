import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  } else {
    redirect('/tasks')
  }

  // This return statement will never be reached, but it's needed to satisfy TypeScript
  return null
}

