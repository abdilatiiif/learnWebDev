'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleLogout() {
  try {
    const cookieStore = await cookies()
    
    // Fjern auth token cookie
    cookieStore.delete('payload-token')
    
    console.log('Logout vellykket, cookie fjernet')
    
    // Redirect til login siden
    redirect('/login')
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('Logout failed')
  }
}
