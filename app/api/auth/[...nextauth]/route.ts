// app/api/auth/[...nextauth]/route.ts
// Single source of truth — re-export handlers from the v5 auth config
export { GET, POST } from "@/auth";
