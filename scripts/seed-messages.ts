import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedMessages() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting to seed messages...')

  try {
    const messages = [
      {
        sender: 'Maria Larsen',
        email: 'maria.larsen@student.no',
        subject: 'Spørsmål om React kurset',
        message:
          'Hei! Jeg lurer på om React kurset dekker hooks og context API? Jeg har litt erfaring med JavaScript men er ny til React.',
        isRead: false,
        priority: 'normal' as const,
      },
      {
        sender: 'Anders Hansen',
        email: 'anders.hansen@gmail.com',
        subject: 'Prisavslag for studenter?',
        message:
          'Hei, jeg er student og lurer på om dere har studentrabatt på kursene? Jeg er veldig interessert i fullstack kurset.',
        isRead: true,
        priority: 'normal' as const,
      },
      {
        sender: 'Lisa Berg',
        email: 'lisa.berg@hotmail.com',
        subject: 'Tidspunkt for neste kursstart',
        message:
          'Når starter neste runde med JavaScript grunnkurs? Jeg kan ikke finne informasjon om dette på nettsiden.',
        isRead: false,
        priority: 'high' as const,
      },
      {
        sender: 'Thomas Vikene',
        email: 'thomas.vikene@outlook.com',
        subject: 'Teknisk problem med kursmateriale',
        message:
          'Jeg har problemer med å få tilgang til video-leksjonene i Node.js kurset. Kan dere hjelpe meg?',
        isRead: true,
        priority: 'high' as const,
      },
      {
        sender: 'Emma Nordahl',
        email: 'emma.nordahl@yahoo.com',
        subject: 'Jobbmuligheter etter kurs',
        message:
          'Hei! Jeg vurderer å ta fullstack kurset og lurer på hvilke jobbmuligheter som finnes etter endt kurs. Har dere statistikk på hvor mange som får jobb?',
        isRead: false,
        priority: 'normal' as const,
      },
      {
        sender: 'Kari Nilsen',
        email: 'kari.nilsen@gmail.com',
        subject: 'Kursbevis og sertifisering',
        message:
          'Får man offisielt kursbevis etter gjennomført kurs? Er sertifikatet anerkjent av arbeidsgivere?',
        isRead: false,
        priority: 'normal' as const,
      },
      {
        sender: 'Ole Pettersen',
        email: 'ole.pettersen@hotmail.com',
        subject: 'Gruppetime og 1-til-1 veiledning',
        message:
          'Tilbyr dere individuell veiledning eller bare gruppetimer? Jeg lærer bedre med personlig oppfølging.',
        isRead: true,
        priority: 'normal' as const,
      },
      {
        sender: 'Anna Kristiansen',
        email: 'anna.kristiansen@gmail.com',
        subject: 'HASTEMELDING: Betalingsproblem',
        message:
          'Hei! Jeg prøver å betale for React kurset men får feilmelding. Kurset starter i morgen og jeg må få dette løst i dag!',
        isRead: false,
        priority: 'urgent' as const,
      },
    ]

    // Delete existing messages
    const existingMessages = await payload.find({ collection: 'messages' })
    for (const message of existingMessages.docs) {
      await payload.delete({ collection: 'messages', id: message.id })
    }

    // Create new messages
    for (const messageData of messages) {
      await payload.create({
        collection: 'messages',
        data: messageData,
      })
      console.log(`✅ Created message from ${messageData.sender}`)
    }

    console.log('🎉 Messages seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding messages:', error)
  }
}

export default seedMessages

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedMessages()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
