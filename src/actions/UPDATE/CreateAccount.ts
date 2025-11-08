'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'

export interface CreateAccountData {
  name: string
  email: string
  password: string
  type: 'user' | 'admin'
  code?: string
}

export async function createAccount(data: CreateAccountData) {
  try {
    const payload = await getPayload({ config })

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: data.email,
        },
      },
      limit: 1,
    })

    if (existingUser.docs.length > 0) {
      return {
        success: false,
        error: 'En bruker med denne e-postadressen eksisterer allerede',
      }
    }

    // Admin account creation requires a valid code
    if (data.type === 'admin') {
      const validAdminCode = process.env.ADMIN_CREATION_CODE || '9898'

      if (!data.code || data.code !== validAdminCode) {
        return {
          success: false,
          error: 'Ugyldig admin-kode',
        }
      }
    }

    // Create the user
    const newUser = await payload.create({
      collection: 'users',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.type, // Maps to 'role' field in Users collection
      },
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      message: `${data.type === 'admin' ? 'Admin' : 'Bruker'} konto opprettet!`,
    }
  } catch (error) {
    console.error('Error creating account:', error)

    return {
      success: false,
      error: 'Noe gikk galt ved opprettelse av konto. Prøv igjen senere.',
    }
  }
}
