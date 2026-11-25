import { z } from "zod";

// Bekannte Wegwerf-Mail-Domains (kleine Basis-Liste, erweiterbar).
// Ein MX-/DNS-Check ersetzt keinen Double Opt-in, dient aber als
// zusätzliche Plausibilitätsprüfung.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "temp-mail.org",
  "yopmail.com",
  "dispostable.com",
  "mailnesia.com",
  "fakeinbox.com",
]);

export const waitlistSignupSchema = z.object({
  email: z
    .preprocess(
      (val) =>
        typeof val === "string" ? val.trim().toLowerCase() : val,
      z.string().email("Bitte gib eine gültige E-Mail-Adresse ein.")
    ),
  productSlug: z.string().min(1, "Produkt fehlt."),
  restockRound: z.number().int().positive().default(1),
  consent: z.boolean().refine((v) => v === true, {
    message: "Du musst in die einmalige Benachrichtigung einwilligen.",
  }),
  // Honeypot: muss leer bleiben, sonst ist die Anmeldung ungültig.
  honeypot: z.string().optional().refine((val) => !val, {
    message: "Ungültige Anmeldung.",
  }),
});

export type WaitlistSignupInput = z.infer<typeof waitlistSignupSchema>;

export function isDisposableDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return Boolean(domain && DISPOSABLE_DOMAINS.has(domain));
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
