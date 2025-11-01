'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import React from 'react'

import { loginFormAction } from '@/actions/login'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError('')

    try {
      await loginFormAction(formData)
      // If we reach here, the server action should have redirected
      // But as a fallback, we can redirect client-side
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-3xl mx-auto absolute top-8 left-8">Logg inn</h1>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block">
              Epost
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="din@epost.no"
              required
              disabled={isLoading}
              className="bg-slate-200 outline-none border-2 focus:border-green-400"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-slate-900 font-semibold mb-2 block">
              Passord
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ditt passord"
              required
              disabled={isLoading}
              className="bg-slate-200 outline-none border-2 focus:border-green-400"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6"
          >
            {isLoading ? 'Logger inn...' : 'Login'}
            <LogIn className="ml-2 h-5 w-5" />
          </Button>
          <div>
            <Link
              href="/createAccount"
              className="block text-center border-2 text-sm border-slate-900 hover:border-slate-800 rounded-lg text-slate-900 hover:text-slate-800 font-semibold"
            >
              <p>Opprett en konto</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
export default LoginPage
