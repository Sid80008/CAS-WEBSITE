import { apiClient } from "./client";

export interface Staff {
  id: string;
  name: string;
  createdAt: string;
  user?: { email: string; isActive: boolean };
  subjects?: any[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const staffApi = {
  getAll: (params: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<Staff>>("/staff", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Staff>(`/staff/${id}`),
  
  create: (data: Partial<Staff>) =>
    apiClient.post<Staff>("/staff", data),
  
  update: (id: string, data: Partial<Staff>) =>
    apiClient.put<Staff>(`/staff/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/staff/${id}`),
};
