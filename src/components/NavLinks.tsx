import Link from 'next/link'
import Image from 'next/image'
import logo from '@/images/logo.png'
import { Menu, User, LayoutDashboard } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { headers as getHeaders } from 'next/headers.js'

import { getPayload } from 'payload'
import React from 'react'
import payloadConfig from '@/payload.config'
import LogoutButton from './LogoutButton'

async function NavLinks() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  console.log('NavLinks bruker:', user)

  // Get the current pathname from headers
  const pathname = headers.get('x-pathname') || headers.get('referer') || ''

  // 'http://localhost:3000/homepage/dashboard'
  console.log('NavLinks pathname:', pathname)

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/homepage"
              className="text-2xl font-bold text-slate-900 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
            >
              <Image src={logo} alt="Logo" width={150} height={70} className="rounded-xl" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/homepage/courses"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
              >
                Kurs
              </Link>
              <Link
                href="/homepage/reviews"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
              >
                Anmeldelser
              </Link>
              <Link
                href="/homepage/contact"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
              >
                Kontakt
              </Link>
              <div className="flex items-center gap-4">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* mobile nav from sheet */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger>
            <Menu size={50} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex flex-col items-center">
              <SheetTitle className="text-2xl font-bold border-b w-full text-center border-slate-200 pb-2 mb-4">
                Menu
              </SheetTitle>
              <Link href="/" className="text-2xl font-bold text-slate-900">
                <Image src={logo} alt="Logo" width={150} height={70} className="rounded-xl" />
              </Link>
              <Link
                href="/courses"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-out hover:scale-105"
              >
                Kurs
              </Link>
              <Link
                href="/reviews"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-out hover:scale-105"
              >
                Anmeldelser
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 ease-in-out hover:scale-105"
              >
                Kontakt
              </Link>
              <div className="flex items-center flex-col">
                <Link
                  href="/dashboard"
                  className="text-slate-600 flex hover:text-slate-900 transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <User /> Profil
                </Link>
                <div className="flex items-center gap-4 mt-4">{user && <LogoutButton />}</div>
              </div>
            </SheetHeader>

            <SheetFooter className="mx-auto">
              <Link className="text-slate-600 hover:text-slate-900 transition" href="/">
                Terms of Service
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
export default NavLinks
