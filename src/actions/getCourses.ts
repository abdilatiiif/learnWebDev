'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getCourses() {
  try {
    const payload = await getPayload({ config })

    // Hent alle kurs fra 'courses' samlingen
    const courses = await payload.find({
      collection: 'courses',
      limit: 100,
    })

    return courses.docs // Returner kun dokumentene (kursene)
  } catch (error) {
    console.error('Get courses error:', error)
    return []
  }
}
