export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-6">
      <div className="max-w-md w-full bg-cream border-2 border-blush rounded-3xl p-8 shadow-lg">
        <h1 className="font-display text-3xl text-cocoa mb-8 text-center">
          Admin-Login
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              required
              className="w-full rounded-xl border-2 border-blush px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-1">
              Passwort
            </label>
            <input
              type="password"
              required
              className="w-full rounded-xl border-2 border-blush px-4 py-3 text-cocoa focus:outline-none focus:ring-2 focus:ring-cocoa"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-cocoa text-white py-3 font-semibold hover:shadow-lg active:scale-95 transition-all"
          >
            Einloggen
          </button>
        </form>
        <p className="mt-6 text-xs text-cocoa/50 text-center">
          Der geschützte Admin-Bereich folgt in der nächsten Phase.
        </p>
      </div>
    </div>
  );
}
