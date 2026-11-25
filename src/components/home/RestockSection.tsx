"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import { WaitlistModal } from "@/components/waitlist/WaitlistModal";

export function RestockSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (email: string) => {
    setSubmitting(true);
    setMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setMessage({ type: "success", text: "Bestätigungs-E-Mail gesendet!" });
    } catch {
      setMessage({ type: "error", text: "Etwas ist schiefgelaufen." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-cocoa relative overflow-hidden">
      <div className="absolute inset-0 bg-pink/10 -z-10" />
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Cloud className="w-5 h-5 text-pink" />
          <span className="font-display text-sm font-semibold text-pink uppercase tracking-wider">
            Restock kommt bald
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-5xl text-cream"
        >
          YOUR FAVORITE PANTS ARE COMING BACK
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-cream/90 max-w-xl mx-auto leading-relaxed"
        >
          Trage dich ein und wir informieren dich, sobald dein Lieblingsmodell
          wieder verfügbar ist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-pink text-cocoa px-10 py-4 font-display font-bold text-lg hover:bg-blush hover:shadow-xl active:scale-95 transition-all"
          >
            GET NOTIFIED ☁️
          </button>
        </motion.div>

        {isOpen && (
          <WaitlistModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            productSlug="cozy-pants-01"
            onSubmit={handleSubmit}
            isSubmitting={submitting}
            message={message}
          />
        )}
      </div>
    </section>
  );
}
