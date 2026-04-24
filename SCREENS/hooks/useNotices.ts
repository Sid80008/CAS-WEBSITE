import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noticeApi, Notice } from "@/lib/api/notices";
import { useToast } from "@/hooks/use-toast";

export function useNotices(params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notices", params],
    queryFn: () => noticeApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Notice>) => noticeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({ title: "Success", description: "Notice published successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to publish notice",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Notice> }) => noticeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({ title: "Success", description: "Notice updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update notice",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => noticeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({ title: "Success", description: "Notice removed successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete notice",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createNotice: createMutation.mutateAsync,
    updateNotice: updateMutation.mutateAsync,
    deleteNotice: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
