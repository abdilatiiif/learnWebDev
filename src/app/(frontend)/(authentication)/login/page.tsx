'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn } from 'lucide-react'

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

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', type: 'user' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    console.log('Form submitted successfully!')
    console.log('Form Data:', submitted)
    console.log({ name: formData.name, email: formData.email })
  }

  return (
    <div className="min-h-screen bg-slate-100  flex items-center justify-center">
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
          <Label htmlFor="type" className="text-slate-900 font-semibold mb-2 block">
            Brukertype
          </Label>
          <Select>
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
          Login <LogIn className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}
export default LoginPage
