import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Shoes",
    subtitle: "Professional Sound Systems",
    image: "https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg",
    alt: "Minimalist desktop setup with high-end bookshelf speakers",
  },
  {
    id: 2,
    title: "Phones",
    subtitle: "High Performance Workstations",
    image: "https://cdn.pixabay.com/photo/2016/11/29/12/30/phone-1869510_1280.jpg",
    alt: "Modern ultra-slim silver laptop on a clean wooden desk",
  },
  {
    id: 3,
    title: "Home Accessories",
    subtitle: "Seamless Living Solutions",
    image: "https://plus.unsplash.com/premium_photo-1670360414946-e33a828d1d52?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww",
    alt: "Smart home control panel in a modern living room",
  },
];

export default function CategoriesSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Browse by category
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Curated ecosystems for your workflow.
          </p>
        </div>
        
        <a 
          className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 hover:underline transition-all group" 
          href="#"
        >
          View all categories 
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <NavLink
            to={`/shop/search?keyword=${category.title}`} 
            key={category.id}
            className="group relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 h-96 cursor-pointer"
          >
            {/* Image */}
            <img
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              src={category.image}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 p-8">
              <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {category.title}
              </h3>
              <p className="text-white/80 text-sm transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {category.subtitle}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}