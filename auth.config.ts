import type { NextAuthConfig } from "next-auth";

export default {
  providers: [], // Empty array for Edge compatibility in Middleware
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        (session.user as any).roles = token.roles as any;
        (session.user as any).permissions = token.permissions as any;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
