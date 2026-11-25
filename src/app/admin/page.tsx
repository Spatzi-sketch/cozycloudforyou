export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream p-6">
      <main className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-8">
          Admin-Dashboard
        </h1>
        <div className="bg-cream border-2 border-blush rounded-3xl p-8 shadow-sm">
          <p className="text-cocoa/80">
            Der Admin-Bereich (Wartelisten-Übersicht, Restock-Funktion,
            CSV-Export) folgt in Phase 5 &amp; 6.
          </p>
        </div>
      </main>
    </div>
  );
}
