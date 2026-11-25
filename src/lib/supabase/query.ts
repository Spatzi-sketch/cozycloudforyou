import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/types/database";

type WaitlistRow = Database["public"]["Tables"]["waitlist_signups"]["Row"];
type WaitlistInsert = Database["public"]["Tables"]["waitlist_signups"]["Insert"];

type RowQuery = {
  eq: (column: string, value: string | number) => RowQuery;
  neq: (column: string, value: string) => RowQuery;
  ilike: (column: string, value: string) => RowQuery;
  is: (column: string, value: null | boolean) => RowQuery;
  order: (column: string, opts?: { ascending: boolean }) => RowQuery;
  then<T>(
    onfulfilled: (
      value: { data: WaitlistRow[] | null; error: { message: string } | null }
    ) => T | PromiseLike<T>
  ): Promise<T>;
};

type RowUpdate = {
  eq: (column: string, value: string) => Promise<{
    error: { message: string } | null;
  }>;
};

type TableBuilder = {
  select: (columns: string) => RowQuery;
  insert: (record: WaitlistInsert) => Promise<{
    error: { message: string } | null;
  }>;
  update: (record: Partial<WaitlistRow>) => RowUpdate;
};

const missingConfigError = { message: "Supabase ist nicht konfiguriert." };

const noopQuery: RowQuery = {
  eq: () => noopQuery,
  neq: () => noopQuery,
  ilike: () => noopQuery,
  is: () => noopQuery,
  order: () => noopQuery,
  then: <T>(
    onfulfilled: (
      value: { data: WaitlistRow[] | null; error: { message: string } | null }
    ) => T | PromiseLike<T>
  ) =>
    Promise.resolve(onfulfilled({ data: null, error: missingConfigError })),
};

const noopUpdate: RowUpdate = {
  eq: () => Promise.resolve({ error: missingConfigError }),
};

const noopBuilder: TableBuilder = {
  select: () => noopQuery,
  insert: () => Promise.resolve({ error: missingConfigError }),
  update: () => noopUpdate,
};

function createTableBuilder(): TableBuilder {
  if (!env.supabaseUrl || !env.supabaseSecretKey) {
    return noopBuilder;
  }

  const client: SupabaseClient<Database> = createClient(
    env.supabaseUrl,
    env.supabaseSecretKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return client.from("waitlist_signups" as const) as unknown as TableBuilder;
}

export function waitlistTable(): TableBuilder {
  return createTableBuilder();
}
