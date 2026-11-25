import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";

export default async function AdminProductPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream p-6">
      <main className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl text-cocoa mb-6">
          Produkt: {product.name}
        </h1>
        <div className="bg-cream border-2 border-blush rounded-3xl p-6 shadow-sm">
          <p className="text-cocoa/80">
            Produkt-ID: <span className="font-mono">{product.id}</span>
          </p>
          <p className="text-cocoa/80">
            Preis: <span className="font-bold">{product.priceInCents / 100} €</span>
          </p>
          <p className="text-cocoa/80">
            Status: <span className="font-semibold">{product.status}</span>
          </p>
          <p className="text-cocoa/80">
            Restock-Runde: {product.restockRound}
          </p>
        </div>
      </main>
    </div>
  );
}
