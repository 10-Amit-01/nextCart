import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/Categoriessection";
import TrendingProductsSection from "../components/Trendingproductssection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 pt-24">
        <HeroSection />
        <CategoriesSection />
        <TrendingProductsSection />
      </main>
    </div>
  );
}
