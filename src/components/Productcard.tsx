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

  return (
    <div
      className={`
        group bg-white dark:bg-slate-800 rounded-xl p-4 
        transition-all hover:shadow-xl hover:shadow-slate-200/50 
        dark:hover:shadow-slate-950/50 
        border border-transparent 
        hover:border-slate-200 dark:hover:border-slate-700
        ${className}
      `}
    >
      {/* Product Image */}
      <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden mb-6 relative">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.image}
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white dark:bg-slate-900 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase shadow-sm text-slate-900 dark:text-slate-50">
            {product.badge}
          </span>
        )}

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
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
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
      <div className="space-y-1">
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {product.description}
        </p>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center gap-1">
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
              ({product.reviews || 0})
            </span>
          </div>
        )}
      </div>

      {/* Price and Add to Cart */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through mr-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-slate-900 dark:text-slate-50">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div>
            <Button
              onClick={increaseQty}
              size="icon-xs"
              className="p-2 rounded-lg bg-white text-slate-900 hover:bg-blue-700 transition-all hover:scale-110"
            >
              <Plus />
            </Button>
            <span className="text-slate-900 dark:text-slate-50 mx-2 ">
              {qty}
            </span>
            <Button
              onClick={decreaseQty}
              size="icon-xs"
              className="p-2 rounded-lg bg-white text-slate-900 hover:bg-blue-700 transition-all hover:scale-110"
            >
              <Minus />
            </Button>
          </div>
          <Button
            size="icon"
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stock Status */}
      {product.stock !== undefined && (
        <div className="mt-3">
          {product.stock > 10 ? (
            <span className="text-xs text-green-600 dark:text-green-400">
              In Stock
            </span>
          ) : product.stock > 0 ? (
            <span className="text-xs text-orange-600 dark:text-orange-400">
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-xs text-red-600 dark:text-red-400">
              Out of Stock
            </span>
          )}
        </div>
      )}
    </div>
  );
}
