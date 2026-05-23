'use client'

import React, { useState, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
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
import { Lock, User, Loader2, GraduationCap, Users } from 'lucide-react'

function PortalLoginContent() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role')
  const isParent = roleParam === 'parent'
  
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

      if (result.url) {
        window.location.href = result.url;
      } else {
        window.location.href = '/';
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again or contact the school office.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
      <div className={`h-3 ${isParent ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      <CardHeader className="pt-10 pb-6 text-center">
        <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${isParent ? 'bg-emerald-500' : 'bg-[#1B4F8A]'}`}>
          {isParent ? <Users className="text-white h-7 w-7" /> : <GraduationCap className="text-white h-7 w-7" />}
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
          {isParent ? 'Parent Portal' : 'Student Portal'}
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2">
          Central Academy antah — Secure Login
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
              <Label className="text-gray-700 font-medium ml-1">User ID / Email</Label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1B4F8A] transition-colors" />
                <Input
                  type="text"
                  placeholder="Admission No / Phone / Email"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-[#1B4F8A] rounded-xl transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label className="text-gray-700 font-medium">Password</Label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1B4F8A] transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-[#1B4F8A] rounded-xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#1B4F8A] hover:bg-[#0C447C] text-white font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-2 text-center justify-center flex-col gap-1">
          <p className="text-xs text-gray-400">
            Forgot password? Please contact the school office.
          </p>
          <a href="/" className="text-sm text-[#1B4F8A] hover:underline mt-2">
            &larr; Back to Main Website
          </a>
        </CardFooter>
    </Card>
  )
}

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B4F8A] to-[#0a2847] px-4">
      <Suspense fallback={<div className="text-white">Loading Secure Portal...</div>}>
        <PortalLoginContent />
      </Suspense>
    </div>
  )
}
