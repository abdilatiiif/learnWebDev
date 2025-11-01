import { getCourses } from '@/actions/getCourses'
import CourseCard from '@/components/CourseCard'

async function CoursesPage() {
  const courses = await getCourses()

  console.log('Courses:', courses)
  {
    /** filter here */
  }

  return (
    <div className="pt-26 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center max-w-6xl mx-auto">
        {courses.map((course) => {
          return <CourseCard key={course.id} course={course} />
        })}
      </div>
    </div>
  )
}
export default CoursesPage
