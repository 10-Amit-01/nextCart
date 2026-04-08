import { Search } from 'lucide-react';

import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg gap-3 w-100">
      <span className="material-symbols-outlined text-slate-400 text-lg ">
        <Search/>
      </span>
      <Input
        className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-48 h-auto p-1 dark:bg-slate-800"
        placeholder="Search devices..."
        type="text"
      />
    </div>
  );
}
