import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

// Definer beskyttede ruter
const protectedRoutes = ['/dashboard', '/admin']
const adminOnlyRoutes = ['/admindashboard'] // Only admin users can access these
const authRoutes = ['/login', '/createAccount']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')
  const { pathname } = request.nextUrl

  console.log('Middleware triggered for:', pathname)

  // Hvis bruker har token og prøver å gå til auth sider, redirect til homepage
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  // Check if user is trying to access admin-only routes
  if (adminOnlyRoutes.includes(pathname)) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Verify user role for admin-only routes
      const payload = await getPayload({ config: payloadConfig })
      
      // Create headers object from request
      const headers = new Headers()
      headers.set('authorization', `JWT ${token.value}`)
      
      const { user } = await payload.auth({ headers })

      if (!user || user.role !== 'admin') {
        // User is not admin, redirect to dashboard or forbidden page
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch (error) {
      console.error('Auth error in middleware:', error)
      // Auth failed, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
