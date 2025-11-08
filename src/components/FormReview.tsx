'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Star, MessageSquare, User, BookOpen, Award } from 'lucide-react'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getCourses } from '@/actions/getCourses'
import { createReview } from '@/actions/UPDATE/POSTreview'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ref } from 'process'

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, {
    message: 'Kommentar må være minst 10 tegn.',
  }),
  author: z.string().min(2, {
    message: 'Forfatternavn må være minst 2 tegn.',
  }),
  course: z.string().min(1, {
    message: 'Vennligst velg et kurs.',
  }),
  isFeatured: z.boolean(),
})

export default function KursAnmeldelseForm() {
  const router = useRouter()

  const [courses, setCourses] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string } | null>(null)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCourses().then((data) => data.map((course) => course.title))
      console.log('Courses fetched:', courses)
      setCourses(courses)

      const user = await getCurrentUser()
      console.log('Current user:', user)
      setCurrentUser(user)
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: '',
      author: currentUser?.name || '',
      course: '',
      isFeatured: false,
    },
  })

  useEffect(() => {
    if (currentUser?.name) {
      form.setValue('author', currentUser.name)
    }
  }, [currentUser, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      console.log('Sender inn anmeldelse:', values)

      const result = await createReview({
        rating: values.rating,
        comment: values.comment,

        course: values.course,
        isFeatured: values.isFeatured,
      })

      console.log('Review result:', result)

      if (result.success) {
        toast.success('Anmeldelse sendt inn!', {
          description: result.message || 'Takk for at du delte din tilbakemelding.',
        })

        form.reset()
        setSelectedRating(0)
      } else {
        toast.error('Kunne ikke sende inn anmeldelse', {
          description: result.error || 'Vennligst prøv igjen senere.',
        })
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Kunne ikke sende inn anmeldelse', {
        description: 'Vennligst prøv igjen senere.',
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        router.refresh()
      }, 3000)
    }
  }

  return (
    <div className=" py-12 px-4">
      <Card className=" mx-auto shadow-2xl border-0">
        <CardHeader className="space-y-2 pb-8">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent">
            Kurs Anmeldelse
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Vurdering
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setSelectedRating(star)
                              field.onChange(star)
                            }}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                          >
                            <Star
                              className={`h-10 w-10 transition-all ${
                                star <= (hoveredRating || selectedRating)
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
                                  : 'text-slate-300 dark:text-slate-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>Klikk for å vurdere fra 1 til 5 stjerner</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Kurs
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors">
                          <SelectValue placeholder="Velg et kurs" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course} className="cursor-pointer">
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Velg kurset du vil anmelde</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Ditt Navn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ola Nordmann"
                        {...field}
                        className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors focus:border-blue-500"
                      />
                    </FormControl>
                    <FormDescription>Dette vil vises sammen med din anmeldelse</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Din Anmeldelse
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Del dine tanker om dette kurset... Hva lærte du? Hvordan var instruktøren? Ville du anbefalt det til andre?"
                        className="min-h-[140px] resize-none bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 10 tegn</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sender inn...
                  </>
                ) : (
                  <>Send inn Anmeldelse</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
