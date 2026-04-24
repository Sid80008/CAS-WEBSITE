import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validation logic will be here, but we reference it in auth.ts
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
