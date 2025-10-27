import { CollectionConfig } from 'payload'

// tar inn hero section input

export const Hero: CollectionConfig = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaText',
      label: 'Call to Action Text',
      type: 'text',
      defaultValue: 'Book Now',
    },
    {
      name: 'ctaLink',
      label: 'Call to Action Link',
      type: 'text',
      defaultValue: '/courses',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
