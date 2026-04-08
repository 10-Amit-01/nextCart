import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Audio",
    subtitle: "Professional Sound Systems",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTv0JsM7X1btz2LLKRiDcUOPKttIfvZ3mNUq9HANUt3hqIKp4kel0bx0W9WT9idHl3TfPch3dIAjE-e-kUPcilR0aVjCD-L5w-j2Rw-VZFaknVe7LTujOVhi1GiLK3-pw87VWEfZ_VcyPVA4VptZPb4O-iKQcrzKglwUC8BHGfE2NLmHcV7jLkO-EjK265XX4EdQaxtB6-G2vRRPoO1OL9vhuwKN7xUnVRMPEXZ2XSpAjfbbmvb6wX4puh7mCmhXkUCH4DCA9gl5Ow",
    alt: "Minimalist desktop setup with high-end bookshelf speakers",
  },
  {
    id: 2,
    title: "Computing",
    subtitle: "High Performance Workstations",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg5dUFCC6vrA_zm233K4e9p4tB2qvmTAZQbYeUbTHjMD-nRZxBUmcjMUXZ3ixyyIouw0apbWZwCziW_ndfVdEU-giRnOZTH2Ho--hX10dMfUQ2g0E0UAfrjT-ytH_0zTlyMmHgYY7wOKKXzSk3I4e4YONHWPYMabxDpVtX4tqeb2PC-Uf48hdt1SpEt8kNqM2e0Tb2NtXpifnswyvDqeNG1JyMwRMokM-s-GE5CqqOaSlIYLo1NfST0uiiID3JldQV0Go_rvuxDuNn",
    alt: "Modern ultra-slim silver laptop on a clean wooden desk",
  },
  {
    id: 3,
    title: "Smart Home",
    subtitle: "Seamless Living Solutions",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkR0iNbWqgTY496yFUb9dxo8TbBVWVSHgxKfYZR3Ya7SZk8iSUpn1w5MTBYZtw7O_8zof_dEDV7l833SKt6UwaCOn2_BWOEzhbFAgGtxfbc-KjOzF1LZY6ZSQfcPrbLoCwEtLtcB3hr7mi04RWW0giw5YT7rByod-uobGSA3vSHekX-N_Dv4Vw5pyMDPt9FI0BTSa2t9DH606K35ilmbJAMxIcYC-zz3dXlqSK4ooyk-_KNlKuEzGo3EQoVLt2Q8wP0vpwxS-PW_5I",
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
          <div 
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
          </div>
        ))}
      </div>
    </section>
  );
}