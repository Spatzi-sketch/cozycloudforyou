"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import { CuteCharacters } from "@/components/illustrations/CuteCharacters";
import { FloatingHearts } from "@/components/illustrations/FloatingHearts";

export function Hero() {
  return (
    <section className="relative pt-20 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-pink" />
            <span className="font-display text-sm font-semibold text-pink uppercase tracking-wider">
              Neu im Shop ☁️
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-cocoa leading-tight"
          >
            YOUR NEW FAVORITE COZY MOMENT{" "}
            <span className="text-pink">☁️</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-cocoa/80 max-w-lg leading-relaxed"
          >
            Gemütliche Hosen für deine schönsten Wohlfühlmomente. Super weich,
            super kuschelig – gerade rechtzeitig zum nächsten Restock.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#produkte"
              className="rounded-full bg-cocoa text-white px-8 py-4 font-semibold text-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all"
            >
              UNSERE HOSEN ENTDECKEN
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border-2 border-cocoa text-cocoa px-8 py-4 font-semibold text-lg hover:bg-cocoa hover:text-white active:scale-95 transition-all"
            >
              Mehr erfahren
            </Link>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <FloatingHearts className="absolute inset-0" />
          <div
            className="relative w-full max-w-md"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="relative rounded-[60%] bg-pink/20 p-8 md:p-16 border-4 border-blush shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-blush/40 blur-3xl -z-10 rounded-[60%]" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="text-6xl md:text-8xl">🐻</span>
                <span className="text-5xl md:text-6xl -mt-4">🍫</span>
                <span className="text-2xl font-display font-bold text-cocoa">
                  Kuschelzeit
                </span>
              </div>
            </div>
          </div>
          <CuteCharacters className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
