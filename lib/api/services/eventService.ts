import { createCrudService } from "@/lib/api/crudService";
import type { Event } from "@/lib/api/types";

export const eventService = createCrudService<Event>("/events");
