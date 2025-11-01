'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getCurrentUser() {
  const payload = await getPayload({ config })
  

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')

    if (!token) {
      return null
    }

    // Du kan også bare returnere at token eksisterer
    // uten å verifisere det med Payload hver gang
    return { hasToken: true, token: token.value }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}
