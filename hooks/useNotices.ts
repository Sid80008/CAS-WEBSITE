"use client";

import * as React from "react";
import { noticeService } from "@/lib/api/services";
import type { Notice, NoticeInput } from "@/lib/api/types";

interface UseNoticesResult {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useNotices(): UseNoticesResult {
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refetch = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await noticeService.getAll();
      setNotices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void refetch();
  }, [refetch]);

  return { notices, loading, error, refetch };
}

interface UseCreateNoticeResult {
  createNotice: (payload: NoticeInput) => Promise<Notice>;
  isCreating: boolean;
  error: string | null;
}

export function useCreateNotice(onSuccess?: () => Promise<void> | void): UseCreateNoticeResult {
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const createNotice = React.useCallback(
    async (payload: NoticeInput) => {
      setIsCreating(true);
      setError(null);
      try {
        const created = await noticeService.create(payload);
        await onSuccess?.();
        return created;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to create notice";
        setError(message);
        throw err;
      } finally {
        setIsCreating(false);
      }
    },
    [onSuccess],
  );

  return { createNotice, isCreating, error };
}

interface UseUpdateNoticeResult {
  updateNotice: (id: string, payload: Partial<NoticeInput>) => Promise<Notice>;
  isUpdating: boolean;
  error: string | null;
}

export function useUpdateNotice(onSuccess?: () => Promise<void> | void): UseUpdateNoticeResult {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const updateNotice = React.useCallback(
    async (id: string, payload: Partial<NoticeInput>) => {
      setIsUpdating(true);
      setError(null);
      try {
        const updated = await noticeService.update(id, payload);
        await onSuccess?.();
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to update notice";
        setError(message);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    [onSuccess],
  );

  return { updateNotice, isUpdating, error };
}

interface UseDeleteNoticeResult {
  deleteNotice: (id: string) => Promise<void>;
  isDeleting: boolean;
  error: string | null;
}

export function useDeleteNotice(onSuccess?: () => Promise<void> | void): UseDeleteNoticeResult {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const deleteNotice = React.useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);
      try {
        await noticeService.delete(id);
        await onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete notice";
        setError(message);
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    [onSuccess],
  );

  return { deleteNotice, isDeleting, error };
}
