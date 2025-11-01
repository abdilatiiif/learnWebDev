import { getReviews } from '@/actions/getReviews'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

async function ReviewPage() {
  const reviews = await getReviews()

  console.log(reviews)

  // Group reviews by course
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
    <div className="pt-26 container mx-auto px-4 flex items-center flex-col">
      {' '}
      <Accordion type="single" collapsible className="mx-auto mt-10" defaultValue="item-1">
        {Object.entries(groupedReviews).map(
          ([courseId, { courseTitle, reviews: courseReviews }], index) => (
            <AccordionItem
              key={courseId}
              value={`item-${index + 1}`}
              className="bg-zink-300 p-5 border-b-2"
            >
              <AccordionTrigger>
                {courseTitle} ({courseReviews.length} anmeldelse
                {courseReviews.length !== 1 ? 'r' : ''})
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6 text-balance border-2 p-3">
                {courseReviews.map((review, reviewIndex) => (
                  <div key={review.id} className={`${reviewIndex > 0 ? 'border-t pt-4' : ''}`}>
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">Vurdering: {review.rating}/5</p>
                      <p className="text-gray-700">{review.comment}</p>
                      <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                        <p>
                          Av:{' '}
                          {typeof review.author === 'object' && review.author?.name
                            ? review.author.name
                            : 'Ukjent forfatter'}
                        </p>
                        <p>Oppdatert: {new Date(review.updatedAt).toLocaleDateString('no-NO')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  )
}
export default ReviewPage
