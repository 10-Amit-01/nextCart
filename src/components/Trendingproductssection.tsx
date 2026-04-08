import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Titan Smart Watch",
    description: "Precision Fitness Tracking",
    price: 349.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZFakPBfg6p8es2Jpjwq9XsBwYXXOSgpIJnXG1YcAkUN4QSGALX_TWvtnwL-1Z_Vd8DBpOIMjDf_v9bVgXmuoTc0x4ueQj8vFjZ-cBoftVwDE54LrkZUCJ6b3gulGuQlzMNiOVDtz9owIDDuN6CvLOLV5BN7fNQvuZUrWQDqPpGRZ9JDldnwcqgZ30do0LYogWjYj9KXwY9WSh1-DfBhQcKO98JzEW8h13WjlrejkE_YKpPbl3J4ALLWbxiQe84FFZEaD-Jqc79Wiw",
    badge: "Hot",
  },
  {
    id: 2,
    name: "Lumina Book 14",
    description: "Silicon Ultra Chipset",
    price: 1299.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEDxcih5nbPOmMZj7KfBAlaMVDCpBABM_Tep1OC6kWGv824CRc-2aFTERVTTIwsDvt5bMgfGkaUhx2bgll9ZYWYy_GtYP0VZzEqDNgnnTXigGHh33I77rh_wnlmG2jRhBBmOuyQlYOMuYl3xL8PRux1_N93lhYHm_kyk8mxAV9TmvKq3CSJI1b-yUrudh9ESudh96ant1Ei9GJ5vY2wVk_sAwjqxYy_Kvh1NotYZn0-tzuiHQLimdMEItEwCZy6vBUBsk1vHhIWtTW",
  },
  {
    id: 3,
    name: "Pixel Tab Pro",
    description: "Liquid OLED Display",
    price: 799.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0ipLjZdDUNi8G8yluFrQRGqPhu-pTZty8LqcBAGxHwX4Ze8XHKOLk5VrxL7VUiw9Q_NfUXK6VtkoTToYkkkiFURWvGJ_gV_AkWMU4dhwH_ZESPUU0YxTCjT2lVgx1keJCcnC8xAijuDdSbEaR3y2b9NHUOy_u_HnaYke0vKMfA7qAhEnLTxsmVBLY3u97wU1BifhwWiXLV8323oNyXpplqERDu5htoIE3U2Vjz3pCP_V4Bnl_Go3RYXmaer0UmAfIIc5JfEM30OVr",
  },
  {
    id: 4,
    name: "Aura Buds",
    description: "40hr Battery Life",
    price: 199.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLQ18rNnUKWGP-PcG7LTRHpyRoSKldpe5GLVi25Qm6nE7pyr6zKdqj9TzmsRPjdasVZSrY6L8vv5dxaEBZ35UmLviJsZfpBOx639QNSSOo795NHR0fBMUsDemjvoP7o6WuHN8aHZSbhrkwY-2lh1PEX8SP1oNlkW-KNJv0hLlNXvTMzgHt9vvGUxBhaVQrBBpZWqowm2OkexKZ0gcJa1D-16TkqxruAb_67npGeBrdXiW4Vhps-QlcHbGtTPQgxzxIt_JRUuA3bu6_",
  },
];

export default function TrendingProductsSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-16 bg-white dark:bg-slate-900 rounded-[2rem] mx-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Trending now
        </h2>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div 
            key={product.id}
            className="group bg-white dark:bg-slate-800 rounded-xl p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
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
            </div>

            {/* Product Info */}
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
              {product.name}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              {product.description}
            </p>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-50">
                ${product.price.toFixed(2)}
              </span>
              
              <Button 
                size="icon"
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}