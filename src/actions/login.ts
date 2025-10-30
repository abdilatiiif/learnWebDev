'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function login(credentials: { email: string; password: string }) {
  const { email, password } = credentials

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  try {
    const payload = await getPayload({ config })

    // Bruk Payload's innebygde login metode
    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    // Sett token som cookie
    if (result.token) {
      const cookieStore = await cookies()

      // Sett auth token som httpOnly cookie for sikkerhet
      cookieStore.set('payload-token', result.token, {
        httpOnly: true, // Forhindrer JavaScript tilgang (XSS beskyttelse)
        secure: process.env.NODE_ENV === 'production', // HTTPS i produksjon
        sameSite: 'lax', // CSRF beskyttelse
        maxAge: 60 * 60 * 24 * 7, // 7 dager
        path: '/', // Tilgjengelig på hele nettsiden
      })

      console.log('Login vellykket, token satt som cookie')
    }

    console.log('Login resultat:', result)
    return { success: true, message: 'Login successful', user: result.user }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Invalid credentials' }
  }
}

// Få alle brukere uten filter
