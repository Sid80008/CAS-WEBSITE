import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8">
        <FileQuestion className="w-12 h-12 text-slate-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-[#1B4F8A] hover:bg-[#0a2847] text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
}
