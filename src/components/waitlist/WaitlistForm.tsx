"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

type WaitlistFormProps = {
  productSlug: string;
  onSubmit: (email: string) => void | Promise<void>;
  isSubmitting?: boolean;
  message?: { type: "success" | "error"; text: string } | null;
};

export function WaitlistForm({
  productSlug,
  onSubmit,
  isSubmitting = false,
  message,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    await onSubmit(trimmed);
  };

  if (message?.type === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center p-6 rounded-3xl bg-blush-light border border-blush">
        <ShieldCheck className="w-10 h-10 text-cocoa" />
        <h3 className="font-display text-xl text-cocoa">
          Vielen Dank! ☁️
        </h3>
        <p className="text-cocoa/70">
          Prüfe deinen Posteingang ({email}) und bestätige deine Anmeldung.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEmail("");
            setConsent(false);
          }}
        >
          Noch einmal eintragen
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl bg-cream border-2 border-blush p-6 shadow-lg"
    >
      <input
        type="hidden"
        name="productSlug"
        value={productSlug}
      />

      <div className="flex flex-col gap-2">
        <label className="font-body text-sm font-semibold text-cocoa">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dein@beispiel.de"
          className="rounded-xl border-2 border-blush px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa transition-all"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-cocoa text-cocoa bg-cream focus:ring-cocoa"
          disabled={isSubmitting}
          required
        />
        <label
          htmlFor="consent"
          className="text-sm text-cocoa/80 leading-relaxed"
        >
          Ich möchte eine einmalige Benachrichtigung erhalten, sobald dieses
          Produkt wieder verfügbar ist. Weitere Informationen finde ich in den{" "}
          <a href="/datenschutz" className="text-pink underline">
            Datenschutzhinweisen
          </a>
          .
        </label>
      </div>

      {message?.type === "error" && (
        <p className="text-sm text-pink">{message.text}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting || !consent}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" /> Wird versendet...
          </span>
        ) : (
          "NOTIFY ME"
        )}
      </Button>

      <p className="text-xs text-cocoa/50 text-center">
        Du erhältst eine Bestätigungs-E-Mail. Eine Adresse, eine Benachrichtigung.
      </p>
    </form>
  );
}
