'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn, Terminal, User } from 'lucide-react'

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

function CreateAccountPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
    code: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [melding, setMelding] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // Handle admin creation with prompt
    if (formData.type === 'admin') {
      const code = window.prompt('Enter admin code:')
      if (code) {
        ;(await grantAdmin({ code: Number(code) })) ? setMelding(true) : setMelding(false)
      }
    } else {
      console.log('User konto ble laget:', formData.email, formData.name)
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
      type: value,
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <h1 className="text-3xl mx-auto absolute top-8 left-8">Lag bruker</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {melding === false && (
          <Alert variant="destructive">
            <AlertTitle>Feil kode!</AlertTitle>
          </Alert>
        )}

        {submitted && melding === true && (
          <Alert variant="default">
            <AlertTitle>Konto opprettet!</AlertTitle>
          </Alert>
        )}
      </form>
    </div>
  )
}
export default CreateAccountPage
