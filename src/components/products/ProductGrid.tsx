import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";

type ProductGridProps = {
  products: Product[];
  onNotifyClick: (slug: string) => void;
};

export function ProductGrid({ products, onNotifyClick }: ProductGridProps) {
  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            onNotifyClick={() => onNotifyClick(product.slug)}
          />
        </li>
      ))}
    </ul>
  );
}
