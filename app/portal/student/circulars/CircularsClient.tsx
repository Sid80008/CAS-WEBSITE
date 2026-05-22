"use client";

import React, { useState } from "react";

interface CircularItem {
  id: string;
  type: "NOTICE" | "EVENT";
  category: "Academic" | "Holiday" | "General" | "Events";
  title: string;
  content: string;
  date: string; // ISO string
  attachmentUrl?: string | null;
  imageUrl?: string | null;
}

interface CircularsClientProps {
  initialCirculars: CircularItem[];
}

export default function CircularsClient({ initialCirculars }: CircularsClientProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Academic" | "Holiday" | "General" | "Events">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<CircularItem | null>(null);

  // If DB is empty, use premium simulated circulars
  const data = initialCirculars.length > 0 ? initialCirculars : [
    {
      id: "sim-1",
      type: "NOTICE" as const,
      category: "Academic" as const,
      title: "Revised Schedule for Half-Yearly Examinations",
      content: "Due to recent administrative adjustments, the schedule for the upcoming Half-Yearly Examinations has been revised for Grades 6-12. Please download the detailed timetable below.",
      date: new Date(2026, 9, 15).toISOString(),
      attachmentUrl: "#",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxQeDCPi7xWspweseyZTcX2gUHqsaQfM9a_Ic5_ceHQGbggHbiMQTh_1mD1HlcJQA11Hx6n2c7ZUa1HPRkJh8ITalIaO9Lvo-xb4puUtcNrC5diZu-hb0lGtS3WUrnht7tJwcMMtwWS4agV-KWQ4wlRTPF1Yt_n98VRLCoWFtVoVbTG_wuUW0HWwx9ycWJrcTqKFkCfXHa7ciPfogXYeXBs-_U3Ibb6DvySyfe1oL-TGiLRPV_4ERNMBJ26PU5xW8gJytIYUAupRwu",
    },
    {
      id: "sim-2",
      type: "NOTICE" as const,
      category: "Holiday" as const,
      title: "Diwali Vacation and School Reopening",
      content: "Central Academy antah will remain closed from October 30th to November 4th for the festive occasion of Diwali. Wishing all students a safe and prosperous celebration.",
      date: new Date(2026, 9, 28).toISOString(),
      attachmentUrl: null,
      imageUrl: null,
    },
    {
      id: "sim-3",
      type: "EVENT" as const,
      category: "Events" as const,
      title: "Annual Sports Meet 2026: Enrollment Open",
      content: "Registration for the Annual Inter-House Sports Meet is now open. Students interested in participating in Athletics, Football, and Basketball events must submit their forms by the end of the week.",
      date: new Date(2026, 10, 2).toISOString(),
      attachmentUrl: "#",
      imageUrl: null,
    }
  ];

  // Search filtering
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  // Date format helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[d.getMonth()];
    return { day, month };
  };

  const formatFullDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleDownload = (item: CircularItem) => {
    if (item.attachmentUrl && item.attachmentUrl !== "#") {
      window.open(item.attachmentUrl, "_blank");
    } else {
      // Simulate file download
      alert(`Downloading circular document for: "${item.title}"`);
    }
  };

  const handleShare = (item: CircularItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.content,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${item.title}\n\n${item.content}`);
      alert("Notice text copied to clipboard!");
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white border border-[#E2E0DB] rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#00386b] font-h3">Circulars &amp; Notices</h1>
          <p className="text-sm text-[#424750] mt-1">Official communications, announcements, and school events.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-[#f0eded] border border-transparent focus:border-[#00386b] rounded-xl text-sm focus:ring-0 outline-none transition-all"
            placeholder="Search circulars..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs & Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle side: Circular list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#E2E0DB] pb-3">
            {(["All", "Academic", "Holiday", "General", "Events"] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#00386b] text-white shadow-sm"
                      : "bg-white text-[#424750] border border-[#E2E0DB] hover:border-[#00386b]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const { day, month } = formatDate(item.date);
                
                // Color mapping for badges
                const badgeColors = {
                  Academic: "bg-[#E6F1FB] text-[#00386b]",
                  Holiday: "bg-[#FAEEDA] text-[#633806]",
                  General: "bg-slate-100 text-slate-700",
                  Events: "bg-[#E1F5EE] text-[#085041]",
                }[item.category];

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#E2E0DB] hover:border-[#00386b] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-[#F0F6FC] rounded-2xl border border-[#d4e3ff] text-[#00386b] select-none">
                        <span className="text-2xl font-extrabold leading-none">{day}</span>
                        <span className="text-[10px] font-bold tracking-widest mt-1">{month}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeColors}`}>
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Published: {formatFullDate(item.date)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#00386b] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-[#424750] line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="bg-[#00386b] hover:bg-[#1b4f8a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <span>View Details</span>
                            <span className="material-symbols-outlined text-xs">open_in_new</span>
                          </button>
                          
                          {item.attachmentUrl && (
                            <button
                              onClick={() => handleDownload(item)}
                              className="border border-[#E2E0DB] hover:border-[#00386b] text-[#00386b] hover:bg-[#E6F1FB] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-xs">download</span>
                              <span>Download PDF</span>
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleShare(item)}
                            className="text-[#424750] hover:text-[#00386b] p-2 rounded-lg hover:bg-slate-100 transition-all flex items-center justify-center"
                            title="Share"
                          >
                            <span className="material-symbols-outlined text-lg">share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white border border-[#E2E0DB] rounded-2xl p-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">
                  notifications_off
                </span>
                <p className="text-sm">No circulars or events found matching the criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Sidebar info */}
        <div className="space-y-6">
          {/* Quick Access */}
          <div className="bg-white border border-[#E2E0DB] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#00386b] p-4 text-white">
              <h4 className="font-bold text-sm flex items-center gap-2 font-h4">
                <span className="material-symbols-outlined text-lg">bolt</span>
                Quick Access
              </h4>
            </div>
            <div className="p-4 space-y-1">
              {[
                { label: "Academic Calendar", href: "#" },
                { label: "Fee Structure 2026-27", href: "/portal/student/fees" },
                { label: "School Uniform Policy", href: "#" },
                { label: "Transport Routes", href: "#" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#E6F1FB]/50 group transition-all"
                >
                  <span className="text-xs font-semibold text-[#424750] group-hover:text-[#00386b]">
                    {link.label}
                  </span>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#00386b] group-hover:translate-x-0.5 transition-all text-sm">
                    chevron_right
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* School Motto */}
          <div className="bg-[#FAEEDA]/30 border border-[#FAEEDA] rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FAEEDA]/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <h4 className="font-bold text-sm text-[#633806] font-h4 mb-2">School Motto</h4>
            <p className="text-xs italic text-[#633806]/80 leading-relaxed mb-4">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
            <div className="w-12 h-1 bg-[#fdad4e] rounded-full"></div>
          </div>

          {/* Need Help */}
          <div className="bg-[#fcf9f8] border border-[#E2E0DB] rounded-2xl p-6">
            <h4 className="font-bold text-slate-800 text-sm font-h4 mb-2">Need Help?</h4>
            <p className="text-xs text-[#424750] leading-relaxed mb-4">
              If you are unable to find a specific circular or need clarification, please contact the administration office.
            </p>
            <a
              className="flex items-center gap-2 text-xs font-bold text-[#00386b] hover:underline"
              href="mailto:centralacademyantah@gmail.com"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              centralacademyantah@gmail.com
            </a>
          </div>
        </div>
        
      </div>

      {/* Details Modal Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-[#E2E0DB] overflow-hidden transform transition-all animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 bg-[#00386b] text-white flex justify-between items-start gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white">
                  {selectedItem.category}
                </span>
                <h3 className="text-lg font-bold mt-2 leading-snug">{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Published on: {formatFullDate(selectedItem.date)}
              </p>
              
              <div className="text-sm text-[#424750] leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                {selectedItem.content}
              </div>

              {selectedItem.imageUrl && (
                <div className="border border-[#E2E0DB] rounded-xl overflow-hidden max-h-48 relative">
                  <img
                    src={selectedItem.imageUrl}
                    alt="Notice illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-[#E2E0DB] flex justify-end gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 border border-[#E2E0DB] hover:bg-slate-100 rounded-lg text-xs font-bold text-[#424750] transition-all"
              >
                Close
              </button>
              
              {selectedItem.attachmentUrl && (
                <button
                  onClick={() => {
                    handleDownload(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-2 bg-[#00386b] hover:bg-[#1b4f8a] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  <span>Download PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
