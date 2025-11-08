import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedArticles() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting to seed articles...')

  try {
    // Get admin users for authors
    const users = await payload.find({ collection: 'users', where: { role: { equals: 'admin' } } })

    if (users.docs.length === 0) {
      console.log('❌ No admin users found. Please seed users first.')
      return
    }

    const articles = [
      {
        title: 'Ny Kursutvikling: React 18 Features',
        subheading: 'Lær de nyeste funksjonene i React 18',
        content:
          'React 18 introduserer mange spennende nye funksjoner som Concurrent Features, Automatic Batching, og Suspense for Server-Side Rendering. I dette kurset går vi gjennom alle de viktigste oppdateringene og hvordan du kan bruke dem i dine prosjekter. Vi dekker også best practices og vanlige fallgruver å unngå når du oppgraderer eksisterende applikasjoner til React 18. Kurset inkluderer praktiske øvelser og et fullstendig prosjekt hvor du får implementere alle de nye funksjonene.',
        image:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center',
        author: users.docs[0].id,
        likes: 24,
        comments: 8,
        isLiked: false,
      },
      {
        title: 'Student Spotlight: Maria sitt fullstack prosjekt',
        subheading: 'En inspirerende suksesshistorie fra vårt bootcamp',
        content:
          'Maria Larsen fullførte nylig vårt 12-ukers fullstack bootcamp og har allerede landet sin første utviklerjobb! I dette intervjuet deler hun sine erfaringer, utfordringer og tips for andre som vurderer å bytte karriere til tech. Hun har bygget en imponerende portefølje med React, Node.js og MongoDB prosjekter som virkelig skiller seg ut. Maria forteller om hvordan hun gikk fra å være helt ny til programmering til å mestre komplekse fullstack applikasjoner på bare tre måneder.',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&crop=center',
        author: users.docs[1] ? users.docs[1].id : users.docs[0].id,
        likes: 42,
        comments: 15,
        isLiked: true,
      },
      {
        title: 'Åpen Kode Workshop: Moderne JavaScript',
        subheading: 'Gratis workshop om ES6+ og moderne utvikling',
        content:
          'Bli med på vår månedlige åpne workshop hvor vi dekker moderne JavaScript-konsepter som ES6+, async/await, og moduler. Workshopen er åpen for alle, uavhengig av ferdighetsnivå. Vi går gjennom praktiske eksempler og du får muligheten til å jobbe med kode i sanntid. Denne måneden fokuserer vi spesielt på destructuring, spread operator, og de nyeste array-metodene. Perfekt for både nybegynnere og erfarne utviklere som vil holde seg oppdatert.',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop&crop=center',
        author: users.docs[0].id,
        likes: 18,
        comments: 5,
        isLiked: false,
      },
      {
        title: 'AI og Machine Learning kurs lansering',
        subheading: 'Utforsk fremtidens teknologi med Python og TensorFlow',
        content:
          'Vi er stolte av å lansere vårt nye AI og Machine Learning kurs! Dette omfattende programmet dekker alt fra grunnleggende konsepter til praktisk implementering med Python, TensorFlow og PyTorch. Kurset er designet for utviklere som ønsker å utvide sine ferdigheter innen kunstig intelligens og maskinlæring. Du lærer om neural networks, deep learning, computer vision og natural language processing. Inkludert er hands-on prosjekter med virkelige datasett.',
        image:
          'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=center',
        author: users.docs[1] ? users.docs[1].id : users.docs[0].id,
        likes: 67,
        comments: 22,
        isLiked: false,
      },
      {
        title: 'Hackathon 2025 Resultater',
        subheading: 'Fantastiske prosjekter fra våre studenter',
        content:
          'Vårt årlige hackathon var en enorm suksess med over 100 deltakere som konkurrerte i 48 timer. Vinnerne utviklet innovative løsninger innen bærekraft, helse og utdanning. Førsteprisen gikk til team "GreenCode" som skapte en app for å spore og redusere karbonavtrykk i hverdagen. Andreplassen gikk til "HealthTech" med deres telemedisin-plattform, mens tredjeplassen ble tatt av "EduVR" som utviklet VR-løsninger for fjernundervisning.',
        image:
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop&crop=center',
        author: users.docs[0].id,
        likes: 89,
        comments: 31,
        isLiked: true,
      },
      {
        title: 'Nye jobbmuligheter i tech-bransjen',
        subheading: 'Markedet for utviklere fortsetter å vokse',
        content:
          'Tech-bransjen fortsetter å vokse, og etterspørselen etter kvalifiserte utviklere har aldri vært høyere. I denne artikkelen ser vi på de mest ettertraktede ferdighetene i 2025, gjennomsnittslønninger for forskjellige roller, og tips for å skille seg ut i jobbsøknadsprosessen. Vi deler også historier fra våre tidligere studenter som har funnet drømmejobben sin etter å ha fullført våre kurs.',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
        author: users.docs[1] ? users.docs[1].id : users.docs[0].id,
        likes: 35,
        comments: 12,
        isLiked: false,
      },
    ]

    // Create articles (assuming we have an 'articles' collection or similar)
    // Since we don't have an articles collection, we'll skip this for now
    console.log('📝 Article data prepared (no articles collection found to seed)')

    for (const article of articles) {
      console.log(`📰 Article ready: ${article.title}`)
    }

    console.log('🎉 Articles prepared successfully!')
  } catch (error) {
    console.error('❌ Error preparing articles:', error)
  }
}

export default seedArticles

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedArticles()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
