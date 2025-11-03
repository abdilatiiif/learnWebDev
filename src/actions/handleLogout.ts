'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function handleLogout() {
  try {
    const cookieStore = await cookies()

    // Fjern auth token cookie
    cookieStore.delete('payload-token')

    // Revalidate relevant paths
    revalidatePath('/dashboard')
    revalidatePath('/admin')
    revalidatePath('/homepage')
    revalidatePath('/login')
    revalidatePath('/')

    console.log('Logout vellykket, cookie fjernet')

    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'Logout failed' }
  }
}
