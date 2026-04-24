import { apiClient } from "./client";

export interface Notice {
  id: string;
  titleEn: string;
  titleHi?: string;
  contentEn: string;
  contentHi?: string;
  slug: string;
  published: boolean;
  isPinned: boolean;
  createdAt: string;
  author?: { email: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const noticeApi = {
  getAll: (params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) =>
    apiClient.get<PaginatedResponse<Notice>>("/notices", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Notice>(`/notices/${id}`),
  
  create: (data: Partial<Notice>) =>
    apiClient.post<Notice>("/notices", data),
  
  update: (id: string, data: Partial<Notice>) =>
    apiClient.put<Notice>(`/notices/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/notices/${id}`),
};
