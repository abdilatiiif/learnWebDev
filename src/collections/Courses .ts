import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'maxSpots',
      type: 'number',
      defaultValue: 20,
      required: true,
    },
    {
      name: 'availableSpots',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'duration',
      type: 'text', //  "3 days", "1 week"
      required: true,
    },
    {
      name: 'difficulty',
      type: 'select',
      options: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'included',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'schedule',
      type: 'richText',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
