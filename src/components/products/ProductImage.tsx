import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  product: Product;
  className?: string;
};

export function ProductImage({ product, className }: ProductImageProps) {
  return (
    <img
      src={product.image}
      alt={product.name}
      className={cn(
        "w-full h-48 object-cover rounded-2xl border-2 border-blush bg-cream shadow-sm",
        className
      )}
      loading="lazy"
      decoding="async"
    />
  );
}
