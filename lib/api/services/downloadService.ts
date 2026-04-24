import { createCrudService } from "@/lib/api/crudService";
import type { Download } from "@/lib/api/types";

export const downloadService = createCrudService<Download>("/downloads");
