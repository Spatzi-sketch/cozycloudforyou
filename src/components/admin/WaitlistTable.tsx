"use client";

type WaitlistRow = {
  id: string;
  email: string;
  product_slug: string;
  restock_round: number;
  status: string;
  created_at: string;
  confirmed_at: string | null;
  notified_at: string | null;
};

type WaitlistTableProps = {
  signups: WaitlistRow[];
  onRestock?: (productSlug: string, restockRound: number) => void;
};

const statusColors: Record<string, string> = {
  pending: "bg-lavender text-cocoa",
  confirmed: "bg-pink text-cocoa",
  notified: "bg-blush text-cocoa",
  unsubscribed: "bg-cocoa/20 text-cocoa/50",
};

export function WaitlistTable({
  signups,
  onRestock,
}: WaitlistTableProps) {
  if (signups.length === 0) {
    return (
      <div className="rounded-3xl bg-cream border-2 border-blush p-8 text-center">
        <p className="text-cocoa/60">Keine Einträge gefunden.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-cream border-2 border-blush overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-blush bg-cream/50">
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">E-Mail</th>
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">Produkt</th>
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">Runde</th>
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">Status</th>
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">Angemeldet</th>
            <th className="px-5 py-4 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {signups.map((row) => (
            <tr key={row.id} className="border-b border-blush/30 last:border-0">
              <td className="px-5 py-4 text-cocoa font-medium">{row.email}</td>
              <td className="px-5 py-4 text-cocoa/80">{row.product_slug}</td>
              <td className="px-5 py-4 text-cocoa/80">{row.restock_round}</td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[row.status] ?? statusColors.pending}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-5 py-4 text-cocoa/60 text-sm">
                {new Date(row.created_at).toLocaleDateString("de-DE")}
              </td>
              <td className="px-5 py-4">
                {onRestock && row.status === "confirmed" && row.notified_at === null ? (
                  <button
                    onClick={() => onRestock(row.product_slug, row.restock_round)}
                    className="text-pink text-xs font-semibold underline decoration-pink/30 hover:decoration-pink"
                  >
                    Restock-Mail
                  </button>
                ) : (
                  <span className="text-cocoa/40 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
