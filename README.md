# LearnWebDev - Modern Learning Management System

Inspirert av Moodle - https://lms.gokstadakademiet.no/login/index.php

link til prosjektet:  https://learn-web-dev-latif.vercel.app/homepage

## Utviklingsmiljø Oppsett

### Forutsetninger

- Node.js 18+
- pnpm / npm
- postgresql

### Installasjon

```bash
# Klon repository
git clone 'sjekk i innleveringsmappen'
cd learnWebDev

# Installer avhengigheter
pnpm install

# Sett opp miljøvariabler
cp .env.example .env.local
# Rediger .env.local med dine database kredentialer

# Start utviklingsserver
pnpm dev
```

## Seed Data og Test Kontoer

For testing og utvikling har jeg fylt databasen med test data:

# Seed alle data

PAYLOAD_SECRET=**\*\***\*\*\***\*\*** DATABASE_URI=file:./.db pnpm run seed:all

pnpm run seed:all

# Eller seed individuelt hvis all ikke funker, ta med .env 
DATABASE_URI=postgresql://neondb_owner:*********@**************.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
PAYLOAD_SECRET=***************
ADMIN_CODE=(kommer i innleverings pdfen)

pnpm run seed:users
pnpm run seed:reviews
pnpm run seed:messages
pnpm run seed:articles

### 👨‍💼 Admin Kontoer

| Email                 | Passord   | Navn            |
| --------------------- | --------- | --------------- |
| admin1@learnwebdev.no | Admin123! | Lars Hansen     |
| admin2@learnwebdev.no | Admin456! | Ingrid Sørensen |

### 👨‍🎓 Student Kontoer

| Email                     | Passord     | Navn           |
| ------------------------- | ----------- | -------------- |
| maria.larsen@student.no   | Student123! | Maria Larsen   |
| erik.berg@student.no      | Student456! | Erik Berg      |
| anna.nilsen@student.no    | Student789! | Anna Nilsen    |
| thomas.olsen@student.no   | Student012! | Thomas Olsen   |
| sofie.andersen@student.no | Student345! | Sofie Andersen |

## Teknisk Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Payload CMS
- **Database**: MongoDB

## Prosjektstruktur

src/
├── app/ # Next.js App Router
│ ├── (frontend)/ # Frontend pages
│ │ ├── homepage/ # Homepage og undersider
│ │ └── (authentication)/ # Login/registrering
│ └── (payload)/ # Payload CMS admin
├── collections/ # Payload CMS collections
├── components/ # React komponenter
│ └── ui/ # shadcn/ui komponenter
└── lib/ # Utilities og helper funksjoner

scripts/ # Seed scripts for test data
tests/ # E2E og integrasjonstester

## Utvikling

# Start utviklingsserver

pnpm dev

# Kjør tester

pnpm test # Unit tests

# Linting og formatering

pnpm lint
pnpm format

# Build for produksjon

pnpm build
pnpm start

## Collections (Database Modeller)

- **Users**: Brukere (admin/student roller)
- **Courses**: Kurs informasjon
- **CoursesReviews**: Kurs vurderinger og anmeldelser
- **Messages**: Kontakt skjema meldinger
- **Media**: Fil upload og media håndtering
- **Hero**: Homepage hero seksjon
- **Enroll**: Kurs påmeldinger
- **Likes**: Like system for innhold

## Funksjonalitet

- 🔐 **Autentisering**: Login/registrering system -> den lagrer tokens hvis innlogget, du er forsatt logget inn selvom du lukker siden
- 👥 **Roller**: Admin og student tilganger -> krever tilgangs kode for admins creation
- 📚 **Kurs**: Kurs oversikt og detaljer
- ⭐ **Vurderinger**: Kurs anmeldelser og ratings
- 💬 **Meldinger**: Kontakt skjema -> Alle kan sende melding: kommer til admin. trenger ikke være inn logget
- 📱 **Responsiv**: Mobile-first design
- 🎨 **Moderne UI**: shadcn/ui komponenter

## Endre hero

- bruk bilder fra https://unsplash.com

## Legge til kurs / endre Kurs

- kun admins kan endre : dashboard -> admin handlinger -> du kommer til ønsket link

## Tiltenkt funsksjonaliteter

- Etter en elev signer opp, kommer det meldingsvarsel til admin og godkjenner plassen
- Chatbox mellom admin og elev
- Videre utvidelse av 'Tavla' der lærere legge ut viktige beskjeder
- påmeldingsplasser oppdateres etter ledige plasser realtime.
- Kan kunn gi review hvis du har/hatt kurset før.
