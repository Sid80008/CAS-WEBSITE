import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // All routes that should be accessible without authentication
  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/admin/login' ||
    pathname === '/portal/login';

  // Protected routes — explicitly exclude /admin/login so it never loops
  const isProtectedRoute =
    (pathname.startsWith('/admin') && pathname !== '/admin/login') ||
    pathname.startsWith('/portal/student') ||
    pathname.startsWith('/portal/parent');

  if (isAuthRoute) {
    // If already logged in, redirect to the correct dashboard
    if (isLoggedIn) {
      const roles = (req.auth?.user as any)?.roles || [];
      if (roles.includes('ADMIN')) {
        return Response.redirect(new URL('/admin', req.nextUrl));
      } else if (roles.includes('STUDENT')) {
        return Response.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      } else if (roles.includes('PARENT')) {
        return Response.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      } else if (roles.includes('TEACHER')) {
        return Response.redirect(new URL('/teacher', req.nextUrl));
      } else if (roles.includes('OFFICE')) {
        return Response.redirect(new URL('/office', req.nextUrl));
      }
      return Response.redirect(new URL('/', req.nextUrl));
    }
    // Not logged in — allow through to the login page
    return;
  }

  if (isProtectedRoute && !isLoggedIn) {
    if (pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin/login', req.nextUrl));
    }
    return Response.redirect(new URL('/portal/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)'],
};
