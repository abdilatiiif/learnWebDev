import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen,
  Trophy,
  User,
  Clock,
  Star,
  Mail,
  Calendar,
  MessageSquare,
  Check,
  AlertCircle,
  GraduationCap,
  Users,
  CheckCircle,
  XCircle,
  UserPlus,
  PanelsTopLeft,
  Library,
  NotebookPen,
} from 'lucide-react'
import { getMessages } from '@/actions/getMessages'

// Function to get capacity badge styling based on enrollment ratio
function getCapacityBadgeStyle(enrolled: number, total: number) {
  const ratio = enrolled / total

  if (ratio <= 0.5) {
    // Green: 50% or less filled (plenty of spots)
    return {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      status: 'Mange plasser',
    }
  } else if (ratio <= 0.8) {
    // Yellow: 51-80% filled (filling up)
    return {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      status: 'Fyller seg opp',
    }
  } else if (ratio < 1) {
    // Orange: 81-99% filled (almost full)
    return {
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      status: 'Nesten full',
    }
  } else {
    // Red: 100% filled (full)
    return {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      status: 'Full',
    }
  }
}

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

  const messages = await getMessages()

  console.log('Admin Dashboard Messages:', messages)

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
                <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:from-purple-100 hover:to-pink-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Course header with icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-500 rounded-full p-2">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">React Fundamentals</h3>
                          <p className="text-sm text-purple-600 font-medium">Ny påmelding</p>
                        </div>
                      </div>

                      {/* Student info */}
                      <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-purple-400">
                        <div className="flex items-center space-x-2 mb-2">
                          <UserPlus className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-800">Ola Nordmann</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ønsker plass på React Fundamentals kurset
                        </p>

                        {/* Capacity info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Kapasitet:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const enrolled = 5
                              const total = 20
                              const style = getCapacityBadgeStyle(enrolled, total)
                              return (
                                <div
                                  className={`${style.bgColor} ${style.textColor} px-2 py-1 rounded-full text-xs font-medium`}
                                >
                                  {enrolled} / {total} plasser
                                </div>
                              )
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="ml-6 flex flex-col gap-3">
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <CheckCircle className="h-4 w-4" />
                        <span>Aksepter</span>
                      </button>
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <XCircle className="h-4 w-4" />
                        <span>Avslå</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* påmelding 2 */}
                <div className="bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:from-blue-100 hover:to-cyan-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Course header with icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-500 rounded-full p-2">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">Next.js Masterclass</h3>
                          <p className="text-sm text-blue-600 font-medium">Ny påmelding</p>
                        </div>
                      </div>

                      {/* Student info */}
                      <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                        <div className="flex items-center space-x-2 mb-2">
                          <UserPlus className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-800">Kari Hansen</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ønsker plass på Next.js Masterclass kurset
                        </p>

                        {/* Capacity info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Kapasitet:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const enrolled = 12
                              const total = 15
                              const style = getCapacityBadgeStyle(enrolled, total)
                              return (
                                <div
                                  className={`${style.bgColor} ${style.textColor} px-2 py-1 rounded-full text-xs font-medium`}
                                >
                                  {enrolled} / {total} plasser
                                </div>
                              )
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="ml-6 flex flex-col gap-3">
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <CheckCircle className="h-4 w-4" />
                        <span>Aksepter</span>
                      </button>
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <XCircle className="h-4 w-4" />
                        <span>Avslå</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* påmelding 3 */}
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:from-emerald-100 hover:to-teal-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Course header with icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-emerald-500 rounded-full p-2">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">TypeScript Essentials</h3>
                          <p className="text-sm text-emerald-600 font-medium">Ny påmelding</p>
                        </div>
                      </div>

                      {/* Student info */}
                      <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-emerald-400">
                        <div className="flex items-center space-x-2 mb-2">
                          <UserPlus className="h-4 w-4 text-gray-600" />
                          <span className="font-semibold text-gray-800">Erik Olsen</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ønsker plass på TypeScript Essentials kurset
                        </p>

                        {/* Capacity info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Kapasitet:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const enrolled = 18
                              const total = 20
                              const style = getCapacityBadgeStyle(enrolled, total)
                              return (
                                <div
                                  className={`${style.bgColor} ${style.textColor} px-2 py-1 rounded-full text-xs font-medium`}
                                >
                                  {enrolled} / {total} plasser
                                </div>
                              )
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="ml-6 flex flex-col gap-3">
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <CheckCircle className="h-4 w-4" />
                        <span>Aksepter</span>
                      </button>
                      <button className="inline-flex items-center space-x-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                        <XCircle className="h-4 w-4" />
                        <span>Avslå</span>
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
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:from-blue-100 hover:to-indigo-100"
                    >
                      {/* Header with sender info */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-500 rounded-full p-2">
                            <Mail className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {message.sender}
                            </h4>
                            <p className="text-xs text-blue-600 flex items-center">
                              <span className="mr-1">✉</span>
                              {message.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(message.createdAt).toLocaleDateString('no-NO')}</span>
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-gray-800 text-sm">
                            {message.subject}
                          </span>
                        </div>
                      </div>

                      {/* Message content */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-700 leading-relaxed bg-white rounded-md p-3 border-l-4 border-blue-400">
                          {message.message}
                        </p>
                      </div>

                      {/* Action button */}
                      <div className="flex justify-end">
                        <button className="inline-flex items-center space-x-2 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                          <Check className="h-3 w-3" />
                          <span>Marker som lest</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Ingen meldinger ennå</p>
                  </div>
                )}
              </div>
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
              <div className="space-y-3 flex flex-col gap-2">
                <Link href="/admin/collections/hero/create">
                  <button className="w-full cursor-pointer text-lg flex items-center justify-center bg-green-500 rounded-2xl p-2">
                    Endre (HERO) <PanelsTopLeft />
                  </button>
                </Link>
                <Link href="/admin/collections/courses/create">
                  <button className="w-full cursor-pointer text-lg flex items-center justify-center bg-blue-300 rounded-2xl p-2">
                    Legge til (KURS) <Library />
                  </button>
                </Link>

                <Link href="/admin/collections/courses?limit=10">
                  <button className="w-full cursor-pointer text-lg flex items-center justify-center bg-blue-300 rounded-2xl p-2">
                    Endre (KURS) <NotebookPen />
                  </button>
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
