"use client";

import { motion } from "framer-motion";
import { CuteCharacters } from "@/components/illustrations/CuteCharacters";
import { FloatingClouds } from "@/components/illustrations/FloatingClouds";

export function CozySection() {
  return (
    <section id="cozy" className="py-20 px-6 relative overflow-hidden">
      <FloatingClouds className="absolute inset-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-white border border-blush px-4 py-1.5 text-xs font-semibold text-cocoa uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
          Neu im Sortiment
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl md:text-5xl text-cocoa"
        >
          YOUR LITTLE COZY CORNER
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-cocoa/80 max-w-xl mx-auto leading-relaxed"
        >
          Kuschelige Momente beginnen mit der richtigen Hose. Weiche Stoffe,
          runde Formen und ein Gefühl von Zuhause – für dich und deine
          Lieblingscouch.
        </motion.p>
      </div>

      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="relative rounded-[50%] bg-pink/20 p-12 md:p-24 border-4 border-blush shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-blush/40 blur-3xl -z-10 rounded-[50%]" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <span className="text-6xl md:text-9xl">🐹</span>
              <span className="text-4xl md:text-5xl -mt-6">☁️</span>
              <span className="text-2xl font-display font-bold text-cocoa">
                Dein kuscheliges Eckchen
              </span>
            </div>
          </div>
          <CuteCharacters className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
