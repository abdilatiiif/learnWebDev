'use server'

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getCurrentUser() {
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

// Alternativ funksjon som verifiserer token med Payload
export async function verifyCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')

    if (!token) {
      return null
    }

    const payload = await getPayload({ config })

    // Finn bruker basert på token
    const users = await payload.find({
      collection: 'users',
    })

    return users.docs[0] || null
  } catch (error) {
    console.error('Verify current user error:', error)
    return null
  }
}
