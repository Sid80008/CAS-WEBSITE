import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { downloadApi, Resource } from "@/lib/api/downloads";
import { useToast } from "@/hooks/use-toast";

export function useDownloads(params: { page?: number; limit?: number; search?: string; type?: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["downloads", params],
    queryFn: () => downloadApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Resource>) => downloadApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
      toast({ title: "Success", description: "Resource uploaded" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Upload failed",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) => downloadApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
      toast({ title: "Success", description: "Resource updated" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Update failed",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => downloadApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
      toast({ title: "Success", description: "Resource removed" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Delete failed",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createResource: createMutation.mutateAsync,
    updateResource: updateMutation.mutateAsync,
    deleteResource: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
