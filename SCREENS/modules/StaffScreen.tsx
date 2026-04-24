"use client";

import * as React from "react";
import { Plus, UserRound, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Staff {
  id: string;
  name: string;
  role: string;
  subject: string;
  phone: string;
  status: "Active" | "On Leave";
}

export function StaffScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const data: Staff[] = [
    { id: "1", name: "Mr. Anand Dev", role: "Principal", subject: "Administration", phone: "+91 9876543210", status: "Active" },
    { id: "2", name: "Ms. Shalini Sharma", role: "TGT", subject: "Science", phone: "+91 9812345678", status: "Active" },
  ];

  const columns = [
    { header: "Name", accessor: (s: Staff) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center font-bold text-xs">
          {s.name[0]}
        </div>
        <span className="font-medium text-gray-900">{s.name}</span>
      </div>
    )},
    { header: "Role", accessor: "role" as keyof Staff },
    { header: "Subject", accessor: "subject" as keyof Staff },
    { header: "Contact", accessor: (s: Staff) => (
      <div className="text-xs text-gray-500">
        <p className="flex items-center gap-1"><Phone className="h-3 w-3" /> {s.phone}</p>
      </div>
    )},
    { header: "Status", accessor: (s: Staff) => (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
        s.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
      }`}>
        {s.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff Directory</h1>
          <p className="text-sm text-gray-500">Manage academic and administrative personnel.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={() => {}} placeholder="Search staff members..." />
        <FilterBar 
          filters={[{ id: "role", label: "Role", options: [{ label: "Principal", value: "p" }, { label: "Teacher", value: "t" }] }]}
          activeFilters={{}}
          onChange={() => {}}
          onReset={() => {}}
        />
      </div>

      <DataTable data={data} columns={columns} actions={[{ label: "Edit", onClick: () => {} }]} />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Staff Member"
        description="Fill in the details for the new staff member."
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label>Full Name</Label>
            <Input placeholder="E.g. Rajesh Kumar" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="rajesh@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="+91 00000 00000" />
          </div>
          <div className="space-y-2">
            <Label>Designation</Label>
            <Input placeholder="TGT / PGT / Admin" />
          </div>
          <div className="space-y-2">
            <Label>Primary Subject</Label>
            <Input placeholder="Mathematics" />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
