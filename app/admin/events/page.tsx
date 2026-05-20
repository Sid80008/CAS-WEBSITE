// app/admin/events/page.tsx
import prisma from '@/lib/prisma';
import { createEvent } from '@/app/actions/eventActions';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { eventDate: 'asc' },
    // Only show events from today onwards by default
    where: {
      eventDate: {
        gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    }
  });

  const classes = await prisma.class.findMany({
    orderBy: [{ name: 'asc' }, { section: 'asc' }]
  });

  // Helper to color-code event types
  const typeColors: Record<string, string> = {
    HOLIDAY: 'bg-green-100 text-green-800',
    EXAM: 'bg-red-100 text-red-800',
    SPORTS: 'bg-blue-100 text-blue-800',
    CULTURAL: 'bg-purple-100 text-purple-800',
    MEETING: 'bg-yellow-100 text-yellow-800',
    OTHER: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Create Event Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded shadow h-fit text-black">
        <h2 className="text-xl font-bold mb-4">Add Calendar Event</h2>
        <form action={createEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Title *</label>
            <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date *</label>
            <input type="date" name="eventDate" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type *</label>
            <select name="eventType" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="HOLIDAY">Holiday</option>
              <option value="EXAM">Exam</option>
              <option value="SPORTS">Sports</option>
              <option value="CULTURAL">Cultural Event</option>
              <option value="MEETING">PTM / Meeting</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Class (Optional)</label>
            <select name="targetClass" className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm">
              <option value="">All Classes (School Wide)</option>
              {classes.map(cls => (
                <option key={cls.id} value={`${cls.name} - ${cls.section}`}>{cls.name} - {cls.section}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows={3} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition">
            Add to Calendar
          </button>
        </form>
      </div>

      {/* Right Column: Upcoming Events List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {events.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No upcoming events scheduled.</td></tr>
              ) : (
                events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {new Date(evt.eventDate).toLocaleDateString('en-IN', {
                        weekday: 'short', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-bold text-gray-900">{evt.title}</p>
                      {evt.description && <p className="text-xs text-gray-500 mt-1">{evt.description}</p>}
                      {evt.targetClass && <p className="text-xs font-medium text-blue-600 mt-1">For: {evt.targetClass}</p>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[evt.eventType]}`}>
                        {evt.eventType}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
