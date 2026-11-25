import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex-grow max-w-3xl mx-auto p-6 lg:p-12">
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-8">
          Impressum
        </h1>

        <h2 className="font-display text-xl text-cocoa mb-4">Angaben gemäß § 5 TMG</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Cozy Cloud<br />
          Musterstraße 1<br />
          4040 Linz, Österreich
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">Vertretung</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Inhaber: Max Mustermann
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">Kontakt</h2>
        <ul className="list-disc list-inside mb-6 text-cocoa/80 leading-relaxed space-y-2">
          <li>
            E-Mail: <a href="mailto:hello@cozycloud.example" className="text-pink underline">
              hello@cozycloud.example
            </a>
          </li>
          <li>Telefon: +43 123 456789</li>
        </ul>

        <h2 className="font-display text-xl text-cocoa mb-4">Umsatzsteuer-ID</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          ATU12345678
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">Haftungsausschluss</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen.
        </p>

        <p className="mt-12 text-xs text-cocoa/50 text-center">
          <Link href="/" className="hover:text-pink transition-colors">
            Zurück zur Startseite ☁️
          </Link>
        </p>
      </main>
    </div>
  );
}
