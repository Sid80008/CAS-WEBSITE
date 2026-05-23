import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const roles = (req.auth?.user as any)?.roles as string[] ?? [];
  const { pathname } = req.nextUrl;

  // ── 1. Login / auth pages ─────────────────────────────────────────────────
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/admin/login' ||
    pathname === '/portal/login';

  if (pathname === '/login') {
    if (isLoggedIn) {
      if (roles.includes('ADMIN'))   return Response.redirect(new URL('/admin', req.nextUrl));
      if (roles.includes('TEACHER')) return Response.redirect(new URL('/portal/teacher', req.nextUrl));
      if (roles.includes('OFFICE'))  return Response.redirect(new URL('/portal/office', req.nextUrl));
      if (roles.includes('STUDENT')) return Response.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      if (roles.includes('PARENT'))  return Response.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return Response.redirect(new URL('/portal', req.nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (roles.includes('ADMIN'))   return Response.redirect(new URL('/admin', req.nextUrl));
      if (roles.includes('TEACHER')) return Response.redirect(new URL('/portal/teacher', req.nextUrl));
      if (roles.includes('OFFICE'))  return Response.redirect(new URL('/portal/office', req.nextUrl));
      if (roles.includes('STUDENT')) return Response.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      if (roles.includes('PARENT'))  return Response.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      return Response.redirect(new URL('/', req.nextUrl));
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
      return Response.redirect(new URL(loginUrl, req.nextUrl));
    }

    // Strict RBAC Verification
    if (pathname.startsWith('/admin') && !roles.includes('ADMIN')) {
      return Response.redirect(new URL('/', req.nextUrl));
    }
    if (pathname.startsWith('/portal/teacher') && !roles.includes('TEACHER')) {
      return Response.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/office') && !roles.includes('OFFICE')) {
      return Response.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/student') && !roles.includes('STUDENT')) {
      return Response.redirect(new URL('/portal/login', req.nextUrl));
    }
    if (pathname.startsWith('/portal/parent') && !roles.includes('PARENT')) {
      return Response.redirect(new URL('/portal/login', req.nextUrl));
    }
  }

  // ── 3. Everything else (public pages, /portal selector, /) ────────────────
  // Just pass through — no action needed.
});

export const config = {
  // Run middleware on all pages except Next.js internals, API routes, and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)'],
};
