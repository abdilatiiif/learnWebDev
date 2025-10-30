'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

import { login } from '@/actions/login'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    try {
      await login(formData as { email: string; password: string })
    } catch (error) {
      setSubmitted(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <h1 className="text-3xl mx-auto absolute top-8 left-8">Logg inn</h1>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block">
              Epost
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="din@epost.no"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Ditt passord"
              required
              className="bg-slate-200 outline-none border-2 focus:border-green-400"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6"
          >
            Login <LogIn className="ml-2 h-5 w-5" />
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
