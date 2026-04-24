import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Shim localStorage for Edge/Middleware runtime
try {
  const mock = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  if (typeof globalThis !== "undefined") {
    if (!(globalThis as any).localStorage || typeof (globalThis as any).localStorage.getItem !== 'function') {
      (globalThis as any).localStorage = mock;
    }
  }
} catch (e) {}

const PUBLIC_ROUTES = ["/login", "/public"];
const TOKEN_COOKIE = "admin_access_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const loggedIn = Boolean(token);
  
  const isPublicRoute = PUBLIC_ROUTES.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // 1. Redirect unauthenticated users away from admin routes
  if (!loggedIn && pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users away from login
  if (loggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
