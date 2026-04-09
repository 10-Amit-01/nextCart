import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, className = "" }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [qty, setQty] = useState(1);

  function increaseQty() {
    if (qty === product.stock) return;
    setQty(qty + 1);
  }

  function decreaseQty() {
    if (qty === 1) return;
    setQty(qty - 1);
  }

  const discountPct = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <div
      className={`
        group bg-white dark:bg-slate-800 rounded-xl p-4
        transition-all hover:shadow-xl hover:shadow-slate-200/50
        dark:hover:shadow-slate-950/50
        border border-transparent
        hover:border-slate-200 dark:hover:border-slate-700
        flex flex-col
        ${className}
      `}
    >
      {/* Product Image */}
      <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4 relative">
        <img
          alt={product.images?.[0]?.alt ?? product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.images?.[0]?.url}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x400?text=No+Image";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discountPct && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shadow-sm">
              -{discountPct}%
            </span>
          )}
          {!discountPct && product.tags?.[0] && (
            <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase shadow-sm text-slate-900 dark:text-slate-50">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`
            absolute top-3 right-3
            w-8 h-8 rounded-full
            bg-white/90 dark:bg-slate-900/90
            backdrop-blur-sm
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:scale-110
            ${isWishlisted ? "text-red-500" : "text-slate-400"}
          `}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
        </Button>

        {/* Quick View on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-slate-50 hover:bg-white dark:hover:bg-slate-800"
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 space-y-1.5">
        {/* Brand & Category */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">
          {product.brand} &middot; {product.category}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {product.rating.toFixed(1)}{" "}
              <span className="text-slate-400">({product.numReviews?.toLocaleString()})</span>
            </span>
          </div>
        )}

        {/* Color swatches */}
        {product.attributes?.color?.length > 0 && (
          <div className="flex items-center gap-1.5 pt-0.5">
            {product.attributes.color.slice(0, 6).map((color: string) => (
              <span
                key={color}
                title={color}
                className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm inline-block"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
            {product.attributes.color.length > 6 && (
              <span className="text-[10px] text-slate-400">
                +{product.attributes.color.length - 6}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Price & Cart */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div>
          {product.discountPrice ? (
            <>
              <span className="text-xs text-slate-400 line-through mr-1.5">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-base font-bold text-red-500">
                ${product.discountPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-slate-900 dark:text-slate-50">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-2 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-sm font-medium text-slate-900 dark:text-slate-50 min-w-[20px] text-center">
              {qty}
            </span>
            <button
              onClick={increaseQty}
              className="px-2 py-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <Button
            size="icon"
            className="w-8 h-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-110 shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stock Status */}
      {product.stock !== undefined && (
        <div className="mt-2">
          {product.stock > 10 ? (
            <span className="text-[11px] text-green-600 dark:text-green-400 font-medium">
              ● In Stock
            </span>
          ) : product.stock > 0 ? (
            <span className="text-[11px] text-orange-500 dark:text-orange-400 font-medium">
              ● Only {product.stock} left
            </span>
          ) : (
            <span className="text-[11px] text-red-500 dark:text-red-400 font-medium">
              ● Out of Stock
            </span>
          )}
        </div>
      )}
    </div>
  );
}
