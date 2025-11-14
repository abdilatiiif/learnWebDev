import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Kurs',
    plural: 'Kurs',
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
  admin: {
    useAsTitle: 'title',
    group: 'Kursdata',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tittel',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Fullstack', value: 'fullstack' },
      ],
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Pris (NOK)',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Varighet',
    },
    {
      name: 'level',
      type: 'select',
      label: 'Nivå',
      options: [
        { label: 'Nybegynner', value: 'beginner' },
        { label: 'Mellomnivå', value: 'intermediate' },
        { label: 'Avansert', value: 'advanced' },
      ],
      required: true,
    },
    {
      name: 'image_url',
      type: 'text',
      label: 'Bilde-URL',
    },
    {
      name: 'enrollments',
      type: 'number',
      label: 'Antall plasser',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
