"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { navData } from "../navData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Loader2 } from "lucide-react";

type Exchange = "NSE" | "BSE";

type Stock = {
  symbol: string;
  yahooSymbol?: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
};

type SearchResponse = {
  success: boolean;
  data?: {
    query: string;
    exchange?: Exchange;
    results: Stock[];
    timestamp: string;
  };
  error?: string;
};

const SEARCH_DEBOUNCE_MS = 120;
const SEARCH_CACHE_TTL_MS = 45_000;
const SEARCH_RESULT_LIMIT = 8;

const getStockFetchSymbol = (stock: Pick<Stock, "symbol" | "yahooSymbol">) => {
  return (stock.yahooSymbol ?? stock.symbol).toUpperCase();
};

const getStockBaseSymbol = (stock: Pick<Stock, "symbol" | "yahooSymbol">) => {
  const symbol = getStockFetchSymbol(stock);
  if (symbol.endsWith(".NS") || symbol.endsWith(".BO")) {
    return symbol.replace(/\.(NS|BO)$/i, "");
  }
  return stock.symbol.toUpperCase();
};

const getStockExchange = (stock: Pick<Stock, "symbol" | "yahooSymbol">): Exchange => {
  const symbol = getStockFetchSymbol(stock);
  return symbol.endsWith(".BO") ? "BSE" : "NSE";
};

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState<string | number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stockSearchQuery, setStockSearchQuery] = useState("");
  const [stockSearchResults, setStockSearchResults] = useState<Stock[]>([]);
  const [stockSearchOpen, setStockSearchOpen] = useState(false);
  const [stockSearching, setStockSearching] = useState(false);
  const [stockSearchError, setStockSearchError] = useState<string | null>(null);
  const stockSearchContainerRef = useRef<HTMLDivElement | null>(null);
  const stockSearchCacheRef = useRef<Map<string, { results: Stock[]; timestamp: number }>>(new Map());
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!stockSearchContainerRef.current) {
        return;
      }

      if (!stockSearchContainerRef.current.contains(event.target as Node)) {
        setStockSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (href: string) => {
    router.push(href);
  };

  const toggleDropdown = (id: number | string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const formatPrice = useCallback((price: number, currency = "INR") => {
    try {
      return price.toLocaleString(currency === "INR" ? "en-IN" : "en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }, []);

  const handleStockSelect = useCallback(
    (stock: Stock) => {
      const yahooSymbol = getStockFetchSymbol(stock);
      const exchange = getStockExchange(stock);
      const params = new URLSearchParams({
        stock: yahooSymbol,
        exchange,
      });

      setStockSearchOpen(false);
      setStockSearchQuery("");
      setStockSearchResults([]);
      setStockSearchError(null);
      setShowMobileMenu(false);

      router.push(`/?${params.toString()}#live-market-data`);
    },
    [router]
  );

  useEffect(() => {
    const query = stockSearchQuery.trim();

    if (query.length < 2) {
      setStockSearchResults([]);
      setStockSearching(false);
      setStockSearchError(null);
      return;
    }

    const cacheKey = `NSE:${query.toUpperCase()}`;
    const cachedEntry = stockSearchCacheRef.current.get(cacheKey);
    if (cachedEntry && cachedEntry.results.length > 0 && Date.now() - cachedEntry.timestamp < SEARCH_CACHE_TTL_MS) {
      setStockSearchResults(cachedEntry.results);
      setStockSearchError(null);
      setStockSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setStockSearching(true);
      setStockSearchError(null);

      try {
        const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}&exchange=NSE`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result: SearchResponse = await response.json();

        if (result.success && result.data) {
          const dedupedByBase = Array.from(
            new Map(
              (result.data.results ?? []).map((stock) => [getStockBaseSymbol(stock), stock])
            ).values()
          ).slice(0, SEARCH_RESULT_LIMIT);

          setStockSearchResults(dedupedByBase);
          setStockSearchError(dedupedByBase.length > 0 ? null : "No stocks found for this search.");
          if (dedupedByBase.length > 0) {
            stockSearchCacheRef.current.set(cacheKey, {
              results: dedupedByBase,
              timestamp: Date.now(),
            });
          } else {
            stockSearchCacheRef.current.delete(cacheKey);
          }
          return;
        }

        setStockSearchResults([]);
        setStockSearchError(result.error ?? "Search is temporarily unavailable.");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error searching stocks from navbar:", error);
        setStockSearchResults([]);
        setStockSearchError("Search is temporarily unavailable.");
      } finally {
        setStockSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [stockSearchQuery]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-4 py-4 pointer-events-none">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`pointer-events-auto relative isolate flex items-center justify-between w-full max-w-7xl px-3 sm:px-5 lg:px-6 transition-all duration-300 rounded-2xl border overflow-visible ring-1 ring-black/5 ${isScrolled
          ? "h-16 bg-white/96 backdrop-blur-xl shadow-[0_22px_48px_-26px_rgba(15,23,42,0.55)] border-slate-200/80"
          : "h-20 bg-white/98 backdrop-blur-md shadow-[0_20px_44px_-26px_rgba(15,23,42,0.45)] border-slate-300/80"
          }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/90 via-white/95 to-slate-50/90" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />

        <div className="relative z-10 flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo Section */}
          <Link href="/" className="flex items-center h-full shrink-0">
            <Image
              src="/stklogo.png"
              alt="Stockology Logo"
              width={180}
              height={64}
              priority
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-10" : "h-14"}`}
            />
          </Link>
        </div>

        <div className="relative z-10 hidden md:flex flex-1 min-w-0 items-center justify-between pl-4 lg:pl-6">
          {/* Desktop Navigation */}
          <nav className="flex items-center gap-0.5 xl:gap-1">
          {navData.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.type === "dropdown" && setShowDropdown(item.id)}
              onMouseLeave={() => item.type === "dropdown" && setShowDropdown(null)}
            >
              <button
                onClick={() =>
                  item.type === "dropdown"
                    ? toggleDropdown(item.id)
                    : (setShowMobileMenu(false), handleClick(item.href))
                }
                className="group relative whitespace-nowrap px-3.5 py-2.5 text-sm font-semibold text-slate-800 hover:text-emerald-700 transition-colors flex items-center gap-1 rounded-lg hover:bg-emerald-50/85"
              >
                {item.label}
                {item.type === "dropdown" && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${showDropdown === item.id ? "rotate-180" : ""
                      }`}
                  />
                )}
                {/* Active Underline Effect */}
                <motion.div
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.type === "dropdown" && showDropdown === item.id && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-[calc(100%+0.55rem)] z-[1200] min-w-[13rem] overflow-hidden rounded-xl border border-slate-300 bg-white py-1.5 shadow-[0_24px_46px_-20px_rgba(15,23,42,0.55)] ring-1 ring-slate-200"
                  >
                    {item.subItems?.map((subItem) => (
                      <li key={subItem.id} className="border-b border-slate-100 last:border-b-0">
                        <Link
                          href={subItem.href}
                          onClick={() => {
                            setShowDropdown(null);
                            setShowMobileMenu(false);
                          }}
                          className="flex px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
            <div className="hidden xl:block relative w-[220px] 2xl:w-[260px] shrink-0" ref={stockSearchContainerRef}>
              <label htmlFor="navbar-stock-search" className="sr-only">
                Search Stock or Company
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="navbar-stock-search"
                  type="text"
                  value={stockSearchQuery}
                  onChange={(event) => {
                    setStockSearchQuery(event.target.value);
                    setStockSearchOpen(true);
                  }}
                  onFocus={() => setStockSearchOpen(true)}
                  placeholder="search by name"
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-10 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white/95"
                />
                {stockSearching && (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {stockSearchOpen && (stockSearchQuery.trim().length >= 2 || stockSearchError) && (
                <div className="absolute z-[1200] mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden ring-1 ring-black/5">
                  {stockSearching && (
                    <p className="px-4 py-3 text-sm text-gray-600">Searching market data...</p>
                  )}

                  {!stockSearching && stockSearchResults.length > 0 && (
                    <div className="max-h-72 overflow-y-auto">
                      {stockSearchResults.map((stock) => (
                        <div
                          key={getStockFetchSymbol(stock)}
                          className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleStockSelect(stock);
                            }}
                            className="w-full text-left rounded-md px-2 py-2 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{stock.name}</p>
                                <p className="text-xs text-gray-500">{getStockBaseSymbol(stock)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">
                                  {formatPrice(stock.price, stock.currency)}
                                </p>
                                <p
                                  className={`text-xs font-semibold ${
                                    stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {stock.changePercent >= 0 ? "+" : ""}
                                  {stock.changePercent.toFixed(2)}%
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {!stockSearching && stockSearchResults.length === 0 && stockSearchQuery.trim().length >= 2 && (
                    <p className="px-4 py-3 text-sm text-gray-600">
                      {stockSearchError ?? "No stocks found for this search."}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:block shrink-0">
              <a href="https://backoffice.stockologysecurities.com/EKYC/EKYCAccountOpening/Get?RefID=704AF1A76EA24DCEBA655434A385F26E">
                <motion.button
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-7 py-2.5 rounded-xl font-bold transition-all shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 border border-green-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">Open Demat Account</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile right spacer to keep logo visually centered */}
        <div className="md:hidden w-10" aria-hidden="true" />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1000] pointer-events-auto"
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl z-[1001] flex flex-col p-6 border-r border-gray-100 pointer-events-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <Image src="/stklogo.png" alt="Logo" width={100} height={50} className="object-contain" />
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {navData.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <button
                      onClick={() =>
                        item.type === "dropdown"
                          ? toggleDropdown(item.id)
                          : (setShowMobileMenu(false), handleClick(item.href))
                      }
                      className="flex items-center justify-between py-3 text-lg font-semibold text-gray-800"
                    >
                      {item.label}
                      {item.type === "dropdown" && (
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${showDropdown === item.id ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {item.type === "dropdown" && showDropdown === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden pl-4 border-l-2 border-green-100 ml-2"
                      >
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={() => setShowMobileMenu(false)}
                            className="block py-2 text-gray-600 hover:text-green-600"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg">
                  Open Demat Account
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
