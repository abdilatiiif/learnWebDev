'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import * as z from 'zod'

const messageSchema = z.object({
  name: z.string().min(1, 'Navn er påkrevd'),
  email: z.string().email('Ugyldig e-postadresse'),
  subject: z.string().min(1, 'Emne er påkrevd'),
  message: z.string().min(10, 'Melding må være minst 10 tegn'),
})

export type MessageFormData = z.infer<typeof messageSchema>

export async function sendMessage(formData: MessageFormData) {
  try {
    const validatedData = messageSchema.parse(formData)

    const payload = await getPayload({ config })

    const result = await payload.create({
      collection: 'messages',
      data: {
        sender: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        isRead: false,
        priority: 'normal',
      },
    })

    console.log('Message created successfully:', result.id)

    return {
      success: true,
      message: 'Melding sendt! Vi kommer tilbake til deg så snart som mulig.',
      data: result,
    }
  } catch (error) {
    console.error('Error creating message:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Ugyldig data',
        details: error.issues
          .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', '),
      }
    }

    return {
      success: false,
      error: 'Kunne ikke sende melding. Vennligst prøv igjen senere.',
    }
  }
}
