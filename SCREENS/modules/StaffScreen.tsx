"use client";

import * as React from "react";
import { Plus, UserRound, Phone, Mail, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStaff } from "../hooks/useStaff";
import { Staff } from "@/lib/api/staff";

export function StaffScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingStaff, setEditingStaff] = React.useState<Staff | null>(null);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading, createStaff, updateStaff, deleteStaff, isMutating } = useStaff({
    search,
    page,
    limit: 10
  });

  const columns = [
    { header: "Name", accessor: (s: Staff) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center font-bold text-xs">
          {s.name[0]}
        </div>
        <span className="font-medium text-gray-900">{s.name}</span>
      </div>
    )},
    { 
      header: "Email", 
      accessor: (s: Staff) => s.user?.email || "N/A"
    },
    { 
      header: "Subject", 
      accessor: (s: Staff) => s.subjects?.[0]?.subject?.name || "Administration"
    },
    { header: "Status", accessor: (s: Staff) => (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
        s.user?.isActive ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
      }`}>
        {s.user?.isActive ? "Active" : "Inactive"}
      </span>
    )},
  ];

  const actions = [
    { label: "Edit Member", onClick: (s: Staff) => { setEditingStaff(s); setIsModalOpen(true); } },
    { 
      label: "Delete", 
      variant: "destructive" as const, 
      onClick: async (s: Staff) => {
        if (confirm(`Remove ${s.name} from staff directory?`)) {
          await deleteStaff(s.id);
        }
      } 
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
    };

    try {
      if (editingStaff) {
        await updateStaff({ id: editingStaff.id, data: payload });
      } else {
        await createStaff(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Handled by toast
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff Directory</h1>
          <p className="text-sm text-gray-500">Manage academic and administrative personnel.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => { setEditingStaff(null); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <SearchBar 
          onSearch={(v) => { setSearch(v); setPage(1); }} 
          placeholder="Search staff members..." 
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
        title={editingStaff ? "Edit Staff Details" : "Add Staff Member"}
        description="Fill in the details for the staff member profile."
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input name="name" placeholder="E.g. Rajesh Kumar" defaultValue={editingStaff?.name} required />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isMutating}>
              {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingStaff ? "Update Member" : "Save Member"}
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
