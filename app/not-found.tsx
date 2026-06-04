import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[85vh] bg-school-ink flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-school-saffron/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-school-navy border border-white/5 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
            <FileQuestion className="w-12 h-12 text-school-saffron" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-school-saffron to-school-saffron-light hover:brightness-110 text-white px-8 py-6 rounded-xl text-md font-bold shadow-lg shadow-school-saffron/25 transition-all duration-300 border-0 uppercase tracking-widest text-[10px]">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
