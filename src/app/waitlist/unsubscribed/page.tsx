import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center">
      <div className="rounded-full bg-blush-light border-2 border-blush p-10 md:p-16 shadow-xl max-w-md">
        <div className="text-6xl mb-6">☁️</div>
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-4">
          Abgemeldet
        </h1>
        <p className="text-lg text-cocoa/80 leading-relaxed">
          Du wurdest von der Warteliste abgemeldet und erhältst keine
          Benachrichtigungen mehr.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cocoa text-white px-8 py-3 font-semibold hover:shadow-lg active:scale-95 transition-all"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
