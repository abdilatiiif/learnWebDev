import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Trophy, User, Clock, Star } from 'lucide-react'

export default async function DashboardPage() {
  const headersList = await headers()
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers: headersList })

  // If no user, redirect to login
  if (!user) {
    redirect('/login')
  }

  if (user.role === 'admin') {
    redirect('/admindashboard')
  }

  // Allow both users and admins to access dashboard

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Velkommen, {user.name || user.email}! 👋
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Aktive Kurs</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fullførte</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Kurs Bestilt</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Poeng</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
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
                <h2 className="text-xl font-bold text-gray-900">Mine Aktive Kurs</h2>
                <Link
                  href="/homepage/courses"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Se alle kurs →
                </Link>
              </div>

              <div className="space-y-4">
                {/* Course 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">React Fundamentals</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Lær grunnleggende React konsepter og komponenter
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: '75%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">75%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Fortsett
                      </button>
                    </div>
                  </div>
                </div>

                {/* Course 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Next.js Masterclass</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Bygg moderne webapplikasjoner med Next.js
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: '45%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">45%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Fortsett
                      </button>
                    </div>
                  </div>
                </div>

                {/* Course 3 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">TypeScript Essentials</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Mastering type safety in JavaScript
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: '20%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">20%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Fortsett
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Nylige Prestasjoner</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">First Component</p>
                    <p className="text-xs text-gray-600">Laget din første React komponent</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Week Streak</p>
                    <p className="text-xs text-gray-600">7 dager på rad med aktivitet</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Quick Learner</p>
                    <p className="text-xs text-gray-600">Fullførte 3 leksjoner i dag</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profil Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">E-post</p>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Rolle</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Student
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Medlem siden</p>
                  <p className="text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('no-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hurtighandlinger</h3>
              <div className="space-y-3">
                <Link
                  href="/homepage/courses"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium text-sm"
                >
                  Utforsk Nye Kurs
                </Link>
                <Link
                  href="/homepage/reviews"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg font-medium text-sm"
                >
                  Les Anmeldelser
                </Link>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 text-center py-2 px-4 rounded-lg font-medium text-sm">
                  Last ned Sertifikat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
