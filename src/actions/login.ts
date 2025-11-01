'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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

      // Revalidate paths to ensure fresh data
      revalidatePath('/dashboard')
      revalidatePath('/admin')
      revalidatePath('/homepage')

      // Check user role and redirect accordingly
      if (result.user.role === 'admin') {
        redirect('/admin')
      } else {
        redirect('/dashboard')
      }
    }

    console.log('Login resultat:', result)
    return { success: true, message: 'Login successful', user: result.user }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'Invalid credentials' }
  }
}

export async function loginFormAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  try {
    await login({ email, password })
  } catch (error) {
    console.error('Login form action error:', error)
    throw error
  }
}

// Få alle brukere uten filter
