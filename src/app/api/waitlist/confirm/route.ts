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
  gte: (column: string, value: string) => SupaBuilder;
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
    return NextResponse.json({ message: "Best&auml;tigungstoken fehlt." }, { status: 400 });
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
    .select("*")
    .eq("confirmation_token_hash", tokenHash)
    .eq("status", "pending")
    .gte("confirmation_token_expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { message: "Ungültiger oder abgelaufener Best&auml;tigungslink." },
      { status: 400 }
    );
  }

  if (!signup) {
    return NextResponse.json(
      { message: "Ungültiger oder abgelaufener Best&auml;tigungslink." },
      { status: 400 }
    );
  }

  await supabase
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirmation_token_hash: null,
      confirmation_token_expires_at: null,
    })
    .eq("id", signup.id);

  const confirmUrl = new URL("/waitlist/confirmed", env.siteUrl);
  return NextResponse.redirect(confirmUrl);
}
