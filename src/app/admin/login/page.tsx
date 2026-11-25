"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Login fehlgeschlagen.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Die Verbindung zum Backend konnte nicht hergestellt werden.");
      setLoading(false);
    }
  };

  if (!envConfigured()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center">
        <div className="rounded-3xl bg-blush-light border-2 border-blush p-10 shadow-xl max-w-md">
          <div className="text-4xl mb-6">☁️</div>
          <h1 className="font-display text-2xl text-cocoa mb-4">Admin-Login</h1>
          <p className="text-cocoa/80 mb-6">
            Supabase ist nicht konfiguriert (NEXT_PUBLIC_SUPABASE_URL /
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY fehlen). Bitte zuerst in
            .env.local eintragen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6">
      <div className="rounded-3xl bg-cream border-2 border-blush p-10 shadow-xl max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-3xl">☁️</span>
          <h1 className="font-display text-2xl text-cocoa">Admin-Login</h1>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-pink/10 border border-pink p-4 text-sm text-pink">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dein@beispiel.de"
              required
              className="w-full rounded-xl border-2 border-blush px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-1">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-blush px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cocoa text-white py-3 font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            Einloggen
          </button>
        </form>

        <p className="mt-6 text-xs text-cocoa/50 text-center">
          Der Zugang ist auf die konfigurierte Admin-E-Mail-Adresse
          beschr&auml;nkt.
        </p>
      </div>
    </div>
  );
}

function envConfigured(): boolean {
  return Boolean(
    typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
