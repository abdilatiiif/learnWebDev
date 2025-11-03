import type { CollectionConfig } from 'payload'

const Messages: CollectionConfig = {
  slug: 'messages',
  labels: {
    singular: 'Message',
    plural: 'Messages',
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
    useAsTitle: 'subject',
    description: 'Contact messages from website visitors',
    defaultColumns: ['sender', 'email', 'subject', 'createdAt'],
  },
  fields: [
    {
      name: 'sender',
      type: 'text',
      label: 'Sender Name',
      required: true,
      admin: {
        description: 'Name of the person sending the message',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      admin: {
        description: 'Email address of the sender',
      },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
      required: true,
      admin: {
        description: 'Subject line of the message',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      admin: {
        description: 'The actual message content',
        rows: 6,
      },
    },
    {
      name: 'isRead',
      type: 'checkbox',
      label: 'Mark as Read',
      defaultValue: false,
      admin: {
        description: 'Mark this message as read/unread',
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority',
      defaultValue: 'normal',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      admin: {
        description: 'Priority level of the message',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default Messages