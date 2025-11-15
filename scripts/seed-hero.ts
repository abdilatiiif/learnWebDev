import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export const seedHero = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding Hero data...')

  try {
    // Rens existing hero data
    const existingHero = await payload.find({
      collection: 'hero',
    })

    for (const hero of existingHero.docs) {
      await payload.delete({
        collection: 'hero',
        id: hero.id,
      })
    }

    // Create new hero entries
    const heroData = [
      {
        title: 'Lær Web Development',
        subtitle: 'Fra nybegynner til fullstack-utvikler med våre praktiske kurs',
        image_url:
          'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ctaText: 'Se alle kurs',
        ctaLink: '/courses',
        isActive: true,
      },
      {
        title: 'Moderne Frontend Utvikling',
        subtitle: 'Lær React, Next.js og Tailwind CSS fra bunnen av',
        image_url:
          'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ctaText: 'Start nå',
        ctaLink: '/courses',
        isActive: false,
      },
      {
        title: 'Backend og API Utvikling',
        subtitle: 'Bygg sikre og skalerbare backend-systemer med Node.js',
        image_url:
          'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ctaText: 'Lær mer',
        ctaLink: '/courses',
        isActive: false,
      },
    ]

    for (const hero of heroData) {
      await payload.create({
        collection: 'hero',
        data: hero,
      })
      console.log(`✅ Created hero: ${hero.title}`)
    }

    console.log('✅ Hero seeding completed!')
  } catch (error) {
    console.error('❌ Error seeding hero:', error)
  }

  process.exit(0)
}

seedHero()
