"use client";

import * as React from "react";
import { Plus, Download, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudents } from "../hooks/useStudents";
import { Student } from "@/lib/api/students";

export function StudentsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  
  const { data, isLoading, createStudent, updateStudent, deleteStudent, isMutating } = useStudents({ 
    search, 
    page, 
    limit: 10 
  });

  const columns = [
    { 
      header: "Name", 
      accessor: (s: Student) => <span className="font-semibold">{s.firstName} {s.lastName}</span> 
    },
    { header: "Admission No", accessor: "admissionNo" as keyof Student },
    { 
      header: "Class", 
      accessor: (s: Student) => {
        const enrollment = s.enrollments?.[0];
        return enrollment ? `${enrollment.section.class.name}-${enrollment.section.name}` : "N/A";
      }
    },
    { 
      header: "Status", 
      accessor: (s: Student) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Active
        </span>
      )
    },
  ];

  const actions = [
    { label: "Edit Details", onClick: (s: Student) => { setEditingStudent(s); setIsModalOpen(true); } },
    { 
      label: "Delete", 
      variant: "destructive" as const, 
      onClick: async (s: Student) => {
        if (confirm("Are you sure you want to delete this student?")) {
          await deleteStudent(s.id);
        }
      } 
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      admissionNo: formData.get("admissionNo") as string,
      dob: formData.get("dob") as string,
      gender: formData.get("gender") as any,
    };

    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent.id, data: payload });
      } else {
        await createStudent(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Error handled by hook toasts
    }
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

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <SearchBar 
          onSearch={(v) => { setSearch(v); setPage(1); }} 
          placeholder="Search students by name or admission no..." 
        />
      </div>

      <DataTable 
        data={data?.data || []} 
        columns={columns} 
        actions={actions}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "Edit Student" : "Register New Student"}
        description="Enter the student details below to update the system records."
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input name="firstName" placeholder="John" defaultValue={editingStudent?.firstName} required />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input name="lastName" placeholder="Doe" defaultValue={editingStudent?.lastName} required />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Admission No</Label>
              <Input name="admissionNo" placeholder="2024/XXX" defaultValue={editingStudent?.admissionNo} required />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input name="dob" type="date" defaultValue={editingStudent?.dob?.split("T")[0]} required />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select name="gender" defaultValue={editingStudent?.gender?.toUpperCase() || "MALE"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isMutating}>
              {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingStudent ? "Update Student" : "Save Student"}
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
