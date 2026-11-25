"use client";

import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { ProductImage } from "@/components/products/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/types/product";

type ProductCardProps = {
  product: Product;
  onNotifyClick?: () => void;
};

export function ProductCard({ product, onNotifyClick }: ProductCardProps) {
  const { display } = formatPrice(product.priceInCents);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col rounded-3xl bg-cream border-2 border-blush p-6 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <ProductImage product={product} className="h-48" />
        <Badge variant="unavailable">Derzeit nicht verfügbar</Badge>
      </div>

      <h3 className="font-display text-xl text-cocoa leading-tight">
        {product.name}
      </h3>
      <p className="mt-1 text-lg font-body font-bold text-cocoa">{display}</p>
      <p className="mt-2 text-sm text-cocoa/70">Restock kommt bald!</p>

      <button
        onClick={onNotifyClick}
        disabled={product.status === "available"}
        className="mt-auto w-full flex items-center justify-center gap-2 rounded-full bg-cocoa text-white py-3 font-semibold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        <Bell className="w-4 h-4" />
        Benachrichtige mich beim Restock
      </button>
    </motion.div>
  );
}
