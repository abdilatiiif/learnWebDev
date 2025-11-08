import { getReviews } from '@/actions/getReviews'
import FormReview from '@/components/FormReview'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Star, MessageSquare, User, Calendar } from 'lucide-react'

async function ReviewPage() {
  const reviews = await getReviews()

  console.log(reviews)

  const groupedReviews = reviews.reduce(
    (acc, review) => {
      const courseId = typeof review.course === 'object' ? review.course?.id : review.course
      const courseTitle =
        typeof review.course === 'object' && review.course?.title
          ? review.course.title
          : 'Ukjent kurs'

      if (!acc[courseId]) {
        acc[courseId] = {
          courseTitle,
          reviews: [],
        }
      }
      acc[courseId].reviews.push(review)
      return acc
    },
    {} as Record<string, { courseTitle: string; reviews: typeof reviews }>,
  )

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Kursanmeldelser</h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Se hva våre studenter sier om kursene, og del din egen opplevelse
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Skriv En Anmeldelse
              </h2>
              <Card className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <FormReview />
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
                Alle Anmeldelser
              </h2>

              <div className="space-y-4">
                <Accordion type="single" collapsible className="space-y-4" defaultValue="item-1">
                  {Object.entries(groupedReviews).map(
                    ([courseId, { courseTitle, reviews: courseReviews }], index) => (
                      <AccordionItem
                        key={courseId}
                        value={`item-${index + 1}`}
                        className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-slate-900">{courseTitle}</h3>
                              <p className="text-sm text-slate-600">
                                {courseReviews.length} anmeldelse
                                {courseReviews.length !== 1 ? 'r' : ''}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="space-y-4 pt-2">
                            {courseReviews.map((review, reviewIndex) => (
                              <Card
                                key={review.id}
                                className={`p-4 bg-slate-50/50 border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                                  reviewIndex === 0 ? '' : 'mt-4'
                                }`}
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? 'text-yellow-400 fill-current'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="font-semibold text-slate-900">
                                      {review.rating}/5
                                    </span>
                                  </div>

                                  <p className="text-slate-700 leading-relaxed">{review.comment}</p>

                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-slate-500 pt-2 border-t border-slate-200">
                                    <div className="flex items-center gap-1">
                                      <User className="w-4 h-4" />
                                      <span>
                                        {typeof review.author === 'object' && review.author?.name
                                          ? review.author.name
                                          : 'Ukjent forfatter'}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>
                                        {new Date(review.updatedAt).toLocaleDateString('no-NO')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ),
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ReviewPage
