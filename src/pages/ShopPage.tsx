import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import ProductCard from "@/components/Productcard";
import { searchProduct } from "@/api/products";
import { Spinner } from "@/components/ui/spinner";

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const { ref: loadMoreRef, inView } = useInView();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["productList", keyword],
      queryFn: ({ pageParam = 1 }) => searchProduct(keyword, 10, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any, allPages: any[]) => {
        const items: any[] = lastPage.data ?? [];
        return items.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const allProducts = data?.pages.flatMap((page: any) => page.data ?? []) ?? [];

  return (
    <div className="p-8 mt-16">
      {/* Header */}
      <div className="mb-6">
        {keyword && (
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Showing results for{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              "{keyword}"
            </span>
            {!isLoading && (
              <span className="ml-2 text-slate-400">({allProducts.length}+ results)</span>
            )}
          </p>
        )}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 animate-pulse"
            >
              <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-700 mb-4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Products grid */}
      {!isLoading && allProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try a different keyword</p>
        </div>
      )}

      {!isLoading && allProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-10 w-full">
        {isFetchingNextPage && <Spinner />}
        {!isFetchingNextPage && !hasNextPage && allProducts.length > 0 && (
          <p className="text-slate-400 text-sm">You've reached the end!</p>
        )}
      </div>
    </div>
  );
}
