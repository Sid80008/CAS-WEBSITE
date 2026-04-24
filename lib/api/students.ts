import { apiClient } from "./client";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  dob: string;
  gender: string;
  createdAt: string;
  enrollments?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const studentApi = {
  getAll: (params: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<Student>>("/students", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Student>(`/students/${id}`),
  
  create: (data: Omit<Student, "id" | "createdAt">) =>
    apiClient.post<Student>("/students", data),
  
  update: (id: string, data: Partial<Student>) =>
    apiClient.put<Student>(`/students/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/students/${id}`),
};
