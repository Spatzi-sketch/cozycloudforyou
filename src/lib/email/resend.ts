import { Resend } from "resend";
import { env } from "@/lib/env";

let resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!env.resendApiKey) {
    return null;
  }
  if (!resend) {
    resend = new Resend(env.resendApiKey);
  }
  return resend;
}

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const resendClient = getResend();
  if (!resendClient || !env.emailFrom) {
    return {
      success: false,
      error: "Resend ist nicht konfiguriert (RESEND_API_KEY / EMAIL_FROM fehlen).",
    };
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: env.emailFrom,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: undefined };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unbekannter E-Mail-Fehler.",
    };
  }
}
