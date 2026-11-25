import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";
import { CozySection } from "@/components/home/CozySection";
import { RestockSection } from "@/components/home/RestockSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductSection />
        <CozySection />
        <RestockSection />
      </main>
      <Footer />
    </div>
  );
}
