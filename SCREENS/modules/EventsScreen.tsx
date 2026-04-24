"use client";

import * as React from "react";
import { Plus, Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEvents } from "../hooks/useEvents";
import { Event } from "@/lib/api/events";

export function EventsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, createEvent, updateEvent, deleteEvent, isMutating } = useEvents({
    search,
    page: 1,
    limit: 50
  });

  const events = data?.data || [];

  const columns = [
    { 
      header: "Event Title", 
      accessor: (e: Event) => <span className="font-semibold text-gray-900">{e.titleEn}</span> 
    },
    { 
      header: "Schedule", 
      accessor: (e: Event) => (
        <div className="text-xs text-gray-500 space-y-0.5">
          <p className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {new Date(e.date).toDateString()}
          </p>
        </div>
      )
    },
    { 
      header: "Status", 
      accessor: (e: Event) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          e.published ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
        }`}>
          {e.published ? "Published" : "Draft"}
        </span>
      )
    },
  ];

  const actions = [
    { label: "Edit Event", onClick: (e: Event) => { setEditingEvent(e); setIsModalOpen(true); } },
    { 
      label: "Delete", 
      variant: "destructive" as const, 
      onClick: async (e: Event) => {
        if (confirm("Delete this event?")) {
          await deleteEvent(e.id);
        }
      } 
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      titleEn: formData.get("titleEn") as string,
      descriptionEn: formData.get("descriptionEn") as string,
      date: formData.get("date") as string,
      published: true,
    };

    try {
      if (editingEvent) {
        await updateEvent({ id: editingEvent.id, data: payload });
      } else {
        await createEvent(payload);
      }
      handleModalClose();
    } catch (err) { }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Event Calendar</h1>
          <p className="text-sm text-gray-500">Schedule and manage school events, meetings and holidays.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Event
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <SearchBar onSearch={setSearch} placeholder="Filter events by title..." />
      </div>

      <DataTable 
        data={events} 
        columns={columns} 
        actions={actions} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingEvent ? "Update Event" : "Schedule New Event"}
        description="Public events will be visible on the school website calendar."
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Event Title (English)</Label>
            <Input name="titleEn" placeholder="E.g. Republic Day Celebration" defaultValue={editingEvent?.titleEn} required />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input name="date" type="date" defaultValue={editingEvent?.date?.split("T")[0]} required />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea 
              name="descriptionEn"
              defaultValue={editingEvent?.descriptionEn}
              className="w-full h-24 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-transparent" 
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isMutating}>
              {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingEvent ? "Update Event" : "Schedule Event"}
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
