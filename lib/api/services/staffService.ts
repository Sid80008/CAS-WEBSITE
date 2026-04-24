import { createCrudService } from "@/lib/api/crudService";
import type { Staff } from "@/lib/api/types";

export const staffService = createCrudService<Staff>("/staff");
