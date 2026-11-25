type StatsCardsProps = {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    notified: number;
    unsubscribed: number;
  };
};

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: "Insgesamt", value: stats.total, color: "text-cocoa" },
    { label: "Bestätigt", value: stats.confirmed, color: "text-pink" },
    { label: "Ausstehend", value: stats.pending, color: "text-blush" },
    { label: "Benachrichtigt", value: stats.notified, color: "text-lavender" },
    { label: "Abgemeldet", value: stats.unsubscribed, color: "text-cocoa/50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl bg-cream border-2 border-blush p-5 shadow-sm"
        >
          <div className="text-xs font-semibold text-cocoa/50 uppercase tracking-wider mb-1">
            {card.label}
          </div>
          <div className="text-3xl font-display font-bold {card.color}">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
