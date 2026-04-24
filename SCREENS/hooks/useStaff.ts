import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { staffApi, Staff } from "@/lib/api/staff";
import { useToast } from "@/hooks/use-toast";

export function useStaff(params: { page?: number; limit?: number; search?: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["staff", params],
    queryFn: () => staffApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Staff>) => staffApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({ title: "Success", description: "Staff member added successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to add staff member",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Staff> }) => staffApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({ title: "Success", description: "Staff member updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update staff member",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => staffApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({ title: "Success", description: "Staff member removed successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete staff member",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createStaff: createMutation.mutateAsync,
    updateStaff: updateMutation.mutateAsync,
    deleteStaff: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
