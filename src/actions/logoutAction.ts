'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  try {
    const cookieStore = await cookies()

    // Fjern alle auth-relaterte cookies
    cookieStore.delete('payload-token')
    cookieStore.delete('payload-user')
    
    // Revalidate relevant paths
    revalidatePath('/')
    revalidatePath('/login')
    revalidatePath('/dashboard')
    revalidatePath('/admindashboard')
    revalidatePath('/homepage')

    console.log('Logout vellykket, cookies fjernet')

  } catch (error) {
    console.error('Logout error:', error)
  }
  
  // Redirect til login siden
  redirect('/login')
}