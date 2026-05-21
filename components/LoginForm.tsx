'use client'

import React, { useState, Component, type ReactNode } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Lock, Mail, Loader2, School } from 'lucide-react'

// ─── Error Boundary ──────────────────────────────────────────────────────────

class LoginErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
          <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border-t-4 border-red-500">
            <div className="mx-auto h-12 w-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
              <School className="text-red-500 h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Login Unavailable</h2>
            <p className="text-gray-600 mb-6 text-sm">
              The portal is temporarily unavailable. Please contact the school office.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-semibold mb-1">Central Academy antah</p>
              <p>📞 +91-7737689684</p>
              <p>📧 centralacademyantah@gmail.com</p>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginFormInner() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!result) {
        setErrorMsg('Login service unavailable. Please try again later.')
        return
      }

      if (result.error) {
        setErrorMsg('Invalid email or password. Please try again.')
        return
      }

      // Fetch the session to read the role and redirect appropriately
      const { getSession } = await import('next-auth/react')
      const session = await getSession()
      const roles: string[] = (session?.user as any)?.roles ?? []

      if (roles.includes('STUDENT')) {
        window.location.href = '/portal/student/dashboard'
      } else if (roles.includes('PARENT')) {
        window.location.href = '/portal/parent/dashboard'
      } else {
        // ADMIN, OFFICE, TEACHER — all go to /admin
        window.location.href = '/admin'
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again or contact the school office.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
        <div className="h-3 bg-indigo-600" />
        <CardHeader className="pt-10 pb-6 text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
            <School className="text-white h-7 w-7" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Central Academy antah — Admin Portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input
                  type="email"
                  placeholder="admin@casantah.com"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-indigo-500 rounded-xl transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-gray-700 font-medium">Password</Label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-indigo-500 rounded-xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-2 text-center justify-center flex-col gap-1">
          <p className="text-xs text-gray-400">
            Having trouble?{' '}
            <a href="tel:+917737689684" className="text-indigo-600 font-semibold">
              +91-7737689684
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Technically Managed by{' '}
            <span className="text-indigo-600 font-semibold italic">Central Academy IT Cell</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// ─── Default Export ───────────────────────────────────────────────────────────

export default function LoginForm() {
  return (
    <LoginErrorBoundary>
      <LoginFormInner />
    </LoginErrorBoundary>
  )
}
