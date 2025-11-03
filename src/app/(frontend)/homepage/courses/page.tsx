'use client'

import { getCourses } from '@/actions/getCourses'
import CourseCard from '@/components/CourseCard'
import { Button } from '@/components/ui/button'
import { Course } from '@/payload-types'
import { Code, Database, Filter, Layers } from 'lucide-react'
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

  {
    /** filter here */
  }

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
    <div className="pt-26 pb-10 container mx-auto px-4 flex items-center flex-col">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <Filter className="w-5 h-5" />
          <span>Filtrer:</span>
        </div>
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => handleCategoryFilter('all')}
          className="rounded-full"
        >
          Alle Kurs
        </Button>
        <Button
          variant={selectedCategory === 'frontend' ? 'default' : 'outline'}
          onClick={() => handleCategoryFilter('frontend')}
          className="rounded-full"
        >
          <Code className="w-4 h-4 mr-2" />
          Frontend
        </Button>
        <Button
          variant={selectedCategory === 'backend' ? 'default' : 'outline'}
          onClick={() => handleCategoryFilter('backend')}
          className="rounded-full"
        >
          <Database className="w-4 h-4 mr-2" />
          Backend
        </Button>
        <Button
          variant={selectedCategory === 'fullstack' ? 'default' : 'outline'}
          onClick={() => handleCategoryFilter('fullstack')}
          className="rounded-full"
        >
          <Layers className="w-4 h-4 mr-2" />
          Fullstack
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center max-w-6xl mx-auto">
        {filteredCourses.map((course) => {
          return <CourseCard key={course.id} course={course} />
        })}
      </div>
    </div>
  )
}
export default CoursesPage
