"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admissionService } from "@/services/modules.service";
import { useToast } from "@/hooks/use-toast";

export function useAdmissions(params?: any) {
  return useQuery({
    queryKey: ["admissions", params],
    queryFn: () => admissionService.getAll(params),
  });
}

export function useUpdateAdmissionStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      admissionService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      toast({
        title: "Status Updated",
        description: "Enquiry status changed successfully",
      });
    },
  });
}

export function useDeleteAdmission() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => admissionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      toast({
        title: "Enquiry Deleted",
        description: "Enquiry record removed",
      });
    },
  });
}
