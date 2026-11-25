"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "#produkte", label: "Unsere Hosen" },
  { href: "#cozy", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-blush">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo/cozy-cloud-logo.png"
            alt="Cozy Cloud Logo"
            className="h-8 w-auto"
          />
          <span className="font-display font-bold text-cocoa tracking-tight">
            Cozy Cloud
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cocoa">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-pink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="#produkte" className="ml-4 rounded-full bg-cocoa text-white px-4 py-2 font-semibold hover:shadow-lg transition-all">
            Unsere Hosen entdecken
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="md:hidden rounded-full bg-cocoa text-white p-2 hover:shadow-lg transition-all"
            onClick={() => setIsOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/admin/login" className="hidden md:block rounded-full border-2 border-cocoa text-cocoa px-4 py-2 text-sm font-semibold hover:bg-cocoa hover:text-white transition-all">
            Admin
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-cream/95 backdrop-blur">
          <div className="absolute top-0 right-0 p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-cocoa text-white p-2"
              aria-label="Menü schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-center pt-20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-2xl text-cocoa hover:text-pink transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-cocoa text-white px-6 py-3 font-semibold text-lg hover:shadow-lg transition-all"
            >
              Unsere Hosen entdecken
            </button>
            <Link
              href="/admin/login"
              className="mt-4 rounded-full border-2 border-cocoa text-cocoa px-6 py-2 font-semibold hover:bg-cocoa hover:text-white transition-all"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
