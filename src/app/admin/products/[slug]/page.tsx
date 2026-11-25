"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WaitlistTable } from "@/components/admin/WaitlistTable";
import { RestockButton } from "@/components/admin/RestockButton";

type Signup = {
  id: string;
  email: string;
  product_slug: string;
  restock_round: number;
  status: string;
  created_at: string;
  confirmed_at: string | null;
  notified_at: string | null;
};

export default function AdminProductPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [restockRound, setRestockRound] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!data.user) {
          setAuthError(true);
          return;
        }
      } catch {
        setAuthError(true);
        return;
      }
      if (cancelled) return;
      params.then(({ slug: s }) => {
        setSlug(s);
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/waitlist?product_slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        const list = data.signups ?? [];
        setSignups(list);
        if (list.length > 0) {
          setRestockRound(list[0].restock_round);
        }
      } catch {
        setSignups([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (authError) {
    router.push("/admin/login");
    return null;
  }

  if (loading || !slug) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="rounded-full bg-cocoa text-white px-6 py-3 font-display font-bold text-xl tracking-tighter">
          Lädt…
        </div>
      </div>
    );
  }

  const stats = {
    total: signups.length,
    pending: signups.filter((s) => s.status === "pending").length,
    confirmed: signups.filter((s) => s.status === "confirmed").length,
    notified: signups.filter((s) => s.status === "notified").length,
    unsubscribed: signups.filter((s) => s.status === "unsubscribed").length,
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden lg:flex lg:w-64 flex-col gap-2">
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin"
            className="rounded-2xl bg-cream border-2 border-blush px-5 py-3 font-semibold text-left block text-cocoa hover:bg-blush-light transition-all"
          >
            ← Zurück zum Dashboard
          </Link>
        </nav>
      </aside>
      <main className="flex-grow p-6 lg:p-12">
        <h1 className="font-display text-3xl text-cocoa mb-2">
          Produkt: {slug}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Insgesamt", value: stats.total },
            { label: "Bestätigt", value: stats.confirmed },
            { label: "Ausstehend", value: stats.pending },
            { label: "Benachrichtigt", value: stats.notified },
            { label: "Abgemeldet", value: stats.unsubscribed },
          ].map((card, i) => (
            <div key={i} className="rounded-3xl bg-cream border-2 border-blush p-5 shadow-sm">
              <div className="text-xs font-semibold text-cocoa/50 uppercase tracking-wider mb-1">
                {card.label}
              </div>
              <div className="text-3xl font-display font-bold text-cocoa">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <RestockButton productSlug={slug} restockRound={restockRound} />
        </div>

        <WaitlistTable signups={signups} />
      </main>
    </div>
  );
}
