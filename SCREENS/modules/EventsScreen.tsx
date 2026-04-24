"use client";

import * as React from "react";
import { Plus, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

export function EventsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const data: SchoolEvent[] = [
    { id: "1", title: "Inter-School Debate", date: "2026-05-10", time: "10:00 AM", location: "Auditorium", status: "Upcoming" },
    { id: "2", title: "PTM - Quarter 1", date: "2026-05-15", time: "09:00 AM", location: "Classrooms", status: "Upcoming" },
  ];

  const columns = [
    { header: "Event Title", accessor: (e: SchoolEvent) => <span className="font-semibold text-gray-900">{e.title}</span> },
    { header: "Schedule", accessor: (e: SchoolEvent) => (
      <div className="text-xs text-gray-500 space-y-0.5">
        <p className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(e.date).toDateString()}</p>
        <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</p>
      </div>
    )},
    { header: "Location", accessor: (e: SchoolEvent) => (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <MapPin className="h-3 w-3" /> {e.location}
      </div>
    )},
    { header: "Status", accessor: (e: SchoolEvent) => (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
        e.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
      }`}>
        {e.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Event Calendar</h1>
          <p className="text-sm text-gray-500">Schedule and manage school events, meetings and holidays.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border flex items-center justify-between">
        <SearchBar onSearch={() => {}} placeholder="Filter events..." />
      </div>

      <DataTable data={data} columns={columns} actions={[{ label: "Edit", onClick: () => {} }]} />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New Event"
        description="Public events will be visible on the school website calendar."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Event Title (English)</Label>
            <Input placeholder="E.g. Republic Day Celebration" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label>Date</Label>
               <Input type="date" />
             </div>
             <div className="space-y-2">
               <Label>Time</Label>
               <Input type="time" />
             </div>
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Main Hall / Ground / Online" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea className="w-full h-24 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-transparent" />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
