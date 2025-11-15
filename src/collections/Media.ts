import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Everyone can read media files
    read: () => true,
    // Only admins can create media files
    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Only admins can update media files
    update: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // Only admins can delete media files
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // Make alt text optional for easier uploads
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
