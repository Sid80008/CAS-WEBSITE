import { apiClient } from "./client";

export type ResourceType = 'FORM' | 'SYLLABUS' | 'HOMEWORK' | 'OTHER';

export interface Resource {
  id: string;
  title: string;
  fileUrl: string;
  type: ResourceType;
  published: boolean;
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

export const downloadApi = {
  getAll: (params: { page?: number; limit?: number; search?: string; type?: string }) =>
    apiClient.get<PaginatedResponse<Resource>>("/downloads", { params }),
  
  create: (data: Partial<Resource>) =>
    apiClient.post<Resource>("/downloads", data),
  
  update: (id: string, data: Partial<Resource>) =>
    apiClient.put<Resource>(`/downloads/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/downloads/${id}`),
};
