'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getMessages() {
  try {
    const payload = await getPayload({ config })

    // Hent alle kurs fra 'courses' samlingen
    const messages = await payload.find({
      collection: 'messages',
      limit: 100,
    })

    return messages.docs // Returner kun dokumentene (meldingene)
  } catch (error) {
    console.error('Get messages error:', error)
    return []
  }
}
