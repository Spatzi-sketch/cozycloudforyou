import Link from "next/link";

export default function KontaktPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex-grow max-w-md mx-auto p-6 lg:p-12">
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-8">
          Kontakt
        </h1>

        <div className="bg-cream border-2 border-blush rounded-3xl p-8 shadow-sm">
          <h2 className="font-display text-xl text-cocoa mb-6">Schreib uns</h2>
          <p className="mb-6 text-cocoa/80 leading-relaxed">
            Hast du eine Frage zu unseren Hosen oder zum Restock? Schreib uns
            gerne eine Nachricht.
          </p>
          <ul className="list-disc list-inside mb-8 text-cocoa/80 leading-relaxed space-y-3">
            <li>
              E-Mail:{" "}
              <a href="mailto:hello@cozycloud.example" className="text-pink underline">
                hello@cozycloud.example
              </a>
            </li>
            <li>
              Adresse: Cozy Cloud, Musterstraße 1, 4040 Linz, Österreich
            </li>
          </ul>
          <p className="text-xs text-cocoa/50">
            Alternativ erreichst du uns auf Instagram und TikTok.
          </p>
        </div>

        <p className="mt-12 text-xs text-cocoa/50 text-center">
          <Link href="/" className="hover:text-pink transition-colors">
            Zurück zur Startseite ☁️
          </Link>
        </p>
      </main>
    </div>
  );
}
