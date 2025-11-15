import { getPayload } from 'payload'
import config from '../src/payload.config'
import seedUsers from './seed-users'
import seedReviews from './seed-reviews'
import seedMessages from './seed-messages'
import seedArticles from './seed-articles'
import { seedHero } from './seed-hero'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function seedAll() {
  console.log('🌱 Starting to seed all data...')
  console.log('==================================\n')

  try {
    // Seed in order: users first, then content that references users
    await seedUsers()
    console.log('\n')

    await seedReviews()
    console.log('\n')

    await seedMessages()
    console.log('\n')

    await seedArticles()
    console.log('\n')

    await seedHero()
    console.log('\n')

    console.log('🎉 All data seeded successfully!')
    console.log('==================================')
    console.log('\n📋 QUICK ACCESS CREDENTIALS:')
    console.log('Admin: admin1@learnwebdev.no / Admin123!')
    console.log('Student: maria.larsen@student.no / Student123!')
    console.log('\nSee README.md for all credentials')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAll()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seedAll
