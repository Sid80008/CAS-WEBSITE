"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Megaphone, Pin, Calendar, History, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Notice {
  id: string;
  titleEn: string;
  titleHi: string | null;
  contentEn: string;
  contentHi: string | null;
  slug: string;
  published: boolean;
  isPinned: boolean;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface NoticesClientProps {
  initialNotices: Notice[];
}

export function NoticesClient({ initialNotices }: NoticesClientProps) {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = initialNotices.filter((notice) => {
    const title = (language === "hi" && notice.titleHi) ? notice.titleHi : notice.titleEn;
    const content = (language === "hi" && notice.contentHi) ? notice.contentHi : notice.contentEn;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
        <input
          type="text"
          placeholder={language === "hi" ? "सूचनाएं खोजें..." : "Search notices..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 focus:border-school-blue focus:ring-1 focus:ring-school-blue rounded-xl shadow-sm text-sm outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-8">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, idx) => {
            const title = (language === "hi" && notice.titleHi) ? notice.titleHi : notice.titleEn;
            const content = (language === "hi" && notice.contentHi) ? notice.contentHi : notice.contentEn;
            const isHindi = language === "hi" && !!notice.titleHi;

            return (
              <div
                key={notice.id}
                className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all ${
                  notice.isPinned
                    ? "border-l-8 border-l-school-amber ring-4 ring-school-amber/5"
                    : "border-l-8 border-l-school-blue"
                }`}
              >
                <div className="p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          notice.isPinned ? "bg-amber-50 text-school-amber" : "bg-blue-50 text-school-blue"
                        }`}
                      >
                        {notice.isPinned ? <Pin className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
                        {language === "hi"
                          ? notice.isPinned
                            ? "महत्वपूर्ण घोषणा"
                            : "स्कूल सूचना"
                          : notice.isPinned
                          ? "Important Announcement"
                          : "School Notice"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-tertiary text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(notice.createdAt), "MMMM d, yyyy")}
                    </div>
                  </div>

                  <h3
                    className={`text-2xl font-bold text-school-blue mb-4 leading-tight group-hover:text-school-blue-dark transition-colors ${
                      isHindi ? "font-hindi" : ""
                    }`}
                  >
                    {title}
                  </h3>

                  <div className="prose prose-slate max-w-none text-text-secondary leading-relaxed space-y-4">
                    <div
                      className={`p-4 rounded-xl border ${
                        isHindi
                          ? "bg-amber-50/30 border-amber-100/50 font-hindi"
                          : "bg-slate-50 border-slate-100 italic"
                      }`}
                    >
                      {content}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-text-tertiary font-bold tracking-widest uppercase">
                    <span>
                      {language === "hi" ? "संदर्भ संख्या" : "Ref No"}: CAS/{new Date(notice.createdAt).getFullYear()}/{(idx + 1).toString().padStart(3, "0")}
                    </span>
                    <span className="flex items-center gap-1">
                      <History className="h-4 w-4" />{" "}
                      {language === "hi" ? "समय" : "Posted"}{" "}
                      {format(new Date(notice.createdAt), "hh:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Megaphone className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-tertiary">
              {language === "hi" ? "कोई सूचना नहीं मिली।" : "No notices found."}
            </h3>
            <p className="text-text-tertiary mt-2">
              {language === "hi" ? "कृपया अपनी खोज बदलें या बाद में जाँच करें।" : "Please adjust your search or check back later."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
