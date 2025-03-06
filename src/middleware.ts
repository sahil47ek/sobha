import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if it's an admin route
  const isAdminRoute = path.startsWith('/admin');

  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('adminAuth')?.value === 'true';

  // If trying to access admin routes without authentication
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login page while authenticated
  if (path === '/login' && isAuthenticated) {
    // Get the intended destination from the URL or default to /admin
    const from = request.nextUrl.searchParams.get('from') || '/admin';
    return NextResponse.redirect(new URL(from, request.url));
  }

  return NextResponse.next();
}

// Update the matcher to include both admin routes and login page
export const config = {
  matcher: ['/admin/:path*', '/login']
}; 