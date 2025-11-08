import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

const adminOnlyRoutes = ['/admin', '/admindashboard']
const authRoutes = ['/login', '/createAccount']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')
  const { pathname } = request.nextUrl

  // Redirect authenticated users away from auth pages
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  // Check for admin-only routes
  const isAdminRoute =
    adminOnlyRoutes.some((route) => pathname === route) || pathname.startsWith('/admin')

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const payload = await getPayload({ config: payloadConfig })
      const headers = new Headers()
      headers.set('authorization', `JWT ${token.value}`)

      const { user } = await payload.auth({ headers })

      if (!user || user.role !== 'admin') {
        const redirectUrl = new URL('/dashboard', request.url)
        redirectUrl.searchParams.set('error', 'unauthorized')
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
