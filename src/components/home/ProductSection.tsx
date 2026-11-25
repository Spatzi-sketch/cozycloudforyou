"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { WaitlistModal } from "@/components/waitlist/WaitlistModal";

export function ProductSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleNotify = (slug: string) => {
    setOpenSlug(slug);
    setMessage(null);
  };

  return (
    <section id="produkte" className="py-20 px-6 bg-blush-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl text-cocoa"
          >
            Unsere Hosen
          </motion.h2>
          <p className="mt-4 text-lg text-cocoa/70">
            Alle Hosen kosten 24,99 € und sind derzeit leider nicht
            verfügbar. Der Restock kommt bald! Trage dich ein, um
            benachrichtigt zu werden.
          </p>
        </div>

        <ProductGrid products={products} onNotifyClick={handleNotify} />

        {openSlug && (
          <WaitlistModal
            isOpen={openSlug !== null}
            onClose={() => setOpenSlug(null)}
            productSlug={openSlug}
            message={message}
          />
        )}
      </div>
    </section>
  );
}
