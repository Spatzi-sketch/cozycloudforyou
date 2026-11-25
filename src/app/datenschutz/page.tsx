import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex-grow max-w-3xl mx-auto p-6 lg:p-12">
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-8">
          Datenschutz
        </h1>

        <h2 className="font-display text-xl text-cocoa mb-4">1. Verantwortlicher</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Cozy Cloud<br />
          Musterstraße 1<br />
          4040 Linz, Österreich<br />
          E-Mail: hello@cozycloud.example
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">2. Erhebung personenbezogener Daten</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Wenn du dich für unsere Warteliste anmeldest, verarbeiten wir deine
          E-Mail-Adresse, um dich über den Restock zu informieren. Die
          Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">3. Double Opt-in</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Nach der Anmeldung erhältst du eine Bestätigungs-E-Mail. Erst nach
          Bestätigung wird deine Adresse gespeichert. Du kannst dich jederzeit
          über den Abmeldelink in unseren E-Mails abmelden.
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">4. Deine Rechte</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Du hast das Recht auf Auskunft, Berichtigung, Löschung und
          Übertragbarkeit deiner Daten sowie das Recht, deine Einwilligung
          jederzeit zu widerrufen.
        </p>

        <h2 className="font-display text-xl text-cocoa mb-4">5. Kontakt</h2>
        <p className="mb-6 text-cocoa/80 leading-relaxed">
          Bei Fragen zum Datenschutz schreibe uns an{" "}
          <a href="mailto:hello@cozycloud.example" className="text-pink underline">
            hello@cozycloud.example
          </a>
          .
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
