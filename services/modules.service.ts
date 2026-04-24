import apiClient from "@/lib/api-client";

export const studentService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/students", { params });
    return data;
  },
  create: async (payload: any) => {
    const { data } = await apiClient.post("/students", payload);
    return data;
  },
  update: async (id: string, payload: any) => {
    const { data } = await apiClient.put(`/students/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/students/${id}`);
    return data;
  }
};

export const staffService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/staff", { params });
    return data;
  },
  create: async (payload: any) => {
    const { data } = await apiClient.post("/staff", payload);
    return data;
  },
  update: async (id: string, payload: any) => {
    const { data } = await apiClient.put(`/staff/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/staff/${id}`);
    return data;
  }
};

export const galleryService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/gallery", { params });
    return data;
  },
  create: async (payload: any) => {
    const { data } = await apiClient.post("/gallery", payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/gallery/${id}`);
    return data;
  }
};

export const eventService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/events", { params });
    return data;
  },
  create: async (payload: any) => {
    const { data } = await apiClient.post("/events", payload);
    return data;
  },
  update: async (id: string, payload: any) => {
    const { data } = await apiClient.put(`/events/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/events/${id}`);
    return data;
  }
};

export const downloadService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/downloads", { params });
    return data;
  },
  create: async (payload: any) => {
    const { data } = await apiClient.post("/downloads", payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/downloads/${id}`);
    return data;
  }
};

export const admissionService = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/admissions", { params });
    return data;
  },
  updateStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch(`/admissions/${id}/status`, { status });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/admissions/${id}`);
    return data;
  }
};
