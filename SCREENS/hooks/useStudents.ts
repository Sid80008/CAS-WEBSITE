import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi, Student } from "@/lib/api/students";
import { useToast } from "@/hooks/use-toast";

export function useStudents(params: { page?: number; limit?: number; search?: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["students", params],
    queryFn: () => studentApi.getAll(params).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<Student, "id" | "createdAt">) => studentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({ title: "Success", description: "Student registered successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to register student",
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) => studentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({ title: "Success", description: "Student updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to update student",
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => studentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({ title: "Success", description: "Student removed successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to delete student",
        variant: "destructive" 
      });
    }
  });

  return {
    ...query,
    createStudent: createMutation.mutateAsync,
    updateStudent: updateMutation.mutateAsync,
    deleteStudent: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}
