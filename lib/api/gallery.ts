import { apiClient } from "./client";

export interface Gallery {
  id: string;
  titleEn: string;
  titleHi?: string;
  images: string[];
  category?: string;
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

export const galleryApi = {
  getAll: (params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) =>
    apiClient.get<PaginatedResponse<Gallery>>("/gallery", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Gallery>(`/gallery/${id}`),
  
  create: (data: Partial<Gallery>) =>
    apiClient.post<Gallery>("/gallery", data),
  
  update: (id: string, data: Partial<Gallery>) =>
    apiClient.put<Gallery>(`/gallery/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/gallery/${id}`),
};
