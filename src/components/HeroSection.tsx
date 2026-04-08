import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-12">
      <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 h-[716px] flex items-center">
        {/* Content */}
        <div className="relative z-10 w-full md:w-1/2 p-12 lg:p-20">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] text-xs mb-4 block">
            NEW RELEASE
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-50 leading-none mb-6">
            Aura Pro <br />Wireless
          </h1>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mb-10 leading-relaxed">
            Precision-engineered acoustic architecture meets clinical minimalist design. 
            Experience sound as it was meant to be felt.
          </p>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Button 
              size="lg"
              className="px-8 py-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Pre-order Now
            </Button>
            
            <Button 
              variant="secondary"
              size="lg"
              className="px-8 py-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-50 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
            >
              View Specs
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="absolute right-0 top-0 w-full h-full md:w-2/3 pointer-events-none">
          <img
            alt="Aura Pro Headphones"
            className="w-full h-full object-cover object-center transform scale-110 -rotate-3 translate-x-12 opacity-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPpTbAAIdDcpY7bstHa1CpOTnZQ9W6HwtPNZCYwCr3dQWrY71aE1UKPF_qiPKfn0iH2qTWmWKbxrvneWZJBYq0OJCIdPCLkXbUe_VKAXsZH5S8TRPAYWwF4kmBqjPqBSfNEd_oRz-DSqpA-6rfdCRqcCA78j1gIlquPRiB8cn5nTL4OYC16IvvbZYXgi8yDQzP2lRc0i3aX8nx4cUAiGoMGi85FEexaPL9qiSIK9NBdZK3NDEFD_h_2ocIJ7mZrG1tKxYus9wD7bnC"
          />
        </div>
      </div>
    </section>
  );
}