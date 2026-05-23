"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Notice {
  id: string;
  titleEn: string;
  contentEn: string;
  createdAt: string;
  slug: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notices
  const loadNotices = async () => {
    try {
      const res = await fetch("/api/notices?publishedOnly=true&limit=5");
      if (res.ok) {
        const result = await res.json();
        const data = result.data || [];
        setNotices(data);

        // Check localStorage for last read notice date
        const lastRead = localStorage.getItem("announcements_last_read");
        if (!lastRead) {
          setUnreadCount(data.length);
        } else {
          const lastReadTime = new Date(lastRead).getTime();
          const unread = data.filter((n: Notice) => new Date(n.createdAt).getTime() > lastReadTime).length;
          setUnreadCount(unread);
        }
      }
    } catch (err) {
      console.error("Error loading notices:", err);
    }
  };

  useEffect(() => {
    loadNotices();
    // Poll for new announcements every 15 seconds
    const interval = setInterval(loadNotices, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Clear unread count when dropdown is opened
      setUnreadCount(0);
      localStorage.setItem("announcements_last_read", new Date().toISOString());
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative material-symbols-outlined text-[#00386b] cursor-pointer active:scale-95 transition-all w-10 h-10 flex items-center justify-center hover:bg-[#E6F1FB] rounded-full"
        title="Announcements"
      >
        notifications
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-orange-600 rounded-full border border-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E0DB] rounded-xl shadow-xl overflow-hidden z-50 text-[#1c1b1b]">
          <div className="bg-[#f6f3f2] px-4 py-3 border-b border-[#E2E0DB] flex justify-between items-center">
            <span className="font-bold text-sm text-[#00386b]">School Announcements</span>
            <Link
              href="/notices"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#00386b] font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#E2E0DB] max-h-[300px] overflow-y-auto">
            {notices.length === 0 ? (
              <p className="p-6 text-center text-xs text-[#555555]">No current announcements.</p>
            ) : (
              notices.map((n) => (
                <div key={n.id} className="p-4 hover:bg-[#fcf9f8] transition-colors">
                  <h4 className="font-bold text-xs text-[#1c1b1b] line-clamp-1">{n.titleEn}</h4>
                  <p className="text-[11px] text-[#555555] mt-1 line-clamp-2">{n.contentEn}</p>
                  <p className="text-[9px] text-slate-400 mt-2">
                    {new Date(n.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
