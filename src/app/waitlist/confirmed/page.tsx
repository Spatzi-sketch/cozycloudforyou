import Link from "next/link";

export default function ConfirmedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6 text-center">
      <div className="rounded-full bg-blush-light border-2 border-blush p-10 md:p-16 shadow-xl max-w-md">
        <div className="text-6xl mb-6">&#9730;</div>
        <h1 className="font-display text-3xl md:text-5xl text-cocoa mb-4">
          YOU&rsquo;RE ON THE LIST! &#9730;
        </h1>
        <p className="text-lg text-cocoa/80 leading-relaxed">
          Du bist auf der Warteliste. Wir benachrichtigen dich, sobald deine
          Lieblingshose wieder verfügbar ist.
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
