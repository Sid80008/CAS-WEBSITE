"use client";

import * as React from "react";
import { Plus, Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
interface Student {
  id: string;
  name: string;
  admissionNo: string;
  class: string;
  parent: string;
  status: "Active" | "Inactive";
}

export function StudentsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  
  // Sample Data
  const data: Student[] = [
    { id: "1", name: "Rahul Sharma", admissionNo: "2024/001", class: "10-A", parent: "Rajesh Sharma", status: "Active" },
    { id: "2", name: "Priya Singh", admissionNo: "2024/002", class: "12-B", parent: "Anita Singh", status: "Active" },
    { id: "3", name: "Aman Verma", admissionNo: "2024/003", class: "9-C", parent: "Suresh Verma", status: "Inactive" },
  ];

  const columns = [
    { header: "Name", accessor: (s: Student) => <span className="font-semibold">{s.name}</span> },
    { header: "Admission No", accessor: "admissionNo" as keyof Student },
    { header: "Class", accessor: "class" as keyof Student },
    { header: "Parent", accessor: "parent" as keyof Student },
    { 
      header: "Status", 
      accessor: (s: Student) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}>
          {s.status}
        </span>
      )
    },
  ];

  const actions = [
    { label: "Edit Details", onClick: (s: Student) => { setEditingStudent(s); setIsModalOpen(true); } },
    { label: "View Profile", onClick: (s: Student) => console.log("View", s) },
    { label: "Delete", variant: "destructive" as const, onClick: (s: Student) => console.log("Delete", s) },
  ];

  const filters = [
    { id: "class", label: "Class", options: [{ label: "Class 10", value: "10" }, { label: "Class 12", value: "12" }] },
    { id: "status", label: "Status", options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }] },
  ];

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
          <p className="text-sm text-gray-500">Manage student records, enrollment and profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="h-10 bg-indigo-600 hover:bg-indigo-700" onClick={() => { setEditingStudent(null); setIsModalOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* ActionBar Area */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={(v) => console.log(v)} placeholder="Search students by name or admission no..." />
        <FilterBar 
          filters={filters} 
          activeFilters={{}} 
          onChange={(id, val) => console.log(id, val)}
          onReset={() => console.log("Reset")}
        />
      </div>

      {/* Table Area */}
      <DataTable 
        data={data} 
        columns={columns} 
        actions={actions}
      />

      {/* Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "Edit Student" : "Register New Student"}
        description="Enter the student details below to update the system records."
        onSubmit={() => setIsModalOpen(false)}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-1">
            <Label>First Name</Label>
            <Input placeholder="John" defaultValue={editingStudent?.name.split(" ")[0]} />
          </div>
          <div className="space-y-2 col-span-1">
            <Label>Last Name</Label>
            <Input placeholder="Doe" defaultValue={editingStudent?.name.split(" ")[1]} />
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Admission No</Label>
            <Input placeholder="2024/XXX" defaultValue={editingStudent?.admissionNo} />
          </div>
          <div className="space-y-2 col-span-1">
            <Label>Date of Birth</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2 col-span-1">
            <Label>Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
