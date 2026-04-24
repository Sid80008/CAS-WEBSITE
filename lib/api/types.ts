export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Notice {
  id: string;
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  published: boolean;
  isPinned: boolean;
  date: string;
}

export type NoticeInput = Omit<Notice, "id">;

export interface Student {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface Staff {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface Gallery {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface Download {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface Admission {
  id: string;
  studentName: string;
  [key: string]: unknown;
}
