import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import { createHash } from "crypto";

type WaitlistRow = {
  id: string;
  email: string;
  product_slug: string;
  restock_round: number;
  status: string;
  confirmation_token_hash: string | null;
  confirmation_token_expires_at: string | null;
  unsubscribe_token_hash: string | null;
  consent_at: string | null;
  consent_version: string | null;
  created_at: string;
  confirmed_at: string | null;
  notified_at: string | null;
};

type SupaBuilder = {
  select: (columns: string) => SupaBuilder;
  eq: (column: string, value: string | number) => SupaBuilder;
  maybeSingle: () => Promise<{
    data: WaitlistRow | null;
    error: { message: string } | null;
  }>;
  update: (record: Partial<WaitlistRow>) => SupaUpdateBuilder;
};

type SupaUpdateBuilder = {
  eq: (column: string, value: string) => Promise<{
    error: { message: string } | null;
  }>;
};

const typedAdmin = (): SupaBuilder => {
  return createAdminClient().from("waitlist_signups" as const) as unknown as SupaBuilder;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Abmeldetoken fehlt." }, { status: 400 });
  }

  if (!env.supabaseUrl || !env.supabaseSecretKey) {
    return NextResponse.json(
      { message: "Backend ist noch nicht konfiguriert." },
      { status: 503 }
    );
  }

  const supabase = typedAdmin();
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const { data: signup, error } = await supabase
    .select("id, status")
    .eq("unsubscribe_token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { message: "Ungültiger Abmeldelink." },
      { status: 400 }
    );
  }

  if (!signup) {
    return NextResponse.json(
      { message: "Ungültiger Abmeldelink." },
      { status: 400 }
    );
  }

  if (signup.status === "unsubscribed") {
    return NextResponse.redirect(new URL("/waitlist/unsubscribed", env.siteUrl));
  }

  await supabase
    .update({ status: "unsubscribed" })
    .eq("id", signup.id);

  return NextResponse.redirect(new URL("/waitlist/unsubscribed", env.siteUrl));
}
