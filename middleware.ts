import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname === '/login' || pathname === '/portal/login';
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/portal/student') || pathname.startsWith('/portal/parent');

  if (isAuthRoute) {
    if (isLoggedIn) {
      const roles = (req.auth.user as any)?.roles || [];
      if (roles.includes("ADMIN")) {
        return Response.redirect(new URL('/admin', req.nextUrl));
      } else if (roles.includes("STUDENT")) {
        return Response.redirect(new URL('/portal/student/dashboard', req.nextUrl));
      } else if (roles.includes("PARENT")) {
        return Response.redirect(new URL('/portal/parent/dashboard', req.nextUrl));
      }
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return;
  }

  if (isProtectedRoute && !isLoggedIn) {
    // Redirect to the appropriate login page
    if (pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/login', req.nextUrl));
    } else {
      return Response.redirect(new URL('/portal/login', req.nextUrl));
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)'],
};
