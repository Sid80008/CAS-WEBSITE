export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-[#1a1a1a] tracking-tight">
          Central Academy School
        </h1>
        <p className="text-xl text-gray-600">
          Empowering future leaders with excellence in education.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <a
            href="/login"
            className="px-8 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </a>
          <a
            href="#about"
            className="px-8 py-3 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
