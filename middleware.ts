import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Definer beskyttede ruter
const protectedRoutes = ['/homepage', '/profile', '/admin'] // må endre senerer til riktige
const authRoutes = ['/login', '/createAccount']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('payload-token')
  const { pathname } = request.nextUrl

  // Hvis bruker har token og prøver å gå til auth sider, redirect til homepage
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Hvis bruker ikke har token og prøver å gå til beskyttede sider, redirect til login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
