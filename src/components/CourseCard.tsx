import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Code, Database, Layers, Star, Clock, BookOpen, Filter } from 'lucide-react'

function CourseCard({ course }: { course: any }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code className="w-5 h-5" />
      case 'backend':
        return <Database className="w-5 h-5" />
      case 'fullstack':
        return <Layers className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-500'
      case 'backend':
        return 'bg-green-500'
      case 'fullstack':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card
      key={course.id}
      className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <div
            className={`${getCategoryColor(course.category)} text-white px-1
             py-1 rounded-full flex items-center gap-1 text-sm font-semibold`}
          >
            {getCategoryIcon(course.category)}
            <span className="capitalize">{course.category}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold"
          >
            {course.level}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-white text-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.8</span>
            <span className="text-white/80">(127)</span>
          </div>
        </div>
      </div>

      <div
        className="p-1
      "
      >
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
          {course.title}
        </h3>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span className="font-medium">24 leksjoner</span>
          </div>
        </div>

        <div className="border-t border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Pris</div>
            <div className="text-2xl font-bold text-slate-900">{course.price},-</div>
          </div>
          {course.enrollments > 0 && (
            <div className="flex flex-col items-center justify-center">
              <Button
                size="sm"
                className="bg-slate-900 hover:bg-slate-800 text-white group-hover:scale-105 cursor-pointer transition-transform"
              >
                Meld deg på <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
              <div className="text-xs text-slate-500 mb-1">
                Antall plasser: {course.enrollments}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
export default CourseCard
