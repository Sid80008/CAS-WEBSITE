import { createCrudService } from "@/lib/api/crudService";
import type { Gallery } from "@/lib/api/types";

export const galleryService = createCrudService<Gallery>("/gallery");
