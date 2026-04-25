import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function DesignTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Design System Verification</h1>
        <p className="text-text-secondary text-lg">
          This page demonstrates the school management system's design tokens and theme integration.
          It ensures that all components respect the defined CSS variables and Tailwind configuration.
        </p>
      </section>

      {/* Color Palette */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="School Blue" variable="var(--school-blue)" className="bg-school-blue text-white" hex="#1B4F8A" />
          <ColorSwatch name="Blue Light" variable="var(--school-blue-light)" className="bg-school-blue-light text-school-blue-dark" hex="#E6F1FB" />
          <ColorSwatch name="Blue Dark" variable="var(--school-blue-dark)" className="bg-school-blue-dark text-white" hex="#0C447C" />
          <ColorSwatch name="School Amber" variable="var(--school-amber)" className="bg-school-amber text-white" hex="#BA7517" />
          <ColorSwatch name="School Teal" variable="var(--school-teal)" className="bg-school-teal text-white" hex="#0F6E56" />
          <ColorSwatch name="School Coral" variable="var(--school-coral)" className="bg-school-coral text-white" hex="#993C1D" />
          <ColorSwatch name="School Purple" variable="var(--school-purple)" className="bg-school-purple text-white" hex="#534AB7" />
          <ColorSwatch name="School Green" variable="var(--school-green)" className="bg-school-green text-white" hex="#3B6D11" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Text Primary" variable="var(--text-primary)" className="bg-[var(--text-primary)] text-white" hex="#1a1a1a" />
          <ColorSwatch name="Text Secondary" variable="var(--text-secondary)" className="bg-[var(--text-secondary)] text-white" hex="#555555" />
          <ColorSwatch name="Border Neutral" variable="var(--border-neutral)" className="bg-[var(--border-neutral)] text-text-primary" hex="#e2e0db" />
          <ColorSwatch name="Background Alt" variable="var(--background-alt)" className="bg-[var(--background-alt)] text-text-primary" hex="#f8f7f5" />
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Typography Scale</h2>
        <div className="space-y-4 bg-background-alt p-6 rounded-lg">
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">3xl - 30px (Hero Highlights)</p>
             <h3 className="text-3xl font-bold">The future of education starts here.</h3>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">2xl - 24px (Page Titles)</p>
             <h3 className="text-2xl font-semibold">Welcome to Central Academy School</h3>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">xl - 20px (Section Headings)</p>
             <h3 className="text-xl font-semibold">Latest School Notices</h3>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">lg - 18px (Paragraph Leads)</p>
             <p className="text-lg">Experience a nurturing environment that fosters academic excellence and personal growth.</p>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">base - 16px (Body Copy)</p>
             <p className="text-base text-text-primary">
                Our curriculum is designed to challenge and inspire students. We provide a wide range of extracurricular activities 
                to ensure a well-rounded education. Our dedicated staff is committed to the success of every child.
             </p>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">sm - 14px (Secondary Text)</p>
             <p className="text-sm text-text-secondary">Published on October 24, 2024 by Administration</p>
          </div>
          <div className="space-y-1">
             <p className="text-xs text-text-tertiary">xs - 12px (Captions & Badges)</p>
             <p className="text-xs border px-2 py-0.5 rounded-full inline-block">ADMISSIONS OPEN</p>
          </div>
        </div>

        <div className="p-6 border rounded-lg space-y-4">
           <h3 className="text-xl font-semibold mb-2">Hindi Rendering (Devanagari)</h3>
           <p className="text-2xl font-hindi leading-relaxed text-school-blue-dark">नमस्ते! सेंट्रल एकेडमी स्कूल में आपका स्वागत है।</p>
           <p className="text-base font-hindi text-text-primary" lang="hi">
              शिक्षा जीवन का आधार है। हमारा उद्देश्य विद्यार्थियों को न केवल शिक्षित करना है, बल्कि उन्हें एक बेहतर नागरिक बनाना भी है। 
              यहाँ की सुविधाएँ और वातावरण छात्रों के सर्वांगीण विकास के लिए अनुकूल हैं।
           </p>
        </div>
      </section>

      {/* Interactive Components */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Component Integration (shadcn)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Buttons & States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="default" disabled>Disabled</Button>
                <Button variant="default" size="sm">Small</Button>
                <Button variant="default" size="lg">Large</Button>
              </div>
              <p className="text-sm text-text-tertiary italic">
                Buttons should use School Blue (#1B4F8A) for the default variant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Forms & Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="student@centralacademy.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">Sign In to Portal</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Radius & Spacing */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Radius & Spacing System</h2>
        <div className="flex flex-wrap gap-8 items-center justify-center p-8 bg-background-alt rounded-xl">
           <div className="w-24 h-24 bg-school-blue rounded-sm flex items-center justify-center text-white text-xs text-center">Radius SM (6px)</div>
           <div className="w-24 h-24 bg-school-blue rounded flex items-center justify-center text-white text-xs text-center">Radius Default (8px)</div>
           <div className="w-24 h-24 bg-school-blue rounded-lg flex items-center justify-center text-white text-xs text-center">Radius LG (12px)</div>
           <div className="w-24 h-24 bg-school-blue rounded-xl flex items-center justify-center text-white text-xs text-center">Radius XL (16px)</div>
        </div>
        <div className="space-y-2">
           <div className="h-4 bg-school-blue-light w-1 rounded" title="4px spacing"></div>
           <div className="h-4 bg-school-blue-light w-2 rounded" title="8px spacing"></div>
           <div className="h-4 bg-school-blue-light w-3 rounded" title="12px spacing"></div>
           <div className="h-4 bg-school-blue-light w-4 rounded" title="16px spacing"></div>
           <div className="h-4 bg-school-blue-light w-6 rounded" title="24px spacing"></div>
           <p className="text-xs text-text-tertiary uppercase tracking-wider mt-4">Fixed 4px Grid Spacing Scale</p>
        </div>
      </section>
    </div>
  )
}

function ColorSwatch({ name, variable, className, hex }: { name: string, variable: string, className: string, hex: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-24 w-full rounded-lg border flex flex-col items-center justify-center ${className}`}>
        <span className="font-bold">{name}</span>
        <span className="text-[10px] opacity-80">{hex}</span>
      </div>
      <p className="text-xs font-mono text-text-tertiary truncate">{variable}</p>
    </div>
  )
}
