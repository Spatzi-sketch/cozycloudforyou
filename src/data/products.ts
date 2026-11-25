import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "product-01",
    slug: "cozy-pants-01",
    name: "Cozy Pants",
    image: "/images/products/product-01.png",
    priceInCents: 2499,
    status: "unavailable",
    restockRound: 1,
  },
  {
    id: "product-02",
    slug: "cozy-pants-02",
    name: "Fluffy Pants",
    image: "/images/products/product-02.png",
    priceInCents: 2499,
    status: "unavailable",
    restockRound: 1,
  },
  {
    id: "product-03",
    slug: "cozy-pants-03",
    name: "Cloud Pants",
    image: "/images/products/product-03.png",
    priceInCents: 2499,
    status: "unavailable",
    restockRound: 1,
  },
  {
    id: "product-04",
    slug: "cozy-pants-04",
    name: "Teddy Pants",
    image: "/images/products/product-04.png",
    priceInCents: 2499,
    status: "unavailable",
    restockRound: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
