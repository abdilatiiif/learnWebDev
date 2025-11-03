import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Trophy, User, Clock, Star } from 'lucide-react'

async function adminDashboardPage() {
  const headersList = await headers()
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers: headersList })

  // If no user, redirect to login
  if (!user) {
    redirect('/login')
  }

  // Only allow admin users to access this page
  if (user.role !== 'admin') {
    redirect('/dashboard') // Redirect non-admin users to regular dashboard
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className=" rounded-xl shadow-lg p-6 mb-8 bg-orange-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Velkommen, {user?.name || user?.email}! (Admin)
              </h1>
              <p className="text-gray-600">Her er en oversikt over din læringsreise</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-100 rounded-full p-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mine Aktive Oppgaver</h2>
                <Link
                  href="/students"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Se alle studenter →
                </Link>
              </div>

              <div className="space-y-4">
                {/* påmelding 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">@Kurs navn</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Hvem ønsker plass for dette kurset?
                      </p>
                      <p>Navn: Ola Nordmann</p>
                      <div className="flex items-center space-x-4">
                        antall plasser tilgjengelig: 5 / 20
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <button className="bg-blue-600 hover:bg-green-300 hover:text-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Aksepter
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg text-sm font-medium">
                        Avslå
                      </button>
                    </div>
                  </div>
                </div>

                {/* påmelding 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">@Kurs navn</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Hvem ønsker plass for dette kurset?
                      </p>
                      <p>Navn: Ola Nordmann</p>
                      <div className="flex items-center space-x-4">
                        antall plasser tilgjengelig: 5 / 20
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <button className="bg-blue-600 hover:bg-green-300 hover:text-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Aksepter
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg text-sm font-medium">
                        Avslå
                      </button>
                    </div>
                  </div>
                </div>

                {/* påmelding 3 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">@Kurs navn</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Hvem ønsker plass for dette kurset?
                      </p>
                      <p>Navn: Ola Nordmann</p>
                      <div className="flex items-center space-x-4">
                        antall plasser tilgjengelig: 5 / 20
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <button className="bg-blue-600 hover:bg-green-300 hover:text-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Aksepter
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-lg text-sm font-medium">
                        Avslå
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Nylige varsler</h3>
              <ul>
                <li>melding 1</li>
                <li>melding 2</li>
                <li>melding 3</li>
              </ul>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profil Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">E-post</p>
                  <p className="text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Rolle</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Admin handlinger</h3>
              <div className="space-y-3">
                kommer Admin linker her
                <Link href="/admindashboard/courses">
                  <button className="w-full text-left">Kurs</button>
                </Link>
                <Link href="/admindashboard/enrollments">
                  <button className="w-full text-left">Påmeldinger</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default adminDashboardPage
