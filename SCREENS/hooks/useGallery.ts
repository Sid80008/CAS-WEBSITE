import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryApi, Gallery } from "@/lib/api/gallery";
import { useToast } from "@/hooks/use-toast";

export function useGallery(params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["gallery", params],
    queryFn: () => galleryApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Gallery>) => galleryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({ title: "Success", description: "Gallery album created" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to create album",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Gallery> }) => galleryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({ title: "Success", description: "Album updated" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update album",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({ title: "Success", description: "Album removed" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete album",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createAlbum: createMutation.mutateAsync,
    updateAlbum: updateMutation.mutateAsync,
    deleteAlbum: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
