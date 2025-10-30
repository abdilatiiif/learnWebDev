import LogoutButton from '@/components/LogoutButton'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Velkommen!</h2>
          <p className="text-slate-600">Du er nå innlogget.</p>
        </div>
      </div>
    </div>
  )
}
