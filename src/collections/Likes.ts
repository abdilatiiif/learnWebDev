import { CollectionConfig } from 'payload'

export const Likes: CollectionConfig = {
  slug: 'likes',
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'courseReview',
      type: 'relationship',
      relationTo: 'courses-reviews',
      required: true,
    },
  ],
}
