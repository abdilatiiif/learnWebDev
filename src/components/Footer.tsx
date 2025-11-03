import Link from 'next/link'
import LogoutButton from './LogoutButton'

function Footer() {
  return (
    <footer className=" relative bg-slate-900 text-white py-12 px-6">
      <span className="absolute top-4 right-4 text-black">
        <LogoutButton />{' '}
      </span>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="flex items-center flex-col text-center">
            <h3 className="text-2xl font-bold mb-4">LearnWebDev</h3>
            <p className="text-slate-400">Din reise til å bli webutvikler starter her.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kurs</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/homepage/courses" className="hover:text-white transition">
                  Frontend
                </Link>
              </li>
              <li>
                <Link href="/homepage/courses" className="hover:text-white transition">
                  Backend
                </Link>
              </li>
              <li>
                <Link href="/homepage/courses" className="hover:text-white transition">
                  Fullstack
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Selskap</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/homepage/reviews" className="hover:text-white transition">
                  Anmeldelser
                </Link>
              </li>
              <li>
                <Link href="/homepage/contact" className="hover:text-white transition">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Følg Oss</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2025 LearnWebDev. Alle rettigheter reservert. Latif Hassan</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
