import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admissionApi, Admission } from "@/lib/api/admissions";
import { useToast } from "@/hooks/use-toast";

export function useAdmissions(params: { page?: number; limit?: number; search?: string; status?: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admissions", params],
    queryFn: () => admissionApi.getAll(params).then((res) => res.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Admission> }) => admissionApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      toast({ title: "Success", description: "Admission record updated" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update record",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => admissionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admissions"] });
      toast({ title: "Success", description: "Record removed" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete record",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    updateAdmission: updateMutation.mutateAsync,
    deleteAdmission: deleteMutation.mutateAsync,
    isMutating: updateMutation.isPending || deleteMutation.isPending
  };
}
