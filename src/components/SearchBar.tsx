import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "./ui/input";
import { getProductSuggestions } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const keyword = useDebounce(searchInput, 500);

  const { data: suggestionsRes, isFetching } = useQuery({
    queryKey: ["product-suggestions", keyword],
    queryFn: () => getProductSuggestions(keyword),
    enabled: keyword.length >= 2,
  });

  const suggestions: { title: string }[] = suggestionsRes?.data ?? [];
  const showDropdown = isOpen && keyword.length >= 2 && (isFetching || suggestions.length > 0);

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex flex-col relative items-start bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg gap-0 w-72"
    >
      {/* Search input row */}
      <div className="flex items-center gap-3 w-full">
        <span className="text-slate-400">
          <Search size={16} />
        </span>
        <Input
          className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-auto p-1 dark:bg-slate-800"
          placeholder="Search products..."
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {isFetching && suggestions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
              Searching...
            </div>
          ) : (
            <ul>
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  onMouseDown={() => {
                    setSearchInput(item.title);
                    setIsOpen(false);
                  }}
                >
                  <Search size={13} className="text-slate-400 shrink-0" />
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
