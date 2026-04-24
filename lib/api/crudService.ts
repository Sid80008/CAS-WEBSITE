import { apiClient } from "@/lib/api/client";

export interface CrudService<TItem, TCreate = Partial<TItem>, TUpdate = Partial<TItem>> {
  getAll: () => Promise<TItem[]>;
  getById: (id: string) => Promise<TItem>;
  create: (payload: TCreate) => Promise<TItem>;
  update: (id: string, payload: TUpdate) => Promise<TItem>;
  delete: (id: string) => Promise<void>;
}

export function createCrudService<TItem, TCreate = Partial<TItem>, TUpdate = Partial<TItem>>(
  resourcePath: string,
): CrudService<TItem, TCreate, TUpdate> {
  return {
    async getAll() {
      const response = await apiClient.get<TItem[]>(resourcePath);
      return response.data;
    },
    async getById(id) {
      const response = await apiClient.get<TItem>(`${resourcePath}/${id}`);
      return response.data;
    },
    async create(payload) {
      const response = await apiClient.post<TItem>(resourcePath, payload);
      return response.data;
    },
    async update(id, payload) {
      const response = await apiClient.put<TItem>(`${resourcePath}/${id}`, payload);
      return response.data;
    },
    async delete(id) {
      await apiClient.delete(`${resourcePath}/${id}`);
    },
  };
}
