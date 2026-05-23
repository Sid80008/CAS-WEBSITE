"use client";

import React, { useState, useEffect, useRef } from "react";

interface Contact {
  userId: string;
  name: string;
  info: string;
}

interface TeacherMessagesClientProps {
  contacts: Contact[];
  activeUserId: string;
}

interface Message {
  id: string;
  sender: "self" | "other" | "system";
  text: string;
  time: string;
}

export default function TeacherMessagesClient({ contacts, activeUserId }: TeacherMessagesClientProps) {
  const [selectedContactId, setSelectedContactId] = useState<string>(
    contacts[0]?.userId || ""
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Find currently selected contact
  const selectedContact = contacts.find(c => c.userId === selectedContactId);

  // Poll messages every 2 seconds
  useEffect(() => {
    if (!selectedContactId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?userId=${selectedContactId}`);
        if (res.ok) {
          const data = await res.json();
          const mapped: Message[] = data.map((m: any) => {
            const isSystem = m.content.startsWith("📆") || m.content.startsWith("Confirmed");
            return {
              id: m.id,
              sender: isSystem ? "system" : (m.senderId === activeUserId ? "self" : "other"),
              text: m.content,
              time: new Date(m.createdAt).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit"
              })
            };
          });
          setMessages(mapped);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selectedContactId, activeUserId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter contacts list
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.info.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedContactId) return;

    const textToSend = inputText;
    setInputText("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedContactId,
          content: textToSend
        })
      });
      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [
          ...prev,
          {
            id: newMessage.id,
            sender: "self",
            text: textToSend,
            time: new Date(newMessage.createdAt).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit"
            })
          }
        ]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleApprovePTM = async (msgText: string) => {
    if (!selectedContactId) return;
    
    // Extract date and time from the request text if possible
    // e.g. "📆 Requested PTM for Oct 24 at 04:00 PM..."
    const dateMatch = msgText.match(/Oct \d+/);
    const timeMatch = msgText.match(/\d+:\d+ [AP]M/);
    
    const dateStr = dateMatch ? dateMatch[0] : "Requested date";
    const timeStr = timeMatch ? timeMatch[0] : "Requested time";

    const approvalText = `Confirmed. I've accepted your PTM request for ${dateStr} at ${timeStr}. Looking forward to discussing academics.`;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedContactId,
          content: approvalText
        })
      });
      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [
          ...prev,
          {
            id: newMessage.id,
            sender: "self",
            text: approvalText,
            time: new Date(newMessage.createdAt).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit"
            })
          }
        ]);
      }
    } catch (err) {
      console.error("Error confirming PTM:", err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] border border-[#E2E0DB] rounded-2xl bg-white overflow-hidden shadow-sm text-[#1c1b1b]">
      {/* Sidebar: Contacts List */}
      <aside className={`w-full md:w-80 border-r border-[#E2E0DB] bg-[#f6f3f2] flex flex-col h-full shrink-0 ${
        mobileView === "chat" ? "hidden md:flex" : "flex"
      }`}>
        <div className="p-4 border-b border-[#E2E0DB] bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-h3 text-lg font-bold text-[#00386b]">Contacts</h3>
            <span className="bg-[#E6F1FB] text-[#00386b] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {contacts.length} Total
            </span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#424750] text-[20px]">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-2 bg-[#fcf9f8] border border-[#E2E0DB] rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#00386b]"
              placeholder="Search parents/students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {filteredContacts.map((contact) => {
            const isSelected = contact.userId === selectedContactId;
            return (
              <button
                key={contact.userId}
                onClick={() => {
                  setSelectedContactId(contact.userId);
                  setMobileView("chat");
                }}
                className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all ${
                  isSelected
                    ? "bg-[#E6F1FB] border-l-4 border-[#00386b] text-[#00386b]"
                    : "hover:bg-[#eae7e7]/50 text-[#424750]"
                }`}
              >
                <div className="relative shrink-0 w-11 h-11">
                  <div className="w-11 h-11 rounded-full bg-[#085041] text-white flex items-center justify-center font-bold text-sm">
                    {contact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3B6D11] border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-xs truncate text-[#1c1b1b]">{contact.name}</span>
                  </div>
                  <p className="text-[10px] text-[#555555] truncate">
                    {contact.info}
                  </p>
                </div>
              </button>
            );
          })}
          {filteredContacts.length === 0 && (
            <p className="text-center text-xs text-[#555555] py-8">No contacts found.</p>
          )}
        </div>
      </aside>

      {/* Chat Pane */}
      <section className={`flex-1 flex flex-col bg-[#fcf9f8] relative h-full ${
        mobileView === "list" ? "hidden md:flex" : "flex"
      }`}>
        {selectedContact ? (
          <>
            {/* Active Contact Header */}
            <div className="h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-[#E2E0DB] z-10 shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden p-1.5 rounded-full text-[#424750] hover:bg-[#eae7e7] transition-all flex items-center justify-center mr-1"
                  aria-label="Back to contact list"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>

                <div className="w-10 h-10 rounded-full bg-[#E6F1FB] flex items-center justify-center shrink-0 border border-[#00386b]/10 relative">
                  <span className="font-bold text-xs text-[#00386b]">
                    {selectedContact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface leading-tight">
                    {selectedContact.name}
                  </h4>
                  <p className="text-[10px] text-[#555555] truncate">
                    {selectedContact.info}
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation Window */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="flex flex-col items-center gap-2 my-3">
                      <div className="bg-[#FAEEDA] border-l-4 border-[#633806] px-4 py-2 rounded-r-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm max-w-md w-full">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#633806] text-sm shrink-0">info</span>
                          <p className="text-xs text-[#633806] font-medium leading-normal">{msg.text}</p>
                        </div>
                        {/* Check if PTM is already confirmed */}
                        {!messages.some(m => m.sender === "self" && m.text.includes("Confirmed") && m.text.includes(msg.text.match(/Oct \d+/)?.[0] || "")) && (
                          <button
                            onClick={() => handleApprovePTM(msg.text)}
                            className="bg-[#633806] text-white hover:opacity-90 text-[10px] font-bold px-3 py-1 rounded shadow-sm self-end sm:self-auto shrink-0 whitespace-nowrap"
                          >
                            Approve Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                const isSelf = msg.sender === "self";
                return (
                  <div key={msg.id} className={`flex items-end gap-2 max-w-[85%] ${isSelf ? "ml-auto flex-row-reverse" : ""}`}>
                    <div className="flex flex-col">
                      <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        isSelf
                          ? "bg-[#00386b] text-white rounded-br-none"
                          : "bg-white border border-[#E2E0DB] text-[#1c1b1b] rounded-bl-none"
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                      <span className={`text-[9px] text-[#888888] mt-1 ${isSelf ? "text-right" : "text-left"}`}>{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <div className="text-center text-xs text-[#555555] py-12">
                  No message history with {selectedContact.name}.
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#E2E0DB] shrink-0">
              <div className="flex items-center gap-2 bg-[#fcf9f8] p-1.5 rounded-xl border border-[#E2E0DB] focus-within:border-[#00386b] transition-all">
                <input
                  className="flex-grow bg-transparent border-none focus:ring-0 py-2 px-3 text-xs outline-none text-black"
                  placeholder={`Write a response to ${selectedContact.name}...`}
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
            <p className="text-sm font-semibold text-[#555555]">Select a contact to start messaging.</p>
          </div>
        )}
      </section>
    </div>
  );
}
