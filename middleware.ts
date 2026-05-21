import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // ── 1. Login / auth pages ─────────────────────────────────────────────────
  // These are accessible to everyone. If already logged-in, bounce to dashboard.
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/admin/login' ||
    pathname === '/portal/login';

  if (isAuthRoute) {
    if (isLoggedIn) {
      const roles = (req.auth?.user as any)?.roles ?? [];
      if (roles.includes('ADMIN'))   return Response.redirect(new URL('/admin', req.nextUrl));
      if (roles.includes('STUDENT')) return Response.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      if (roles.includes('PARENT'))  return Response.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      if (roles.includes('TEACHER')) return Response.redirect(new URL('/teacher', req.nextUrl));
      if (roles.includes('OFFICE'))  return Response.redirect(new URL('/office', req.nextUrl));
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return; // not logged in → show the login page
  }

  // ── 2. Protected routes ───────────────────────────────────────────────────
  // /admin/*  (but NOT /admin/login — already handled above)
  // /portal/student/*  and  /portal/parent/*
  const isProtectedRoute =
    (pathname.startsWith('/admin') && pathname !== '/admin/login') ||
    pathname.startsWith('/portal/student') ||
    pathname.startsWith('/portal/parent');

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = pathname.startsWith('/admin')
      ? '/admin/login'
      : '/portal/login';
    return Response.redirect(new URL(loginUrl, req.nextUrl));
  }

  // ── 3. Everything else (public pages, /portal selector, /) ────────────────
  // Just pass through — no action needed.
});

export const config = {
  // Run middleware on all pages except Next.js internals, API routes, and static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)'],
};
