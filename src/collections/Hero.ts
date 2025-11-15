import { CollectionConfig } from 'payload'

// tar inn hero section input

export const Hero: CollectionConfig = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  access: {
    read: () => true,

    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },

    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },

    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
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
      name: 'image_url',
      type: 'text',
      label: 'Bilde-URL',
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
