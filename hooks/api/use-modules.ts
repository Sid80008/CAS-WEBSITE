"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService, staffService, eventService, galleryService, downloadService } from "@/services/modules.service";
import { useToast } from "@/hooks/use-toast";

// === Students ===
export function useStudents(params?: any) {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => studentService.getAll(params),
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (payload: any) => studentService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({ title: "Success", description: "Student registered successfully" });
    },
  });
}

// === Staff ===
export function useStaff(params?: any) {
  return useQuery({
    queryKey: ["staff", params],
    queryFn: () => staffService.getAll(params),
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (payload: any) => staffService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({ title: "Success", description: "Staff member added successfully" });
    },
  });
}

// === Events ===
export function useEvents(params?: any) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => eventService.getAll(params),
  });
}

// === Gallery ===
export function useGallery(params?: any) {
  return useQuery({
    queryKey: ["gallery", params],
    queryFn: () => galleryService.getAll(params),
  });
}

// === Downloads ===
export function useDownloads(params?: any) {
  return useQuery({
    queryKey: ["downloads", params],
    queryFn: () => downloadService.getAll(params),
  });
}
