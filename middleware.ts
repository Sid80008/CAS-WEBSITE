import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  // ── 1. Login / auth pages ─────────────────────────────────────────────────
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/admin/login' ||
    pathname === '/portal/login';

  if (isAuthRoute) {
    if (isLoggedIn) {
      const roles = (token?.roles as string[]) ?? [];
      if (roles.includes('ADMIN'))   return NextResponse.redirect(new URL('/admin', req.nextUrl));
      if (roles.includes('TEACHER')) return NextResponse.redirect(new URL('/portal/teacher', req.nextUrl));
      if (roles.includes('OFFICE'))  return NextResponse.redirect(new URL('/portal/office', req.nextUrl));
      if (roles.includes('STUDENT')) return NextResponse.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      if (roles.includes('PARENT'))  return NextResponse.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return;
  }

  // ── 2. Protected routes & Role Checks ─────────────────────────────────────
  const isProtectedRoute =
    (pathname.startsWith('/admin') && pathname !== '/admin/login') ||
    pathname.startsWith('/portal/student') ||
    pathname.startsWith('/portal/parent') ||
    pathname.startsWith('/portal/teacher') ||
    pathname.startsWith('/portal/office');

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      const loginUrl = pathname.startsWith('/admin')
        ? '/admin/login'
        : '/portal/login';
      return NextResponse.redirect(new URL(loginUrl, req.nextUrl));
    }

    const roles = (token?.roles as string[]) ?? [];
    
    // Strict RBAC Verification
    if (pathname.startsWith('/admin') && !roles.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    if (pathname.startsWith('/portal/teacher') && !roles.includes('TEACHER')) {
      return NextResponse.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/office') && !roles.includes('OFFICE')) {
      return NextResponse.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/student') && !roles.includes('STUDENT')) {
      return NextResponse.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/parent') && !roles.includes('PARENT')) {
      return NextResponse.redirect(new URL('/portal/login', req.nextUrl));
    }
  }

  // ── 3. Everything else (public pages, /portal selector, /) ────────────────
  // Just pass through — no action needed.
}

export const config = {
  // Run middleware on all pages except Next.js internals, API routes, and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)'],
};
