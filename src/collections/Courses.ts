import { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Kurs',
    plural: 'Kurs',
  },
  access: {
    // Only admins can read messages
    read: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Anyone can create messages (for contact forms)
    create: () => true,
    // Only admins can update messages
    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Only admins can delete messages
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
