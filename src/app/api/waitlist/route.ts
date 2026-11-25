import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";
import {
  waitlistSignupSchema,
  isDisposableDomain,
} from "@/lib/validation/waitlist";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import {
  confirmationEmailHtml,
  confirmationEmailText,
} from "@/lib/email/templates";
import { createHash, randomBytes } from "crypto";

const CONFIRM_TTL_MS = 24 * 60 * 60 * 1000; // 24 Stunden

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

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

type WaitlistInsert = Omit<
  WaitlistRow,
  "id" | "created_at" | "confirmed_at" | "notified_at"
>;

type SupaBuilder = {
  select: (columns: string) => SupaBuilder;
  eq: (column: string, value: string | number) => SupaBuilder;
  in: (column: string, values: string[]) => SupaBuilder;
  gte: (column: string, value: string) => SupaBuilder;
  maybeSingle: () => Promise<{
    data: WaitlistRow | null;
    error: { message: string } | null;
  }>;
  insert: (record: WaitlistInsert) => Promise<{
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

export async function POST(request: Request) {
  if (
    !env.supabaseUrl ||
    !env.supabasePublishableKey ||
    !env.supabaseSecretKey
  ) {
    return NextResponse.json(
      {
        message:
          "Backend ist noch nicht konfiguriert. Bitte später erneut versuchen.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Ungültiger Anfragekörper." },
      { status: 400 }
    );
  }

  const parsed = waitlistSignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues.map((issue) => issue.message).join(", ") },
      { status: 400 }
    );
  }

  const { email, productSlug, restockRound } = parsed.data;
  const disposable = isDisposableDomain(email);

  const rateLimit = await checkRateLimit(email);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        message: `Zu viele Anmeldungen f&uuml;r diese E-Mail-Adresse. Bitte versuche es in ${rateLimit.remaining} Minuten erneut.`,
      },
      { status: 429 }
    );
  }

  const supabase = typedAdmin();

  const { data: existing } = await supabase
    .select("id, status")
    .eq("email", email)
    .eq("product_slug", productSlug)
    .eq("restock_round", restockRound)
    .in("status", ["pending", "confirmed", "notified"])
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        message:
          "Du bist f&uuml;r dieses Produkt bereits auf der Warteliste eingetragen.",
      },
      { status: 409 }
    );
  }

  const confirmToken = randomBytes(32).toString("hex");
  const unsubscribeToken = randomBytes(32).toString("hex");
  const confirmationTokenHash = hashToken(confirmToken);
  const unsubscribeTokenHash = hashToken(unsubscribeToken);
  const confirmationTokenExpiresAt = new Date(
    Date.now() + CONFIRM_TTL_MS
  ).toISOString();

  const insertPayload: WaitlistInsert = {
    email,
    product_slug: productSlug,
    restock_round: restockRound,
    status: "pending",
    confirmation_token_hash: confirmationTokenHash,
    confirmation_token_expires_at: confirmationTokenExpiresAt,
    unsubscribe_token_hash: unsubscribeTokenHash,
    consent_at: new Date().toISOString(),
    consent_version: "1.0",
  };

  const { error: insertError } = await supabase.insert(insertPayload);

  if (insertError) {
    return NextResponse.json(
      { message: "Die Anmeldung konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }

  const confirmUrl = `${env.siteUrl}/api/waitlist/confirm?token=${confirmToken}`;
  const emailResult = await sendEmail({
    to: email,
    subject: "One more step to get cozy! ☁️",
    html: confirmationEmailHtml({
      confirmUrl,
      email,
      productName: productSlug,
    }),
    text: confirmationEmailText({
      confirmUrl,
      email,
      productName: productSlug,
    }),
  });

  if (!emailResult.success && !disposable) {
    return NextResponse.json(
      {
        message:
          "Eingetragen! Bitte best&auml;tige deine E-Mail-Adresse &uuml;ber den Link in der Best&auml;tigungs-E-Mail.",
        warning: emailResult.error,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message:
        "Eingetragen! Bitte best&auml;tige deine E-Mail-Adresse &uuml;ber den Link in der Best&auml;tigungs-E-Mail.",
    },
    { status: 200 }
  );
}
