import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventApi, Event } from "@/lib/api/events";
import { useToast } from "@/hooks/use-toast";

export function useEvents(params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["events", params],
    queryFn: () => eventApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Event>) => eventApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Success", description: "Event created successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to create event",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) => eventApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Success", description: "Event updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update event",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => eventApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Success", description: "Event removed successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete event",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createEvent: createMutation.mutateAsync,
    updateEvent: updateMutation.mutateAsync,
    deleteEvent: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
