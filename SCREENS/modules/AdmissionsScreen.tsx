"use client";

import * as React from "react";
import { Plus, CheckCircle, Clock, XCircle, PhoneCall, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmissions } from "../hooks/useAdmissions";
import { Admission, AdmissionStatus } from "@/lib/api/admissions";

export function AdmissionsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");

  const { data, isLoading, updateAdmission, deleteAdmission, isMutating } = useAdmissions({
    search,
    status,
    page: 1,
    limit: 50
  });

  const admissions = data?.data || [];

  const statusIcons: Record<AdmissionStatus, React.ReactNode> = {
    PENDING: <Clock className="h-3 w-3" />,
    CALLED: <PhoneCall className="h-3 w-3" />,
    ENROLLED: <CheckCircle className="h-3 w-3" />,
    REJECTED: <XCircle className="h-3 w-3" />,
  };

  const statusColors: Record<AdmissionStatus, string> = {
    PENDING: "bg-blue-100 text-blue-700",
    CALLED: "bg-amber-100 text-amber-700",
    ENROLLED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  const columns = [
    { 
      header: "Student Name", 
      accessor: (e: Admission) => <span className="font-semibold text-gray-900">{e.studentName}</span> 
    },
    { 
      header: "Parent", 
      accessor: (e: Admission) => (
        <div className="text-xs text-gray-500">
          <p className="font-medium text-gray-700">{e.parentName}</p>
          <p>{e.phone}</p>
        </div>
      )
    },
    { header: "Grade", accessor: "grade" as keyof Admission },
    { 
      header: "Status", 
      accessor: (e: Admission) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[e.status]}`}>
          {statusIcons[e.status]}
          {e.status}
        </span>
      )
    },
    { 
      header: "Date", 
      accessor: (e: Admission) => new Date(e.createdAt).toLocaleDateString() 
    },
  ];

  const actions = [
    { 
      label: "Mark Called", 
      onClick: (e: Admission) => updateAdmission({ id: e.id, data: { status: "CALLED" } }) 
    },
    { 
      label: "Enroll Student", 
      onClick: (e: Admission) => updateAdmission({ id: e.id, data: { status: "ENROLLED" } }) 
    },
    { 
      label: "Reject", 
      variant: "destructive" as const,
      onClick: (e: Admission) => updateAdmission({ id: e.id, data: { status: "REJECTED" } }) 
    },
    { 
      label: "Delete", 
      variant: "destructive" as const, 
      onClick: (e: Admission) => confirm("Permanently remove lead?") && deleteAdmission(e.id)
    }
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Admission CRM</h1>
          <p className="text-sm text-gray-500">Track and manage new admission enquiries and leads.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row gap-4">
        <SearchBar onSearch={setSearch} placeholder="Search by student or parent name..." />
      </div>

      <DataTable 
        data={admissions} 
        columns={columns} 
        actions={actions}
      />
    </div>
  );
}
