export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  priceInCents: number;
  status: "unavailable" | "available";
  restockRound: number;
};

export type ProductPrice = {
  cents: number;
  euros: string;
  display: string;
};

export function formatPrice(priceInCents: number): ProductPrice {
  const euros = (priceInCents / 100).toFixed(2);
  return {
    cents: priceInCents,
    euros,
    display: `${euros.replace(".", ",")} €`,
  };
}
