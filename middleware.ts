import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Definer beskyttede ruter
const protectedRoutes = ['/dashboard', '/admin']
const authRoutes = ['/login', '/createAccount']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')
  const { pathname } = request.nextUrl

  console.log('Middleware triggered for:', pathname)

  // Hvis bruker har token og prøver å gå til auth sider, redirect til homepage
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
