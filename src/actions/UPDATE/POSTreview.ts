'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { getCurrentUser } from '@/actions/getCurrentUser'

export interface ReviewData {
  rating: number
  comment: string
  course: string
  isFeatured: boolean
}

export async function createReview(data: ReviewData) {
  try {
    const payload = await getPayload({ config })

    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Du må være logget inn for å lage en anmeldelse',
      }
    }

    // Find the course by title
    const courseQuery = await payload.find({
      collection: 'courses',
      where: {
        title: {
          equals: data.course,
        },
      },
      limit: 1,
    })

    if (courseQuery.docs.length === 0) {
      return {
        success: false,
        error: 'Kurset ble ikke funnet',
      }
    }

    const course = courseQuery.docs[0]

    // Create the review
    const review = await payload.create({
      collection: 'courses-reviews',
      data: {
        rating: data.rating,
        comment: data.comment,
        author: currentUser.id, // Use the user's ID for relationship
        course: course.id, // Use the course's ID for relationship
        isFeatured: data.isFeatured,
      },
    })

    return {
      success: true,
      review: review,
      message: 'Anmeldelse opprettet!',
    }
  } catch (error) {
    console.error('Error creating review:', error)
    return {
      success: false,
      error: 'Noe gikk galt ved opprettelse av anmeldelse. Prøv igjen senere.',
    }
  }
}
