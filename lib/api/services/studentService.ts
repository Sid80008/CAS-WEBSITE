import { createCrudService } from "@/lib/api/crudService";
import type { Student } from "@/lib/api/types";

export const studentService = createCrudService<Student>("/students");
