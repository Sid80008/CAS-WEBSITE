import { apiClient } from "./client";

export type AdmissionStatus = 'PENDING' | 'CALLED' | 'ENROLLED' | 'REJECTED';

export interface Admission {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  grade: string;
  status: AdmissionStatus;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const admissionApi = {
  getAll: (params: { page?: number; limit?: number; search?: string; status?: string }) =>
    apiClient.get<PaginatedResponse<Admission>>("/admissions", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Admission>(`/admissions/${id}`),
  
  apply: (data: Partial<Admission>) =>
    apiClient.post<Admission>("/admissions/apply", data),

  create: (data: Partial<Admission>) =>
    apiClient.post<Admission>("/admissions", data),
  
  update: (id: string, data: Partial<Admission>) =>
    apiClient.put<Admission>(`/admissions/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/admissions/${id}`),
};
