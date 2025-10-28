import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import logo from '@/images/logo.png'
import { LogOut, Menu, User } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

function NavLinks() {
  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              <Image src={logo} alt="Logo" width={150} height={70} className="rounded-xl" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/courses" className="text-slate-600 hover:text-slate-900 transition">
                Kurs
              </Link>
              <Link href="/reviews" className="text-slate-600 hover:text-slate-900 transition">
                Anmeldelser
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
                Kontakt
              </Link>
              <Link href="/user">
                <User />
              </Link>
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
              <Link href="/courses" className="text-slate-600 hover:text-slate-900 transition">
                Kurs
              </Link>
              <Link href="/reviews" className="text-slate-600 hover:text-slate-900 transition">
                Anmeldelser
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
                Kontakt
              </Link>

              <div className="flex items-center flex-col">
                <Link href="/user" className="flex items-center gap-4 mt-4">
                  <User /> Profil
                </Link>
                <Link href="/logout" className="flex items-center gap-4 mt-4">
                  <LogOut /> Logg ut
                </Link>
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
