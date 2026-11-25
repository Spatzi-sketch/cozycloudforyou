import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center">
      <div className="space-y-4">
        <h1 className="font-display text-6xl text-cocoa">☁️ 404</h1>
        <h2 className="font-display text-2xl text-cocoa">
          Diese Seite gibt es (noch) nicht.
        </h2>
        <p className="text-cocoa/70 max-w-md">
          Vielleicht war sie ein kleiner Wolkentanz. Keine Sorge, wir bringen
          dich zurück auf Kurs.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-cocoa text-white px-8 py-3 font-semibold hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
