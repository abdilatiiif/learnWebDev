'use client'

import { getCourses } from '@/actions/getCourses'
import CourseCard from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Course } from '@/payload-types'
import { Code, Database, Filter, Layers, BookOpen, GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses()
      setCourses(data)
    }

    fetchCourses()
  }, [])

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(courses.filter((course) => course.category === selectedCategory))
    }
  }, [selectedCategory, courses])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6 shadow-lg">
            <GraduationCap className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Våre Kurs</h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Utforsk vårt omfattende utvalg av webutviklingskurs og start din reise som utvikler
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6 mb-12 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-4 h-4 text-blue-600" />
                </div>
                <span>Filtrer kurs:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('all')}
                  className="rounded-full hover:scale-105 transition-transform"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Alle Kurs
                </Button>
                <Button
                  variant={selectedCategory === 'frontend' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('frontend')}
                  className="rounded-full hover:scale-105 transition-transform"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Frontend
                </Button>
                <Button
                  variant={selectedCategory === 'backend' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('backend')}
                  className="rounded-full hover:scale-105 transition-transform"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Backend
                </Button>
                <Button
                  variant={selectedCategory === 'fullstack' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('fullstack')}
                  className="rounded-full hover:scale-105 transition-transform"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Fullstack
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-slate-600">
                Viser <span className="font-semibold text-slate-900">{filteredCourses.length}</span>{' '}
                kurs
                {selectedCategory !== 'all' && (
                  <span className="ml-1">
                    i kategorien{' '}
                    <span className="font-semibold text-slate-900">{selectedCategory}</span>
                  </span>
                )}
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {filteredCourses.map((course) => {
              return <CourseCard key={course.id} course={course} />
            })}
          </div>

          {filteredCourses.length === 0 && (
            <Card className="p-12 text-center bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ingen kurs funnet</h3>
              <p className="text-slate-600 mb-6">
                Vi fant ingen kurs som matcher dine filtere. Prøv å velge en annen kategori.
              </p>
              <Button
                onClick={() => handleCategoryFilter('all')}
                className="bg-slate-900 hover:bg-slate-800"
              >
                Vis alle kurs
              </Button>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
export default CoursesPage
