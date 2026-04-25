import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authConfig from "./auth.config"
import bcrypt from "bcryptjs"
import { userSchema } from "@/lib/validators/user"

export const { 
  handlers: { GET, POST }, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = userSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const { prisma } = await import("@/lib/prisma")
          const user = await prisma.user.findUnique({ 
            where: { email },
            include: {
              roles: {
                include: {
                  role: {
                    include: {
                      permissions: {
                        include: { permission: true }
                      }
                    }
                  }
                }
              }
            }
          })

          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) {
            return {
              id: user.id,
              email: user.email,
              roles: user.roles.map((r: any) => r.role.name),
              permissions: user.roles.flatMap((r: any) =>
                r.role.permissions.map((p: any) => p.permission.name)
              )
            }
          }
        }

        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET,
})
