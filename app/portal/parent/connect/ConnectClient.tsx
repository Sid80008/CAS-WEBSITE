"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Teacher {
  staffId: string;
  name: string;
  photo: string | null;
  designation: string | null;
  subjects: string[];
}

interface ConnectClientProps {
  teachers: Teacher[];
  studentName: string;
}

interface Message {
  id: string;
  sender: "parent" | "teacher" | "system";
  text: string;
  time: string;
  pdf?: { name: string; size: string };
}

const defaultTeachers: Teacher[] = [
  {
    staffId: "default-1",
    name: "Ms. Sarah Jenkins",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOB1Mt_mG-_BcT5kfZfiz9e2z4-Hx8_oQgGqgCC5QXzyV-0VyAokgVnj5NvwTZK_lI7WyxrUm3PjAGYBD3zbBCjGj0jnsWSUwuBxUULKNFmFND-wpu38wayhB9vQpoS-6Ox-k__8GFNJO9mMNKH2lxDVaRtnNzpD8cxoaTIhnUtUPB1g12pFI9Cpu87PtL-tX0PM3xjJMU1kwBiXB1whP3I1_Avs1pxoPdIP5dhIrbHcdZrTrg5iHM8T0fGsjGujUBb7dQhTBvUBmY",
    designation: "Mathematics Coordinator",
    subjects: ["Mathematics"]
  },
  {
    staffId: "default-2",
    name: "Mr. David Wilson",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD19IB8h3HM8Ot30jYe7j7guM_snnrm0dIcaYILeg7IxggRMlZAFy6Cb45Rxc7LjTx9OE8Oo5xHlYCW1OTkRVELGD7BY8528WK5VWFbF3xht8BCXO6wJB19YeA_o5NvYKB0U75Gy7LWTeVY9j-BBlpr5GVq2pm6_9Por2nz7OvdvAJwp9qRcTRxk8JWxL-bGEsfhlpRrBHumBLwdfN0O5jNtyLaRL6SAv7C6-hy_rttf903zy5bfKptrkZzn1PLfrlGcZBg9TlOatJ6",
    designation: "Senior History Instructor",
    subjects: ["History & Civics"]
  },
  {
    staffId: "default-3",
    name: "Dr. Emily Chen",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuACkU39gzo-pgXvkC2t64stNcvXpgjKe2sV6T0MmgGWPxTcAO6ZvUfl3SLxrazbsT0M5AC7wElOInBNFJqg8mgrLNhTgdo9SCZx0_6RBVSisQSJK_-oPTbTpkLXT8DfPhhngwWUC1gLksA62I9NAoCT1y4Q6fViajEqwQfCqjS6VtnQdpUpS0yvvWKMLyMZlQQHVCXzEWkURTwj_TypyX6Fe1WnG8iRAAY4vrOhFBq_oKvheI7X8HRMOOznj479gB-PGg3fVu5bXnBw",
    designation: "Physics Coordinator",
    subjects: ["Physics"]
  }
];

const initialChats: Record<string, Message[]> = {
  "default-1": [
    { id: "1", sender: "teacher", text: "Good afternoon! I wanted to share the recent unit test results for Mathematics. Aarav has shown significant improvement in Geometry.", time: "1:45 PM" },
    { id: "2", sender: "parent", text: "That's wonderful news, Ms. Jenkins! Thank you for the update. We've been working on those extra practice sheets you sent last week.", time: "1:48 PM" },
    { id: "3", sender: "teacher", text: "I've attached the detailed breakdown of the class averages for your reference.", time: "1:52 PM", pdf: { name: "Math_Unit3_Report.pdf", size: "1.2 MB" } }
  ],
  "default-2": [
    { id: "1", sender: "teacher", text: "Hello! Just a reminder that the History project on the Indian National Movement is due this coming Friday. Please ensure Aarav completes it.", time: "Yesterday" },
    { id: "2", sender: "parent", text: "Yes, Mr. Wilson. He has completed the draft and is currently organizing the bibliography. He will submit it on time.", time: "Yesterday" }
  ],
  "default-3": [
    { id: "1", sender: "teacher", text: "Hi, Aarav performed exceptionally well in the Physics lab activity today. His understanding of optics is outstanding.", time: "2 days ago" },
    { id: "2", sender: "parent", text: "Thank you for the encouragement, Dr. Chen! He really enjoys your practical experiments.", time: "2 days ago" }
  ]
};

