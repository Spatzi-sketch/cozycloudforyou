import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { waitlistTable } from "@/lib/supabase/query";
import { env } from "@/lib/env";
import { sendEmail } from "@/lib/email/resend";
import { restockEmailHtml, restockEmailText } from "@/lib/email/templates";

type RestockBody = {
  productSlug: string;
  restockRound?: number;
};

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof Response) {
    return admin;
  }

  if (!env.resendApiKey || !env.emailFrom) {
    return NextResponse.json(
      { message: "Resend ist nicht konfiguriert (RESEND_API_KEY / EMAIL_FROM)." },
      { status: 503 }
    );
  }

  let body: RestockBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Ungültiger Anfragekörper." }, { status: 400 });
  }

  const { productSlug, restockRound = 1 } = body;
  if (!productSlug) {
    return NextResponse.json({ message: "productSlug fehlt." }, { status: 400 });
  }

  const db = waitlistTable();

  const { data: confirmed, error: fetchError } = await db
    .select("*")
    .eq("product_slug", productSlug)
    .eq("restock_round", restockRound)
    .eq("status", "confirmed")
    .is("notified_at", null)
    .order("created_at", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ message: fetchError.message }, { status: 500 });
  }

  const recipients = confirmed ?? [];
  let sent = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const unsubscribeUrl = `${env.siteUrl}/api/unsubscribe?token=${recipient.unsubscribe_token_hash}`;
    const restockUrl = `${env.siteUrl}/produkte/${productSlug}`;

    const result = await sendEmail({
      to: recipient.email,
      subject: "Your favorite pants are back! ☁️",
      html: restockEmailHtml({
        restockUrl,
        productName: productSlug,
        unsubscribeUrl,
      }),
      text: restockEmailText({
        restockUrl,
        productName: productSlug,
        unsubscribeUrl,
      }),
    });

    if (result.success) {
      sent++;
      await db
        .update({
          status: "notified",
          notified_at: new Date().toISOString(),
        })
        .eq("id", recipient.id);
    } else {
      failed++;
    }
  }

  return NextResponse.json({
    message: `Restock-Mails versendet: ${sent} erfolgreich, ${failed} fehlgeschlagen.`,
    sent,
    failed,
    total: recipients.length,
  });
}
