import { CollectionConfig } from 'payload'

export const Enroll: CollectionConfig = {
  slug: 'enroll',
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'spots',
      type: 'number',
      min: 1,
      max: 20,
      defaultValue: 1,
      required: true,
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'confirmed', 'cancelled', 'completed'],
      defaultValue: 'pending',
    },
    {
      name: 'enrollDate',
      type: 'date',
      required: true,
    },
    {
      name: 'specialRequests',
      type: 'textarea',
    },
  ],

  // usikker om dette er riktig ?? dobbelt sjekk
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Auto-calculate total price
        if (data.course && data.spots) {
          const payload = req.payload
          const course = await payload.findByID({
            collection: 'courses',
            id: data.course,
          })
          data.totalPrice = course.price * data.spots
        }
        return data
      },
    ],
  },
}
