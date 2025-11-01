import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import HeroComponent from '@/components/HeroComponent'

async function Homepage() {
  // Hent Hero data fra Payload CMS
  const payload = await getPayload({ config })

  try {
    // Hent alle hero sections som er aktive
    const heroResult = await payload.find({
      collection: 'hero',
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 1, // Bare hent den første aktive hero section
    })

    const heroData = heroResult.docs[0]

    console.log('Hentet hero data:', heroData)

    return (
      <div className="homepage">
        {/* Hero Section */}
        {heroData && (
          <HeroComponent
            title={heroData.title}
            subtitle={heroData.subtitle}
            backgroundImage={heroData.backgroundImage}
            ctaText={heroData.ctaText}
            ctaLink={heroData.ctaLink}
          />
        )}

        {/* Additional Content Sections */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Læring</h3>
              <p className="text-gray-600">Utforsk våre omfattende kurs innen webutvikling</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Praksis</h3>
              <p className="text-gray-600">Få hands-on erfaring med reelle prosjekter</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Karriere</h3>
              <p className="text-gray-600">Bygg din fremtid som webutvikler</p>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching hero data:', error)

    // Fallback content hvis det oppstår en feil
    return (
      <div className="homepage min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Velkommen til LearnWebDev</h1>
          <p className="text-xl text-gray-600 mb-8">Lær webutvikling med oss</p>
          <Link
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg"
          >
            Se våre kurs
          </Link>
        </div>
      </div>
    )
  }
}

export default Homepage

// link til hero.ts til homepage
