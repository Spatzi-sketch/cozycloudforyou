"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCards } from "@/components/admin/StatsCards";
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

type Stats = {
  total: number;
  pending: number;
  confirmed: number;
  notified: number;
  unsubscribed: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    notified: 0,
    unsubscribed: 0,
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);

    try {
      const res = await fetch(`/api/admin/waitlist?${params}`);
      const data = await res.json();
      setSignups(data.signups ?? []);
      setStats(data.stats ?? { total: 0, pending: 0, confirmed: 0, notified: 0, unsubscribed: 0 });
    } catch {
      setSignups([]);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

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
      loadData();
    })();
    return () => {
      cancelled = true;
    };
  }, [loadData]);

  if (authError) {
    router.push("/admin/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="rounded-full bg-cocoa text-white px-6 py-3 font-display font-bold text-xl tracking-tighter">
          Lädt…
        </div>
      </div>
    );
  }

  const filtered = signups.filter((s) => {
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    if (search && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const exportUrl = new URL("/api/admin/export", window.location.origin);
  if (filterStatus !== "all") exportUrl.searchParams.set("status", filterStatus);
  if (search) exportUrl.searchParams.set("search", search);

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-cocoa mb-2">Admin-Dashboard</h1>
            <p className="text-cocoa/70">Wartelisten-Übersicht und Restock-Steuerung.</p>
          </div>
          <a
            href={exportUrl.toString()}
            className="ml-auto lg:ml-0 rounded-full bg-cocoa text-white px-5 py-2.5 font-semibold text-sm hover:shadow-lg transition-all"
          >
            CSV exportieren
          </a>
        </div>

        <StatsCards stats={stats} />

        <div className="mt-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3">
            <span className="text-cocoa/70 text-sm hidden sm:block">Status filtern:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border-2 border-blush px-4 py-2 text-cocoa bg-cream focus:outline-none focus:ring-2 focus:ring-cocoa text-sm"
            >
              <option value="all">Alle</option>
              <option value="pending">Ausstehend</option>
              <option value="confirmed">Bestätigt</option>
              <option value="notified">Benachrichtigt</option>
              <option value="unsubscribed">Abgemeldet</option>
            </select>
            <input
              type="text"
              placeholder="Nach E-Mail suchen…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-3 lg:ml-4 rounded-xl border-2 border-blush px-4 py-2 text-cocoa bg-cream focus:outline-none focus:ring-2 focus:ring-cocoa text-sm w-48"
            />
          </div>
          {filtered.length > 0 && (
            <RestockButton
              productSlug={filtered[0].product_slug}
              restockRound={filtered[0].restock_round}
            />
          )}
        </div>

        <WaitlistTable
          signups={filtered}
          onRestock={(slug) => {
            router.push(`/admin/products/${slug}`);
          }}
        />
      </main>
    </div>
  );
}
