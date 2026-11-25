import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Serverseitiges Rate Limiting für die Warteliste.
 * Die Zähler liegen in Supabase (nicht nur im Arbeitsspeicher), damit sie
 * über serverlose Funktionsaufrufe hinweg bestehen bleiben (Vercel).
 *
 * Gibt { allowed: boolean, remaining: number } zurück.
 */
const WINDOW_MINUTES = 60;
const MAX_ATTEMPTS = 3;

export async function checkRateLimit(email: string): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  const supabase = createAdminClient();

  const windowStart = new Date(
    Date.now() - WINDOW_MINUTES * 60 * 1000
  ).toISOString();

  const { count, error } = await supabase
    .from("waitlist_signups")
    .select("*", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .gte("created_at", windowStart);

  if (error) {
    // Im Fehlerfall (z. B. nicht konfiguriert) zulassen, damit das Formular
    // nicht blockiert, aber einen Hinweis liefern.
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  const attempts = count ?? 0;
  const remaining = Math.max(0, MAX_ATTEMPTS - attempts);

  return {
    allowed: attempts < MAX_ATTEMPTS,
    remaining,
  };
}
