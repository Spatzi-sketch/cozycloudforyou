import { env } from "@/lib/env";

export function isAdminEmail(email: string): boolean {
  if (!env.adminEmail) {
    return false;
  }
  return email.trim().toLowerCase() === env.adminEmail.trim().toLowerCase();
}
