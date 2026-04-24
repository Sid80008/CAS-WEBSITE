"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noticeService, Notice } from "@/services/notice.service";
import { useToast } from "@/hooks/use-toast";

export function useNotices(params?: any) {
  return useQuery({
    queryKey: ["notices", params],
    queryFn: () => noticeService.getAll(params),
  });
}

export function useCreateNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: Partial<Notice>) => noticeService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "Success",
        description: "Notice created successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create notice",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Notice> }) =>
      noticeService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "Updated",
        description: "Notice updated successfully",
      });
    },
  });
}

export function useDeleteNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => noticeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast({
        title: "Deleted",
        description: "Notice removed successfully",
      });
    },
  });
}
