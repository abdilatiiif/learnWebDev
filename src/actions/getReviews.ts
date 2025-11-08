'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getReviews() {
  try {
    const payload = await getPayload({ config })
    const reviews = await payload.find({
      collection: 'courses-reviews',
      limit: 100,
    })
    return reviews.docs
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw new Error('Failed to fetch reviews')
  }
}
