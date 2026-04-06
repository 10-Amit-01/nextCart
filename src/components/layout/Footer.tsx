export default function Footer() {
  return (
    <footer className="w-full py-12 mt-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-screen-2xl mx-auto font-inter text-xs tracking-widest uppercase">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <span className="text-xl font-black text-slate-900 dark:text-slate-50 mb-6 block">
            NexCart
          </span>
          <p className="text-slate-500 dark:text-slate-400 normal-case tracking-normal mb-6 max-w-xs">
            Pioneering the future of high-performance personal electronics with precision engineering.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-50 font-bold mb-6">
            Product
          </h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400">
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Shop All
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                New Arrivals
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Deals
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-50 font-bold mb-6">
            Support
          </h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400">
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Support
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Shipping
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Returns
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-slate-900 dark:text-slate-50 font-bold mb-6">
            Company
          </h4>
          <ul className="flex flex-col gap-4 text-slate-500 dark:text-slate-400">
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                Terms
              </a>
            </li>
            <li>
              <a className="hover:text-blue-600 underline transition-all" href="#">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-screen-2xl mx-auto px-8 mt-16 pt-8 border-t border-slate-200/20 text-center">
        <p className="text-slate-400 text-[10px] tracking-[0.3em]">
          © 2025 NexCart. ENGINEERED FOR PRECISION.
        </p>
      </div>
    </footer>
  );
}