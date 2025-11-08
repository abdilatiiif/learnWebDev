import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedReviews() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting to seed reviews...')

  try {
    // Get courses and users for relationships
    const courses = await payload.find({ collection: 'courses' })
    const users = await payload.find({ collection: 'users' })

    if (courses.docs.length === 0) {
      console.log('❌ No courses found. Please seed courses first.')
      return
    }

    if (users.docs.length === 0) {
      console.log('❌ No users found. Please seed users first.')
      return
    }

    const reviews = [
      {
        rating: 5,
        comment:
          'Fantastisk kurs! Jeg lærte så mye om React 18 og de nye funksjonene. Erik er en dyktig instruktør som forklarer komplekse konsepter på en lett forståelig måte.',
        author: users.docs.find((u) => u.email === 'maria.larsen@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('React'))?.id,
        isFeatured: true,
      },
      {
        rating: 4,
        comment:
          'Solid kurs med mye praktisk innhold. Kunne ønske meg litt mer tid på avanserte emner, men alt i alt en god opplevelse.',
        author: users.docs.find((u) => u.email === 'anders.hansen@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('JavaScript'))?.id,
        isFeatured: false,
      },
      {
        rating: 5,
        comment:
          'Utrolig grundig gjennomgang av Node.js. Prosjektoppgavene var relevante og utfordrende. Anbefaler på det sterkeste!',
        author: users.docs.find((u) => u.email === 'lisa.berg@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('Node'))?.id,
        isFeatured: true,
      },
      {
        rating: 4,
        comment:
          'Bra struktur på kurset og gode eksempler. Instruktøren var alltid tilgjengelig for spørsmål.',
        author: users.docs.find((u) => u.email === 'thomas.vikene@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('HTML'))?.id,
        isFeatured: false,
      },
      {
        rating: 5,
        comment:
          'Dette kurset endret karrieren min! Fra å være nybegynner til å få jobb som fullstack utvikler på 12 uker.',
        author: users.docs.find((u) => u.email === 'emma.nordahl@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('Fullstack'))?.id,
        isFeatured: true,
      },
      {
        rating: 4,
        comment:
          'Lærerik kurs med mye hands-on praksis. Ville anbefalt dette til alle som vil lære webutvikling.',
        author: users.docs.find((u) => u.email === 'maria.larsen@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('CSS'))?.id,
        isFeatured: false,
      },
      {
        rating: 5,
        comment:
          'Perfekt balanse mellom teori og praksis. Instruktørene er eksperter på området og deler gjerne av sin erfaring.',
        author: users.docs.find((u) => u.email === 'anders.hansen@student.no')?.id,
        course: courses.docs.find((c) => c.title?.includes('React'))?.id,
        isFeatured: true,
      },
    ]

    // Delete existing reviews
    const existingReviews = await payload.find({ collection: 'courses-reviews' })
    for (const review of existingReviews.docs) {
      await payload.delete({ collection: 'courses-reviews', id: review.id })
    }

    // Create reviews
    for (const review of reviews) {
      const randomUser = users.docs[Math.floor(Math.random() * users.docs.length)]
      const randomCourse = courses.docs[Math.floor(Math.random() * courses.docs.length)]

      if (randomUser && randomCourse) {
        const reviewData = {
          rating: review.rating,
          comment: review.comment,
          author: randomUser.id,
          course: randomCourse.id,
          isFeatured: review.isFeatured,
        }

        try {
          await payload.create({
            collection: 'courses-reviews',
            data: reviewData,
          })
          console.log(`✅ Created review: "${review.comment.substring(0, 50)}..."`)
        } catch (error) {
          console.error('❌ Error creating review:', error)
        }
      }
    }
    console.log('🎉 Reviews seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding reviews:', error)
  }
}

export default seedReviews

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedReviews()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
