'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  submitted && console.log('Form submitted:', formData)

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ta Kontakt</h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Har du spørsmål om våre kurs? Vi er her for å hjelpe deg på din læringsreise
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">E-post</h3>
              <p className="text-slate-600 mb-4">Send oss en e-post når som helst</p>
              <a
                href="mailto:support@learnwebdev.no"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                support@learnwebdev.no
              </a>
            </Card>

            <Card className="p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Telefon</h3>
              <p className="text-slate-600 mb-4">Ring oss på hverdager 08:00-18:00</p>
              <a
                href="tel:+4700000000"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                +47 000 00 000
              </a>
            </Card>

            <Card className="p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-300 group bg-white/90 backdrop-blur-sm border-0 shadow-lg md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kontor</h3>
              <p className="text-slate-600 mb-4">Besøk oss på vårt hovedkontor</p>
              <p className="text-orange-600 font-semibold">
                Hamar Sentrum
                <br />
                2316 Hamar
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Send Oss En Melding
              </h2>
              <p className="text-base lg:text-lg text-slate-600 mb-6 leading-relaxed">
                Fyll ut skjemaet nedenfor, så svarer vi deg så snart som mulig. Vi ser frem til å
                høre fra deg!
              </p>

              <Card className="p-6 lg:p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Takk for meldingen!</h3>
                    <p className="text-slate-600">Vi svarer deg så snart som mulig.</p>
                  </div>
                ) : (
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
                        className="bg-white border-2 focus:border-blue-500"
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
                        placeholder="xxx@epost.no"
                        required
                        className="bg-white border-2 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-slate-900 font-semibold mb-2 block">
                        Emne
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Hva gjelder det?"
                        required
                        className="bg-white border-2 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-slate-900 font-semibold mb-2 block">
                        Melding
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Skriv din melding her..."
                        rows={6}
                        required
                        className="bg-white border-2 focus:border-blue-500 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-lg py-6"
                    >
                      Send Melding <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                  Ofte Stilte Spørsmål
                </h2>

                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">
                    🕒 Hvor lang tid tar et kurs?
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Våre kurs varierer fra 6 til 14 uker, avhengig av kompleksitet og innhold. Du
                    kan studere i ditt eget tempo.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">
                    📚 Trenger jeg forkunnskaper?
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    For nybegynnerkurs trengs ingen forkunnskaper. For videregående kurs anbefaler
                    vi grunnleggende programmeringskunnskap.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">🏆 Får jeg sertifikat?</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Ja, alle studenter som fullfører et kurs mottar et digitalt sertifikat som kan
                    deles på LinkedIn.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                  <h3 className="font-bold text-lg text-slate-900 mb-3">
                    💰 Hva er refusjonspolicyen?
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    Vi tilbyr 30 dagers pengene-tilbake-garanti hvis du ikke er fornøyd med kurset.
                  </p>
                </Card>
              </div>

              <Card className="p-6 lg:p-8 bg-linear-to-r from-green-500 to-emerald-500 text-white border-0 shadow-xl">
                <h3 className="text-xl lg:text-2xl font-bold mb-4">🚀 Klar til å Starte?</h3>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Bli med over 500 studenter og start din reise som webutvikler i dag.
                </p>
                <Link href="/homepage/courses">
                  <Button
                    size="lg"
                    className="w-full bg-white text-green-600 hover:bg-gray-50 font-semibold"
                  >
                    Se Alle Kurs
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
