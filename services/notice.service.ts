import apiClient from "@/lib/api-client";

export interface Notice {
  id: string;
  titleEn: string;
  titleHi: string;
  contentEn?: string;
  contentHi?: string;
  published: boolean;
  isPinned: boolean;
  createdAt: string;
}

export const noticeService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/notices", { params });
    return data; // Returns { data: Notice[], total: number, page: number }
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/notices/${id}`);
    return data;
  },

  create: async (payload: Partial<Notice>) => {
    const { data } = await apiClient.post("/notices", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Notice>) => {
    const { data } = await apiClient.put(`/notices/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/notices/${id}`);
    return data;
  }
};