export default function ConnectClient({ teachers: dbTeachers, studentName }: ConnectClientProps) {
  // Merge database teachers with fallback defaults to ensure a rich list is displayed
  const allTeachersMap: Record<string, Teacher> = {};
  defaultTeachers.forEach(t => { allTeachersMap[t.staffId] = t; });
  dbTeachers.forEach(t => { allTeachersMap[t.staffId] = t; });
  const teachersList = Object.values(allTeachersMap);

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachersList[0]?.staffId || "");
  const [conversations, setConversations] = useState<Record<string, Message[]>>(initialChats);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  
  // Mobile responsive state: "list" shows teacher list, "chat" shows selected conversation
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // PTM Modal state
  const [ptmModalOpen, setPtmModalOpen] = useState(false);
  const [ptmDate, setPtmDate] = useState("24");
  const [ptmTime, setPtmTime] = useState("04:00 PM");
  const [ptmReason, setPtmReason] = useState("");

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever selected teacher or conversation changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedTeacherId, conversations]);

  const selectedTeacher = teachersList.find(t => t.staffId === selectedTeacherId);

  // Filter teachers list by search query
  const filteredTeachers = teachersList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentMessages = selectedTeacherId ? (conversations[selectedTeacherId] || [
    { id: "welcome", sender: "teacher", text: `Hello, I am the subject instructor. Let me know if you have any questions regarding class progress.`, time: "Today" }
  ]) : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedTeacherId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "parent",
      text: inputText,
      time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
    };

    setConversations(prev => ({
      ...prev,
      [selectedTeacherId]: [...(prev[selectedTeacherId] || []), newMessage]
    }));
    setInputText("");

    // Simulate teacher auto-reply
    setTimeout(() => {
      const replies = [
        `Thank you for your message. I'll make sure to follow up with ${studentName.split(" ")[0]} during our next lesson.`,
        "I've noted this. Let's discuss this during our upcoming Parent-Teacher Meeting.",
        `${studentName.split(" ")[0]} has been participating very actively recently. Keep up the practice sheets!`,
        "I will check the submission list and update the gradebook by this evening.",
        "Understood. If you need any extra study material, please let me know."
      ];
      const randomReplyText = replies[Math.floor(Math.random() * replies.length)];
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "teacher",
        text: randomReplyText,
        time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
      };
      setConversations(prev => ({
        ...prev,
        [selectedTeacherId]: [...(prev[selectedTeacherId] || []), replyMessage]
      }));
    }, 1500);
  };

  const showToastMessage = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  const handleConfirmPTM = () => {
    if (!selectedTeacherId) return;
    
    // Add system message to represent PTM request in chat
    const systemMsg: Message = {
      id: Date.now().toString(),
      sender: "system",
      text: `📆 Requested PTM for Oct ${ptmDate} at ${ptmTime}. Reason: "${ptmReason || "General Performance Update"}"`,
      time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
    };

    setConversations(prev => ({
      ...prev,
      [selectedTeacherId]: [...(prev[selectedTeacherId] || []), systemMsg]
    }));

    setPtmModalOpen(false);
    showToastMessage("PTM Requested successfully!");

    // Simulate teacher auto-approval reply after a few seconds
    setTimeout(() => {
      const approvalMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "teacher",
        text: `Confirmed. I've accepted your PTM request for October ${ptmDate} at ${ptmTime}. Looking forward to discussing ${studentName.split(" ")[0]}'s academics.`,
        time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
      };
      setConversations(prev => ({
        ...prev,
        [selectedTeacherId]: [...(prev[selectedTeacherId] || []), approvalMsg]
      }));
    }, 3000);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] border border-[#E2E0DB] rounded-2xl bg-white overflow-hidden shadow-sm text-[#1c1b1b]">
      {/* Sidebar: Teachers List */}
      <aside className={`w-full md:w-80 border-r border-[#E2E0DB] bg-[#f6f3f2] flex flex-col h-full shrink-0 ${
        mobileView === "chat" ? "hidden md:flex" : "flex"
      }`}>
        <div className="p-4 border-b border-[#E2E0DB] bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-h3 text-lg font-bold text-[#00386b]">Subject Instructors</h3>
            <span className="bg-[#E6F1FB] text-[#00386b] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {teachersList.length} Connected
            </span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424750] text-[20px]">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-2 bg-[#fcf9f8] border border-[#E2E0DB] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#00386b] focus:border-[#00386b]"
              placeholder="Search teachers/subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredTeachers.map((teacher) => {
            const isSelected = teacher.staffId === selectedTeacherId;
            const msgs = conversations[teacher.staffId] || [];
            const lastMsg = msgs[msgs.length - 1];
            
            return (
              <button
                key={teacher.staffId}
                onClick={() => {
                  setSelectedTeacherId(teacher.staffId);
                  setMobileView("chat");
                }}
                className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all ${
                  isSelected
                    ? "bg-[#E6F1FB] border-l-4 border-[#00386b] text-[#00386b]"
                    : "hover:bg-[#eae7e7]/50 text-[#424750]"
                }`}
              >
                <div className="relative shrink-0 w-11 h-11">
                  {teacher.photo ? (
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover border border-[#E2E0DB]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#00386b] text-white flex items-center justify-center font-bold text-sm">
                      {teacher.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3B6D11] border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-xs truncate text-[#1c1b1b]">{teacher.name}</span>
                    <span className="text-[10px] text-[#888888] whitespace-nowrap">
                      {lastMsg ? lastMsg.time : ""}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold text-[#00386b] mb-0.5 truncate">
                    {teacher.subjects.join(", ")}
                  </p>
                  <p className="text-[10px] text-[#555555] truncate italic">
                    {lastMsg ? (lastMsg.sender === "parent" ? "You: " : "") + lastMsg.text : "No messages yet"}
                  </p>
                </div>
              </button>
            );
          })}
          {filteredTeachers.length === 0 && (
            <p className="text-center text-xs text-[#555555] py-8">No instructors found.</p>
          )}
        </div>
      </aside>

      {/* Chat Pane */}
      <section className={`flex-1 flex flex-col bg-[#fcf9f8] relative h-full ${
        mobileView === "list" ? "hidden md:flex" : "flex"
      }`}>
        {selectedTeacher ? (
          <>
            {/* Active Teacher Header */}
            <div className="h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-[#E2E0DB] z-10 shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                {/* Back button on mobile */}
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden p-1.5 rounded-full text-[#424750] hover:bg-[#eae7e7] transition-all flex items-center justify-center mr-1"
                  aria-label="Back to teacher list"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>

                <div className="w-10 h-10 rounded-full bg-[#E6F1FB] flex items-center justify-center shrink-0 border border-[#00386b]/10 relative">
                  {selectedTeacher.photo ? (
                    <Image
                      src={selectedTeacher.photo}
                      alt={selectedTeacher.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-xs text-[#00386b]">
                      {selectedTeacher.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface leading-tight">
                    {selectedTeacher.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] animate-pulse"></span>
                    <p className="text-[10px] text-[#555555] truncate">
                      Active Now • {selectedTeacher.subjects.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPtmModalOpen(true)}
                  className="px-3 py-1.5 bg-[#FAEEDA] hover:bg-[#FAEEDA]/80 text-[#633806] border border-[#633806]/20 rounded-full font-label text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  <span className="hidden sm:inline">Schedule PTM</span>
                </button>
              </div>
            </div>

            {/* Conversation Window */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
              {currentMessages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="bg-[#FAEEDA] border-l-4 border-[#633806] px-4 py-2 rounded-r-lg flex items-center gap-2 shadow-sm max-w-md">
                        <span className="material-symbols-outlined text-[#633806] text-sm shrink-0">info</span>
                        <p className="text-xs text-[#633806] font-medium leading-normal">{msg.text}</p>
                      </div>
                    </div>
                  );
                }

                const isParent = msg.sender === "parent";
                return (
                  <div key={msg.id} className={`flex items-end gap-2 max-w-[85%] ${isParent ? "ml-auto flex-row-reverse" : ""}`}>
                    {!isParent && (
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 shrink-0">
                        {selectedTeacher.photo ? (
                          <Image src={selectedTeacher.photo} alt="Teacher" width={24} height={24} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#00386b] text-white flex items-center justify-center font-bold text-[8px]">T</div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        isParent 
                          ? "bg-[#00386b] text-white rounded-br-none" 
                          : "bg-white border border-[#E2E0DB] text-[#1c1b1b] rounded-bl-none"
                      }`}>
                        <p>{msg.text}</p>
                        
                        {msg.pdf && (
                          <div className="mt-2.5 bg-[#f6f3f2] text-[#1c1b1b] rounded-lg p-2 flex items-center gap-2 border border-[#E2E0DB] hover:border-[#00386b] cursor-pointer transition-colors group">
                            <div className="w-8 h-8 bg-[#FAECE7] flex items-center justify-center rounded-lg text-[#993C1D]">
                              <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                            </div>
                            <div className="flex-grow overflow-hidden text-left">
                              <p className="text-xs font-semibold truncate">{msg.pdf.name}</p>
                              <p className="text-[9px] text-[#555555]">{msg.pdf.size}</p>
                            </div>
                            <span className="material-symbols-outlined text-xs text-[#555555] group-hover:text-[#00386b]">download</span>
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] text-[#888888] mt-1 ${isParent ? "text-right" : "text-left"}`}>{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#E2E0DB] shrink-0">
              <div className="flex items-center gap-2 bg-[#fcf9f8] p-1.5 rounded-xl border border-[#E2E0DB] focus-within:border-[#00386b] transition-all">
                <input
                  className="flex-grow bg-transparent border-none focus:ring-0 py-2 px-3 text-xs outline-none"
                  placeholder={`Write a message to ${selectedTeacher.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  type="text"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#00386b] text-white h-9 w-9 flex items-center justify-center rounded-lg shadow-sm hover:bg-[#002547] transition-all active:scale-95 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50">
            <span className="material-symbols-outlined text-[64px] text-slate-300 mb-2">chat_bubble</span>
            <p className="text-sm font-semibold text-[#555555]">Select an instructor to start the conversation.</p>
          </div>
        )}
      </section>

      {/* PTM Modal */}
      {ptmModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setPtmModalOpen(false)}></div>
            
            <div className="inline-block bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-[#E2E0DB] z-10">
              <div className="px-6 py-4 border-b border-[#E2E0DB] bg-[#fcf9f8] flex items-center justify-between">
                <h3 className="font-h3 text-base font-bold text-[#00386b]">Request Parent-Teacher Meeting</h3>
                <button className="text-[#555555] hover:text-[#1c1b1b] p-1 rounded-full" onClick={() => setPtmModalOpen(false)}>
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#E6F1FB] rounded-xl border border-[#00386b]/10">
                  {selectedTeacher.photo ? (
                    <Image src={selectedTeacher.photo} alt="Teacher" width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-[#E2E0DB]" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#00386b] text-white flex items-center justify-center font-bold text-xs">T</div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-on-surface">{selectedTeacher.name}</p>
                    <p className="text-[10px] text-[#555555]">Available tomorrow after 3:30 PM</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-2">Select Date (October)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["24", "25", "26", "27"].map((d) => {
                      const isActive = ptmDate === d;
                      return (
                        <button
                          key={d}
                          onClick={() => setPtmDate(d)}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition-all ${
                            isActive
                              ? "border-[#00386b] bg-[#E6F1FB] text-[#00386b]"
                              : "border-[#E2E0DB] hover:border-[#00386b]/50 text-[#424750]"
                          }`}
                        >
                          <p className="text-[9px] uppercase tracking-wider text-[#888888]">OCT</p>
                          <p className="text-sm font-extrabold">{d}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"].map((t) => {
                      const isActive = ptmTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setPtmTime(t)}
                          className={`py-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                            isActive
                              ? "border-[#00386b] bg-[#E6F1FB] text-[#00386b]"
                              : "border-[#E2E0DB] hover:border-[#00386b]/50 text-[#424750]"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">Reason for PTM</label>
                  <textarea
                    className="w-full p-3 border border-[#E2E0DB] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#00386b] focus:border-[#00386b] resize-none"
                    placeholder="Briefly state what you wish to discuss..."
                    rows={3}
                    value={ptmReason}
                    onChange={(e) => setPtmReason(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-[#f6f3f2] px-6 py-4 border-t border-[#E2E0DB] flex justify-end gap-2 shrink-0">
                <button
                  onClick={() => setPtmModalOpen(false)}
                  className="px-4 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-school-blue-extra-light transition-all text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPTM}
                  className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-school-blue-dark transition-all text-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 bg-[#085041] border border-teal-light/20 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 z-50 transition-all duration-300">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <p className="font-label text-xs font-semibold">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
