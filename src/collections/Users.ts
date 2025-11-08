import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only admins can read messages
    read: ({ req: { user } }) => {
      return user?.role === 'admin'
    },

    // Only admins can update messages
    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Only admins can delete messages
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      required: true,
    },
  ],
}
