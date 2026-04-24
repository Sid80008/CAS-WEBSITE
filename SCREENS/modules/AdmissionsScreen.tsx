"use client";

import * as React from "react";
import { Plus, CheckCircle, Clock, XCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdmissions, useUpdateAdmissionStatus, useDeleteAdmission } from "@/hooks/api/use-admissions";

interface Enquiry {
  id: string;
  studentName: string;
  phone: string;
  class: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "REJECTED";
  date: string;
}

export function AdmissionsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: response, isLoading: loading } = useAdmissions();
  const data = response?.data || [];
  
  const updateStatusMutation = useUpdateAdmissionStatus();
  const deleteMutation = useDeleteAdmission();

  const statusIcons = {
    NEW: <Clock className="h-3 w-3" />,
    CONTACTED: <PhoneCall className="h-3 w-3" />,
    CONVERTED: <CheckCircle className="h-3 w-3" />,
    REJECTED: <XCircle className="h-3 w-3" />,
  };

  const statusColors = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-amber-100 text-amber-700",
    CONVERTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  const columns = [
    { header: "Student Name", accessor: (e: Enquiry) => <span className="font-semibold">{e.studentName}</span> },
    { header: "Phone", accessor: "phone" as keyof Enquiry },
    { header: "Interested Class", accessor: "class" as keyof Enquiry },
    { 
      header: "Status", 
      accessor: (e: Enquiry) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[e.status]}`}>
          {statusIcons[e.status]}
          {e.status}
        </span>
      )
    },
    { header: "Enquiry Date", accessor: "date" as keyof Enquiry },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admission CRM</h1>
          <p className="text-sm text-gray-500">Track and manage new admission enquiries and leads.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Manual Enquiry
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={() => {}} placeholder="Search enquiries..." />
        <FilterBar 
          filters={[{ id: "status", label: "Status", options: [{ label: "New", value: "NEW" }, { label: "Contacted", value: "CONTACTED" }] }]}
          activeFilters={{}}
          onChange={() => {}}
          onReset={() => {}}
        />
      </div>

      <DataTable 
        data={data} 
        columns={columns} 
        isLoading={loading}
        actions={[
          { label: "Mark Contacted", onClick: (e: Enquiry) => updateStatusMutation.mutate({ id: e.id, status: "CONTACTED" }) },
          { label: "Delete", variant: "destructive", onClick: (e: Enquiry) => deleteMutation.mutate(e.id) }
        ]} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Admission Lead Entry"
        description="Manually enter details from phone or walk-in enquiries."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Student Full Name</Label>
            <Input placeholder="Enter student name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+91" />
            </div>
            <div className="space-y-2">
               <Label>Applying for Class</Label>
               <Select>
                 <SelectTrigger>
                   <SelectValue placeholder="Select" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="nur">Nursery</SelectItem>
                   <SelectItem value="kg">KG</SelectItem>
                   <SelectItem value="1">1st</SelectItem>
                 </SelectContent>
               </Select>
            </div>
          </div>
          <div className="space-y-2">
             <Label>Notes / Requirements</Label>
             <textarea className="w-full h-24 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-transparent" />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
