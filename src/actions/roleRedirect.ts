'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function redirectBasedOnRole() {
  try {
    const headersList = await headers()
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      redirect('/login')
    }

    if (user.role === 'admin') {
      console.log('Redirecting to /admindashboard for admin user')
      redirect('/admindashboard')
    } else {
      redirect('/dashboard')
    }
  } catch (error) {
    console.error('Error in role redirect:', error)
    redirect('/login')
  }
}
