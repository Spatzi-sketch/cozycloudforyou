import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-blush bg-cream">
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/logo/cozy-cloud-logo.png"
                alt="Cozy Cloud Logo"
                className="h-8 w-auto"
              />
              <span className="font-display font-bold text-cocoa tracking-tight">
                Cozy Cloud
              </span>
            </div>
            <p className="text-sm text-cocoa/70">
              Super weiche, gemütliche Hosen für deine schönsten
              Wohlfühlmomente. ☁️
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cocoa/60 hover:text-pink transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cocoa/60 hover:text-pink transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 w-full max-w-md">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-cocoa">Kontakt</span>
              <Link href="/kontakt" className="text-sm text-cocoa/70 hover:text-pink transition-colors">
                Kontaktformular
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-cocoa">Rechtliches</span>
              <Link href="/impressum" className="text-sm text-cocoa/70 hover:text-pink transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-cocoa/70 hover:text-pink transition-colors">
                Datenschutz
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-cocoa">Shop</span>
              <Link href="#produkte" className="text-sm text-cocoa/70 hover:text-pink transition-colors">
                Unsere Hosen
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blush text-center text-xs text-cocoa/50">
          Cozy Cloud &bull; Alle Rechte vorbehalten &bull; Gemütlich gemacht mit
          ☁️
        </div>
      </div>
    </footer>
  );
}
