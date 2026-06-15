"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import algoliasearch from "algoliasearch/lite";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; 
import { useAuth } from "@/components/AuthProvider";

// Initialize Algolia
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
);
const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "products");

interface SearchBarProps {
  onSearch?: () => void;
}

// 🔥 STRATEGIC TRENDING SEARCHES
const TRENDING_SEARCHES = [
  "watches", 
  "cables", 
  "flash", 
  "power bank"
];

function SearchBarContent({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  // Close dropdown and turn off loader on navigation
  useEffect(() => {
    setIsNavigating(false);
    setIsOpen(false);
  }, [pathname, searchParams]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch text suggestions from Algolia as they type
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        setIsTyping(false);
        return;
      }

      try {
        const { hits } = await index.search(query, { 
          hitsPerPage: 8,
          typoTolerance: "min",
          ignorePlurals: true
        });

        // Extract unique product names/categories to simulate keyword suggestions
        const uniqueKeywords = Array.from(
          new Set(hits.map((hit: any) => {
             const text = hit.name || hit.title || hit.category;
             return text ? String(text).toLowerCase() : "";
          }).filter(text => text !== ""))
        ).slice(0, 6); // Keep the top 6 unique keywords

        setSuggestions(uniqueKeywords as string[]);
      } catch (error) {
        console.error("Algolia search error:", error);
      } finally {
        setIsTyping(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  // CORE LOGIC: Triggers the actual search
  const executeSearch = async (searchStr: string) => {
    const finalQuery = searchStr.trim();

    if (finalQuery !== "") {
      setIsOpen(false);
      setQuery(finalQuery); 
      setIsNavigating(true); 

      if (onSearch) onSearch();

      try {
        const currentUser = user as any; 
        await addDoc(collection(db, "search_queries"), {
          query: finalQuery.toLowerCase(),
          userId: currentUser?.id || currentUser?.uid || "anonymous",
          userEmail: currentUser?.email || null,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Failed to save search query:", error);
      }

      // Navigate to your search page with the query
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  return (
    <div className="relative w-full mx-auto" ref={searchRef}>
      <form onSubmit={handleFormSubmit} className="relative flex items-center">
        
        {/* CLEAR BUTTON (X) */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setIsOpen(false); 
            }}
            className="absolute right-[100px] md:right-[110px] z-10 p-2 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products, brands and category"
          className="w-full pl-4 pr-[130px] py-2 md:py-2.5 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent transition-all shadow-sm"
        />

        {/* SEARCH BUTTON */}
        <button 
          type="submit"
          aria-label="Submit Search"
          className="absolute right-1 top-1 bottom-1 px-4 sm:px-5 bg-[#FF6A00] hover:bg-[#e65c00] text-white rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          {isTyping ? (
             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="text-xs sm:text-sm font-bold tracking-wide">Search</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* DROPDOWN UI */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[100]">

          {/* STATE 1: EMPTY SEARCH BAR (TRENDING PILLS) */}
          {query.trim() === "" && (
            <div className="p-4">
              <p className="text-[11px] text-slate-500 font-bold mb-3 uppercase tracking-wider">Trending Searches</p>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => executeSearch(term)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE 2: TYPING (TEXT SUGGESTIONS WITH RIGHT ARROW) */}
          {query.trim() !== "" && suggestions.length > 0 && (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => executeSearch(suggestion)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors focus:bg-slate-50 focus:outline-none border-b border-slate-50 last:border-0"
                >
                  <span className="text-sm font-bold text-slate-700 truncate">{suggestion}</span>

                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🔥 NEW ORBITAL LOADER (Matches GlobalLoader) */}
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent pointer-events-none transition-opacity duration-300">
          <style>{`
            @keyframes orbitalSpin {
              0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
              50% { transform: scale(1.15) rotate(180deg); opacity: 1; }
              100% { transform: scale(0.8) rotate(360deg); opacity: 0.7; }
            }
            .animate-orbital-spin {
              animation: orbitalSpin 1.8s infinite ease-in-out;
            }
          `}</style>

          <svg 
            className="animate-orbital-spin w-16 h-16 text-[#FF6A00] drop-shadow-md" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="rotate(90 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="rotate(150 50 50)" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense 
      fallback={
        <div className="relative w-full mx-auto">
          <div className="w-full border border-slate-300 rounded-full bg-slate-100 dark:bg-slate-800 h-[38px] md:h-[42px] animate-pulse"></div>
        </div>
      }
    >
      <SearchBarContent {...props} />
    </Suspense>
  );
}
