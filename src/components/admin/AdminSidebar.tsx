"use client";

import Link from "next/link";

export function AdminSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 flex-col gap-2">
      <nav className="flex flex-col gap-1">
        <Link
          href="/admin"
          className="rounded-2xl bg-cocoa text-white px-5 py-3 font-semibold text-left block hover:shadow-lg transition-all"
        >
          Dashboard
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-blush">
        <form
          action="/api/auth/signout"
          method="POST"
          className="flex"
        >
          <button
            type="submit"
            className="w-full rounded-2xl border-2 border-cocoa text-cocoa px-5 py-3 font-semibold text-left block hover:bg-cocoa hover:text-white transition-all"
          >
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}
