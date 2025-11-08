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

  const pathname = headers.get('x-pathname') || headers.get('referer') || ''

  console.log('NavLinks pathname:', pathname)

  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/homepage"
              className="text-2xl font-bold text-slate-900 hover:text-slate-900 transition-all duration-300 ease-in-out hover:border-b-2 border-blue-600 pb-1 transform hover:scale-105"
            >
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={56}
                className="rounded-xl sm:w-[150px] sm:h-[70px]"
              />
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

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                  <SheetHeader className="text-left border-b border-slate-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image src={logo} alt="Logo" width={40} height={32} className="rounded-lg" />
                      <SheetTitle className="text-xl font-bold text-slate-900">
                        LearnWebDev
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col space-y-4">
                    <SheetClose asChild>
                      <Link
                        href="/homepage/courses"
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          📚
                        </div>
                        Kurs
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/homepage/reviews"
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          ⭐
                        </div>
                        Anmeldelser
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/homepage/contact"
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          📧
                        </div>
                        Kontakt
                      </Link>
                    </SheetClose>

                    <div className="border-t border-slate-200 pt-4 mt-4">
                      {user ? (
                        <div className="space-y-3">
                          <SheetClose asChild>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                            >
                              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <LayoutDashboard size={16} />
                              </div>
                              Dashboard
                            </Link>
                          </SheetClose>
                          <div className="px-4">
                            <LogoutButton />
                          </div>
                        </div>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href="/login"
                            className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <User size={16} />
                            </div>
                            Login
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </div>

                  <SheetFooter className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs text-slate-500 text-center">
                      © 2025 LearnWebDev. Alle rettigheter reservert.
                    </p>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default NavLinks
