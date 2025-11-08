import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  try {
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (user && user.role === 'user') {
      return Response.json(
        {
          access: 'denied',
          message: 'Users cannot access /admin routes',
          userRole: user.role,
          redirect: '/dashboard',
        },
        { status: 403 },
      )
    }

    return Response.json({
      access: user?.role === 'admin' ? 'granted' : 'no-user',
      message: user?.role === 'admin' ? 'Admin access allowed' : 'No user logged in',
      userRole: user?.role || null,
    })
  } catch (error) {
    return Response.json(
      {
        error: 'Authentication failed',
        message: 'Could not verify user',
      },
      { status: 401 },
    )
  }
}
