import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTrendingProducts } from "@/api/products";
import ProductCard from "./Productcard";

export default function TrendingProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ["trending-products"],
    queryFn: getTrendingProducts,
  });

  const products = response?.data || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-16 bg-white dark:bg-slate-900 rounded-[2rem] mx-4 sm:mx-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Trending now
        </h2>
        
        {products.length > 0 && (
          <div className="hidden sm:flex gap-2">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Loading State or Products Slider */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length > 0 ? (
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 pt-2 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product: any) => (
            <div key={product._id} className="min-w-[260px] sm:min-w-[300px] w-full max-w-[320px] snap-start shrink-0 flex">
              <ProductCard product={product} className="w-full flex-1" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500">
          No trending products found.
        </div>
      )}
    </section>
  );
}