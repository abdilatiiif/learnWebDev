import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function seedCourses() {
  const payload = await getPayload({ config })

  try {
    // Sjekk om course allerede eksisterer
    const existingCourse = await payload.find({
      collection: 'courses',
      where: {
        title: {
          equals: 'Modern Frontend Development',
        },
      },
    })

    if (existingCourse.docs.length > 0) {
      console.log('Course already exists!')
      return
    }

    // Opprett ny course med riktige felt fra Courses collection
    const coursesData = [
      {
        title: 'Modern Frontend Development',
        description:
          'Lær React, Next.js, og Tailwind CSS. Bygg moderne, responsive webapplikasjoner fra bunnen av.',
        category: 'frontend' as const,
        price: 2999,
        duration: '8 uker',
        level: 'beginner' as const,
        image_url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
        isActive: true,
        enrollments: 50,
      },
      {
        title: 'Advanced React & TypeScript',
        description:
          'Dykk dypt inn i React patterns, hooks, context, og TypeScript for profesjonelle applikasjoner.',
        category: 'frontend' as const,
        price: 3499,
        duration: '10 uker',
        level: 'advanced' as const,
        image_url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
        isActive: true,
        enrollments: 10,
      },
      {
        title: 'Backend Mastery with Node.js',
        description: 'Bygg skalerbare backend-løsninger med Node.js, Express, og PostgreSQL.',
        category: 'backend' as const,
        price: 3299,
        duration: '10 uker',
        level: 'intermediate' as const,
        image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        isActive: true,
        enrollments: 15,
      },
      {
        title: 'API Development & Authentication',
        description: 'Lær å bygge sikre RESTful APIs med autentisering og autorisasjon.',
        category: 'backend' as const,
        price: 2799,
        duration: '6 uker',
        level: 'intermediate' as const,
        image_url: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
        isActive: true,
        enrollments: 25,
      },
      {
        title: 'Fullstack Web Development Bootcamp',
        description: 'Komplett kurs fra frontend til backend. Bli fullstack-utvikler på 12 uker.',
        category: 'fullstack' as const,
        price: 4999,
        duration: '12 uker',
        level: 'beginner' as const,
        image_url: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
        isActive: true,
        enrollments: 30,
      },
      {
        title: 'Complete MERN Stack Developer',
        description: 'MongoDB, Express, React, og Node.js. Bygg og deploy fullstack-applikasjoner.',
        category: 'fullstack' as const,
        price: 4499,
        duration: '14 uker',
        level: 'intermediate' as const,
        image_url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
        isActive: true,
        enrollments: 20,
      },
    ]

    for (const courseData of coursesData) {
      const newCourse = await payload.create({
        collection: 'courses',
        data: courseData,
      })
      console.log('Course created successfully:', newCourse.id)
    }
  } catch (error) {
    console.error('Error creating course:', error)
  }
}

// Kjør seed
seedCourses()
