'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn, Terminal, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import React from 'react'
import grantAdmin from '@/actions/grantAdmin'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { createAccount } from '@/actions/UPDATE/CreateAccount'

function CreateAccountPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'user' as 'user' | 'admin',
    code: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [melding, setMelding] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    try {
      let result

      // Handle admin creation with prompt
      if (formData.type === 'admin') {
        const code = window.prompt('Enter admin code:')
        if (code) {
          result = await createAccount({ ...formData, code })
        } else {
          setMelding('Ugyldig admin-kode')
          return
        }
      } else {
        result = await createAccount(formData) // Pass as single object
      }

      if (result?.success) {
        setMelding('Konto opprettet!')

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMelding(`${result?.error}`)

        console.error('Account creation failed:', result?.error)
      }
    } catch (error) {
      console.error('Error creating account:', error)
      setMelding('Noe gikk galt ved opprettelse av konto. Prøv igjen senere.')
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

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      type: value as 'user' | 'admin',
    })
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <h1 className="text-3xl mx-auto absolute top-8 left-8">Lag bruker</h1>
      <form onSubmit={handleSubmit} className="space-y-6 md:w-1/3">
        <div>
          <Label htmlFor="name" className="text-slate-900 font-semibold mb-2 block">
            Navn
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ditt fulle navn"
            required
            className="bg-slate-200 outline-none border-2 focus:border-green-400"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block">
            E-post
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Ditt passord"
            required
            className="bg-slate-200 outline-none border-2 focus:border-green-400"
          />
        </div>

        <div>
          <Label htmlFor="type" className="text-slate-900 font-semibold mb-2 block">
            Brukertype
          </Label>
          <Select value={formData.type} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel color="white">User Types</SelectLabel>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6"
        >
          Lag bruker <User className="ml-2 h-5 w-5" />
        </Button>

        {melding && (
          <Alert variant="destructive">
            <AlertTitle>{melding}</AlertTitle>
          </Alert>
        )}
      </form>
    </div>
  )
}
export default CreateAccountPage
