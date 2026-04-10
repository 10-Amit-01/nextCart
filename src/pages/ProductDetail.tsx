import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Plus, Minus, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getProductById(id);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[60vh] flex-col gap-4 items-center justify-center">
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Oops! Product Not Found
        </p>
        <p className="text-slate-500 dark:text-slate-400">
          The product you are looking for might have been removed or does not
          exist.
        </p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const product = data;

  const discountPct = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : null;

  return (
    <div className="max-w-7xl mt-2 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-white dark:bg-slate-900 overflow-hidden relative group border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={
                product.images?.[selectedImage]?.url ||
                "https://placehold.co/800x800?text=No+Image"
              }
              alt={product.images?.[selectedImage]?.alt || product.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            {discountPct && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold tracking-wider uppercase shadow-lg">
                -{discountPct}%
              </span>
            )}
            {/* Wishlist Button Overlay */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`
                absolute top-4 right-4
                w-10 h-10 rounded-full
                bg-white/90 dark:bg-slate-900/90
                backdrop-blur-md shadow-sm
                transition-all duration-300 hover:scale-110
                ${isWishlisted ? "text-red-500" : "text-slate-400 dark:text-slate-500"}
              `}
            >
              <Heart
                className="w-5 h-5"
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </Button>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: any, idx: number) => (
                <button
                  key={img._id || idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-blue-600 dark:border-blue-500 opacity-100 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <nav className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <span className="text-slate-300 dark:text-slate-600">/</span>
              </li>
              <li>
                <span className="capitalize">{product.category}</span>
              </li>
              <li>
                <span className="text-slate-300 dark:text-slate-600">/</span>
              </li>
              <li className="text-slate-900 dark:text-slate-200 truncate font-medium">
                {product.title}
              </li>
            </ol>
          </nav>

          <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
            {product.brand}
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
            {product.title}
          </h1>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5"
                  fill={
                    i < Math.floor(product.rating || 0)
                      ? "currentColor"
                      : "none"
                  }
                  color={
                    i < Math.floor(product.rating || 0)
                      ? "currentColor"
                      : "#cbd5e1"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {product.rating?.toFixed(1)} Rating
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              ({product.numReviews} reviews)
            </span>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-6"></div>

          {/* Pricing */}
          <div className="flex items-end gap-3 mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-4xl font-extrabold text-red-500">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-xl font-medium text-slate-400 line-through mb-1">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Colors */}
          {product.attributes?.color && product.attributes.color.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Color
              </h3>
              <div className="flex gap-3">
                {product.attributes.color.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 focus:outline-none transition-all ${
                      selectedColor === color
                        ? "border-blue-600 dark:border-blue-400 scale-110 shadow-md ring-2 ring-blue-600/30 ring-offset-2 dark:ring-offset-slate-950"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center align-middle border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden h-14 bg-white dark:bg-slate-900 shadow-sm">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                disabled={qty <= 1}
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="w-14 h-full flex items-center justify-center font-semibold text-lg text-slate-900 dark:text-white">
                {qty}
              </div>
              <button
                onClick={() => setQty(Math.min(product.stock || 1, qty + 1))}
                className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                disabled={qty >= (product.stock || 1)}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <Button
              className="flex-1 h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              disabled={product.stock === 0}
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(
                    addToCart({
                      _id: product._id,
                      title: product.title,
                      price: product.discountPrice ?? product.price,
                      image:
                        product.images?.[0]?.url ||
                        "https://placehold.co/400x400?text=No+Image",
                      quantity: qty,
                    }),
                  );
                } else {
                  navigate("/login");
                }
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          {/* Delivery & Stock Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Availability
              </span>
              {product.stock && product.stock > 10 ? (
                <span className="font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800/30">
                  In Stock ({product.stock} items)
                </span>
              ) : product.stock && product.stock > 0 ? (
                <span className="font-semibold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-lg border border-orange-200 dark:border-orange-800/30">
                  Low Stock ({product.stock} items)
                </span>
              ) : (
                <span className="font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800/30">
                  Out of Stock
                </span>
              )}
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  Tags
                </span>
                <div className="flex gap-2">
                  {product.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md shadow-sm text-xs uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
