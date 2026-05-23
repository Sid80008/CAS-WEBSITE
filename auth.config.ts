import type { NextAuthConfig } from "next-auth";

export default {
  providers: [], // Empty array for Edge compatibility in Middleware
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles;
        token.role = (user as any).roles?.[0] || '';
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        (session.user as any).roles = token.roles as any;
        (session.user as any).role = token.role as any;
        (session.user as any).permissions = token.permissions as any;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
