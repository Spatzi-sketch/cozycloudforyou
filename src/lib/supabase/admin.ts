import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/types/database";

export function createAdminClient(): SupabaseClient<Database> {
  if (!env.supabaseUrl || !env.supabaseSecretKey) {
    throw new Error(
      "Supabase Admin-Client ist nicht konfiguriert. Bitte NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SECRET_KEY in .env.local setzen."
    );
  }

  return createClient<Database>(env.supabaseUrl, env.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
