import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function seedUsers() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting to seed users...')

  try {
    // Admin users
    const adminUsers = [
      {
        email: 'admin1@learnwebdev.no',
        password: 'Admin123!',
        role: 'admin' as const,
        name: 'Lars Hansen',
      },
      {
        email: 'admin2@learnwebdev.no',
        password: 'Admin456!',
        role: 'admin' as const,
        name: 'Ingrid Sørensen',
      },
    ]

    // Student users
    const studentUsers = [
      {
        email: 'maria.larsen@student.no',
        password: 'Student123!',
        role: 'user' as const,
        name: 'Maria Larsen',
      },
      {
        email: 'erik.berg@student.no',
        password: 'Student456!',
        role: 'user' as const,
        name: 'Erik Berg',
      },
      {
        email: 'anna.nilsen@student.no',
        password: 'Student789!',
        role: 'user' as const,
        name: 'Anna Nilsen',
      },
      {
        email: 'thomas.olsen@student.no',
        password: 'Student012!',
        role: 'user' as const,
        name: 'Thomas Olsen',
      },
      {
        email: 'sofie.andersen@student.no',
        password: 'Student345!',
        role: 'user' as const,
        name: 'Sofie Andersen',
      },
    ]

    const allUsers = [...adminUsers, ...studentUsers]

    // Create users
    for (const userData of allUsers) {
      try {
        // Check if user already exists
        const existingUser = await payload.find({
          collection: 'users',
          where: { email: { equals: userData.email } },
        })

        if (existingUser.docs.length > 0) {
          console.log(`👤 User ${userData.email} already exists, skipping...`)
          continue
        }

        const user = await payload.create({
          collection: 'users',
          data: userData,
        })

        console.log(`✅ Created ${userData.role}: ${userData.name} (${userData.email})`)
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error)
      }
    }

    console.log('🎉 Users seeded successfully!')

    // Display summary
    console.log('\n📋 USER CREDENTIALS SUMMARY:')
    console.log('============================')
    console.log('\n👨‍💼 ADMIN USERS:')
    adminUsers.forEach((user) => {
      console.log(`  📧 ${user.email}`)
      console.log(`  🔑 ${user.password}`)
      console.log(`  👤 ${user.name}`)
      console.log('  ---')
    })

    console.log('\n👨‍🎓 STUDENT USERS:')
    studentUsers.forEach((user) => {
      console.log(`  📧 ${user.email}`)
      console.log(`  🔑 ${user.password}`)
      console.log(`  👤 ${user.name}`)
      console.log('  ---')
    })
  } catch (error) {
    console.error('❌ Error seeding users:', error)
  }
}

export default seedUsers

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsers()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
