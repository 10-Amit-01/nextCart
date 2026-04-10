import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:-translate-y-1 font-semibold text-base">
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-500">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="flex-1 w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              {items.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  
                  {/* Product Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/50 flex items-center justify-center p-2">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" 
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item._id}`} className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 truncate block transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0 shrink-0">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden h-10 bg-white dark:bg-slate-900 shadow-sm">
                      <button 
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-10 h-full flex items-center justify-center font-semibold text-sm text-slate-900 dark:text-white">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 h-8 transition-colors -mr-2 sm:mr-0"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/20 px-2 rounded">Free</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax (estimated)</span>
                <span className="font-semibold text-slate-900 dark:text-white">${(totalPrice * 0.05).toFixed(2)}</span>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-6"></div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                ${(totalPrice + totalPrice * 0.05).toFixed(2)}
              </span>
            </div>

            <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/40 hover:-translate-y-0.5">
              <Link to="#" className="flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 max-w-[250px] mx-auto">
              Taxes calculated at checkout. Free shipping on all standard orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}