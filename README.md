# Cozy Cloud – Kompletter Neuaufbau der Website

Willkommen im Cozy-Cloud-Repository. Dies ist eine Next.js-App-Router-Website für einen Onlineshop mit gemütlichen Hosen, einer Warteliste mit Double Opt-in und einem geschützten Admin-Bereich.

## Technologien

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Sprache | TypeScript (Strict) |
| Styling | Tailwind CSS 4 |
| Paketmanager | npm |
| Datenbank | Supabase |
| Admin-Authentifizierung | Supabase Auth |
| E-Mail-Versand | Resend |
| Animationen | Framer Motion |
| Icons | Lucide React |
| Hosting | Vercel |

## Projektstruktur

Die `package.json` liegt direkt im Repository-Hauptverzeichnis. Es gibt genau ein Next.js-Projekt (kein verschachteltes Unterprojekt).

```text
COZY-CLOUD/
├── public/             # Statische Assets (Bilder, Logo, favicon)
├── src/                # Anwendungscode
│   ├── app/            # Next.js App Router (Seiten + API-Routen)
│   ├── components/     # React-Komponenten
│   ├── data/           # Zentrale Produktdaten
│   ├── lib/            # Technische Helfer (Supabase, Resend, Validierung, …)
│   ├── types/          # TypeScript-Typen
│   └── proxy.ts        # Supabase-Session-Proxy (Next.js 16)
├── supabase/migrations/# Versionierte SQL-Migrationen
├── .env.example        # Beispiel-Umgebungsvariablen
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## Lokale Entwicklung

### 1. Abhängigkeiten installieren

```bash
npm ci
```

### 2. Umgebungsvariablen anlegen

Kopiere die Beispieldatei und trage deine Werte ein:

```bash
cp .env.example .env.local
```

Öffne `.env.local` und fülle mindestens die Werte aus, die du lokal testen möchtest (Supabase, Resend, Admin-E-Mail). Die Startseite baut auch ohne diese Werte korrekt; die Warteliste und der Admin-Bereich benötigen jedoch eine funktionierende Backend-Verbindung.

### 3. Entwicklungs-Server starten

```bash
npm run dev
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

### 4. Prüfungen ausführen

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript (Strict)
npm run build       # Produktions-Build
```

Alle drei Befehle müssen fehlerfrei durchlaufen.

## Externe Accounts

Für den vollen Funktionsumfang benötigst du:

1. **Supabase** (https://supabase.com) – Datenbank, Authentifizierung, Row Level Security.
2. **Resend** (https://resend.com) – E-Mail-Versand (Wartelisten-Bestätigung, Restock-Mails).
3. **Vercel** (https://vercel.com) – Hosting/Deployment.

## Supabase einrichten

1. Lege ein neues Supabase-Projekt an.
2. Kopiere die Werte in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (nur serverseitig!)
3. Führe die SQL-Migration aus:

```bash
# Über die Supabase SQL-Editor oder CLI
supabase db push
```

Alternativ führe den Inhalt von `supabase/migrations/202611250001_waitlist.sql` im Supabase SQL-Editor aus.

Die Migration erstellt die Tabelle `waitlist_signups` mit Row Level Security, sodass nur authentifizierte Admins auf die E-Mail-Adressen zugreifen können.

## Resend einrichten

1. Lege ein Resend-Konto an und verifiziere eine Absender-Domain.
2. Trage in `.env.local`:
   - `RESEND_API_KEY`
   - `EMAIL_FROM` (z. B. `hello@deinedomain.de`)
3. Die E-Mails werden ausschließlich serverseitig über `src/lib/email/resend.ts` versandt.

## Umgebungsvariablen (`.env.local`)

| Variable | Zweck | Serverseitig? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Öffentliche URL der Website | Nein |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase-Projekt-URL | Nein |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Publishable Key | Nein |
| `SUPABASE_SECRET_KEY` | Supabase Secret Key | **Ja (nur Server)** |
| `RESEND_API_KEY` | Resend API-Key | **Ja (nur Server)** |
| `EMAIL_FROM` | Absender-E-Mail-Adresse | **Ja (nur Server)** |
| `ADMIN_EMAIL` | E-Mail des Administrators | **Ja (nur Server)** |

Secret Keys (`SUPABASE_SECRET_KEY`, `RESEND_API_KEY`) dürfen niemals ins Frontend gelangen und nie in GitHub committet werden.

## Deployment mit Vercel

1. Pushe den Code in ein GitHub-Repository.
2. Lege ein neues Projekt in Vercel an und verbinde das Repository.
3. Wähle als **Root Directory** `./` aus (das Verzeichnis mit der `package.json`).
4. Vercel erkennt automatisch das **Next.js Framework Preset**.
5. Build Command: `npm run build` (automatisch erkannt).
6. Install Command: automatisch mit npm.
7. Node.js: 24.x (sofern verfügbar).
8. Trage alle Umgebungsvariablen aus `.env.local` in die Vercel-Projekt-Einstellungen ein.
9. Deployen. Es ist keine `vercel.json` erforderlich und kein `output: export`.

## Neue Produkte hinzufügen

Alle Produkte werden zentral in `src/data/products.ts` verwaltet. Ein neuer Eintrag erscheint automatisch auf der Startseite:

```typescript
{
  id: "product-05",
  slug: "cozy-pants-05",
  name: "Neue Cozy Hose",
  image: "/images/products/product-05.png",
  priceInCents: 2499,
  status: "unavailable",
  restockRound: 1,
}
```

Jede Hose benötigt eine eigene `id` und einen eigenen `slug`. Der Preis wird in Cent gespeichert (z. B. `2499` für 24,99 €).

## Produktbilder austauschen

Lege neue Bilder unter `public/images/products/` ab und verweise in `src/data/products.ts` über das Feld `image` auf den Pfad (z. B. `/images/products/product-05.png`). Nutze lokale Dateien statt externer URLs.

## Admin-Bereich

- Login unter `/admin/login` (geschützt durch Supabase Auth).
- Nur die in `ADMIN_EMAIL` konfigurierte Adresse erhält Zugriff (serverseitig geprüft).
- Das Dashboard zeigt die Wartelisten-Anmeldungen, unterstützt Filter, Suche und CSV-Export sowie den Restock-E-Mail-Versand.

## Befehle auf einen Blick

```bash
npm ci        # Abhängigkeiten installieren (reproduzierbar)
npm run dev   # Entwicklungs-Server
npm run build # Produktions-Build
npm run start # Produktions-Server (lokal)
npm run lint  # ESLint
npm run typecheck  # TypeScript Strict
```

## Hinweise

- Echte Zugangsdaten gehören in `.env.local` und werden niemals in GitHub committet.
- Die `.env.example` darf eingecheckt werden.
- Es gibt derzeit keinen Warenkorb und keine Checkout-Funktion (alle Produkte haben den Status `unavailable` bis zum Restock).
