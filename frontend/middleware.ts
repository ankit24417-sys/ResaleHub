import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Protected route patterns
  const isProtectedPath =
    pathname.startsWith('/listings/') ||
    pathname.startsWith('/seller/') ||
    pathname.startsWith('/franchisor/') ||
    pathname.startsWith('/dashboard/');

  // If attempting to access a protected route without a valid token cookie
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/listings/:path*',
    '/seller/:path*',
    '/franchisor/:path*',
    '/dashboard/:path*',
  ],
};

