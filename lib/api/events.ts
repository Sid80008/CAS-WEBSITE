import { apiClient } from "./client";

export interface Event {
  id: string;
  titleEn: string;
  titleHi?: string;
  descriptionEn: string;
  descriptionHi?: string;
  date: string;
  slug: string;
  published: boolean;
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

export const eventApi = {
  getAll: (params: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) =>
    apiClient.get<PaginatedResponse<Event>>("/events", { params }),
  
  getOne: (id: string) => 
    apiClient.get<Event>(`/events/${id}`),
  
  create: (data: Partial<Event>) =>
    apiClient.post<Event>("/events", data),
  
  update: (id: string, data: Partial<Event>) =>
    apiClient.put<Event>(`/events/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/events/${id}`),
};
