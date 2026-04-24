import { createCrudService } from "@/lib/api/crudService";
import type { Notice, NoticeInput } from "@/lib/api/types";

export const noticeService = createCrudService<Notice, NoticeInput, Partial<NoticeInput>>("/notices");
