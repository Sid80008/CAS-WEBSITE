import { createCrudService } from "@/lib/api/crudService";
import type { Admission } from "@/lib/api/types";

export const admissionService = createCrudService<Admission>("/admissions");
