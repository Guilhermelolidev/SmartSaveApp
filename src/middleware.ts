import { NextRequest, NextResponse } from 'next/server';
import { auth } from './utils/auth';

export async function middleware(request: NextRequest) {
  const isLogged = await auth();
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith('/dash');
  const isAuthRoute = pathname === '/signin' || pathname === '/signup';

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isLogged && isAuthRoute) {
    return NextResponse.redirect(new URL('/dash', request.url));
  }

  if (!isLogged && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup', '/dash/:path*'],
};
