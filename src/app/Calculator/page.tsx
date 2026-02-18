"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CalculationResult {
  turnover: number;
  brokerage: number;
  sttCtt: number;
  transactionCharges: number;
  clearingCharges: number;
  gst: number;
  stampDuty: number;
  sebiFees: number;
  totalCharges: number;
  netBuyValue: number;
  netSellValue: number;
  netPL: number;
}

interface StockResult {
  symbol: string;
  yahooSymbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

interface SearchResponse {
  success: boolean;
  data?: {
    query: string;
    exchange: "NSE" | "BSE";
    results: StockResult[];
    timestamp: string;
  };
  error?: string;
}

interface QuoteResponse {
  success: boolean;
  data?: {
    symbol: string;
    yahooSymbol: string;
    exchange: "NSE" | "BSE";
    name: string;
    price: number;
    change: number;
    changePercent: number;
    currency: string;
    timestamp: string;
  };
  error?: string;
}

const SEARCH_DEBOUNCE_MS = 180;
const STOCK_SEARCH_MIN_LENGTH = 2;
const DEFAULT_STOCK_SYMBOL = "RELIANCE";
const DEFAULT_EXCHANGE = "NSE";
const MOBILE_NUMBER_LENGTH = 10;

const CalculatorSection = () => {
  const [tradeType, setTradeType] = useState<"intraday" | "delivery">(
    "intraday",
  );
  const [quantity, setQuantity] = useState<string>("1");
  const [buyPrice, setBuyPrice] = useState<string>("3025.70");
  const [sellPrice, setSellPrice] = useState<string>("3026.80");
  const [brokerageRate, setBrokerageRate] = useState<string>("0.03");

  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StockResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedStockData, setSelectedStockData] = useState<StockResult | null>(
    null,
  );
  const [currentStockPrice, setCurrentStockPrice] = useState<number | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [leadMobileNo, setLeadMobileNo] = useState("");
  const [leadTncAccepted, setLeadTncAccepted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadStatus, setLeadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const getStockExchange = (
    stock: Pick<StockResult, "yahooSymbol">,
  ): "NSE" | "BSE" =>
    stock.yahooSymbol.toUpperCase().endsWith(".BO") ? "BSE" : "NSE";

  const applyPriceToInputs = (price: number) => {
    if (!Number.isFinite(price) || price <= 0) {
      return;
    }
    setCurrentStockPrice(price);
    setBuyPrice(price.toFixed(2));
    setSellPrice((price + 1).toFixed(2));
  };

  const fetchLatestQuote = async (stock: StockResult) => {
    setIsFetchingQuote(true);
    try {
      const exchange = getStockExchange(stock);
      const response = await fetch(
        `/api/stocks/quote?symbol=${encodeURIComponent(stock.yahooSymbol)}&exchange=${exchange}`,
        { cache: "no-store" },
      );
      const result: QuoteResponse = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error ?? "Quote fetch failed");
      }

      const latest: StockResult = {
        symbol: result.data.symbol,
        yahooSymbol: result.data.yahooSymbol,
        name: result.data.name,
        price: result.data.price,
        change: result.data.change,
        changePercent: result.data.changePercent,
        currency: result.data.currency,
      };

      setSelectedStockData(latest);
      applyPriceToInputs(latest.price);
      setSearchError(null);
    } catch (error) {
      console.error("Failed to fetch latest quote for calculator:", error);
      setSearchError("Unable to refresh live price right now.");
    } finally {
      setIsFetchingQuote(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchError(null);
    if (query.trim().length >= STOCK_SEARCH_MIN_LENGTH) {
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
    if (query !== selectedStockName) {
      setSelectedStockName("");
    }
  };

  const handleStockSelect = (stock: StockResult) => {
    setSelectedStockName(stock.name);
    setSearchQuery(stock.name);
    setSelectedStockData(stock);
    setShowResults(false);
    setSearchError(null);
    if (stock.price > 0) {
      applyPriceToInputs(stock.price);
    }
    void fetchLatestQuote(stock);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".stock-search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < STOCK_SEARCH_MIN_LENGTH) {
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/stocks/search?q=${encodeURIComponent(query)}&exchange=${DEFAULT_EXCHANGE}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );
        const result: SearchResponse = await response.json();
        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.error ?? "Search failed");
        }

        const results = result.data.results ?? [];
        setSearchResults(results);
        if (results.length === 0) {
          setSearchError("No stocks found. Try searching with a different term.");
        } else {
          setSearchError(null);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Failed to search Yahoo stocks for calculator:", error);
        setSearchResults([]);
        setSearchError("Search is temporarily unavailable.");
      } finally {
        setIsSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    const loadDefaultStock = async () => {
      try {
        const response = await fetch(
          `/api/stocks/quote?symbol=${DEFAULT_STOCK_SYMBOL}&exchange=${DEFAULT_EXCHANGE}`,
          { cache: "no-store" },
        );
        const result: QuoteResponse = await response.json();
        if (!response.ok || !result.success || !result.data) {
          return;
        }

        const defaultStock: StockResult = {
          symbol: result.data.symbol,
          yahooSymbol: result.data.yahooSymbol,
          name: result.data.name,
          price: result.data.price,
          change: result.data.change,
          changePercent: result.data.changePercent,
          currency: result.data.currency,
        };

        setSelectedStockName(defaultStock.name);
        setSearchQuery(defaultStock.name);
        setSelectedStockData(defaultStock);
        applyPriceToInputs(defaultStock.price);
      } catch {
        // Keep manual entry mode if default quote cannot be loaded.
      }
    };

    void loadDefaultStock();
  }, []);

  const calculateCharges = (): CalculationResult => {
    const qty = parseFloat(quantity) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const rate = parseFloat(brokerageRate) || 0;

    const turnover = (buy + sell) * qty;
    const brokerage = (buy * qty * rate) / 100 + (sell * qty * rate) / 100;
    const sttCtt =
      tradeType === "intraday"
        ? (sell * qty * 0.025) / 100
        : ((buy + sell) * qty * 0.1) / 100;
    const transactionCharges = (turnover * 0.00297) / 100;
    const clearingCharges = 0.02;
    const gst = ((brokerage + transactionCharges + clearingCharges) * 18) / 100;
    const stampDuty = (buy * qty * 0.002) / 100;
    const sebiFees = (turnover * 0.00015) / 100;

    const totalCharges =
      brokerage +
      sttCtt +
      transactionCharges +
      clearingCharges +
      gst +
      stampDuty +
      sebiFees;

    const netBuyValue = buy * qty;
    const netSellValue = sell * qty;
    const netPL = netSellValue - netBuyValue - totalCharges;

    return {
      turnover,
      brokerage,
      sttCtt,
      transactionCharges,
      clearingCharges,
      gst,
      stampDuty,
      sebiFees,
      totalCharges,
      netBuyValue,
      netSellValue,
      netPL,
    };
  };

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(leadMobileNo)) {
      setLeadStatus({
        type: "error",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }
    if (!leadTncAccepted) {
      setLeadStatus({
        type: "error",
        message: "Please accept the Terms & Conditions to continue.",
      });
      return;
    }

    setLeadSubmitting(true);
    setLeadStatus(null);
    try {
      const crmApiEndpoint = process.env.NEXT_PUBLIC_CRM_API_ENDPOINT || "/api/crm/lead";
      const response = await fetch(crmApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo: leadMobileNo,
          source: "calculator-cta",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("CRM submission failed");
      }

      setLeadStatus({
        type: "success",
        message: "Submitted successfully. We will contact you soon.",
      });
      setLeadMobileNo("");
      setLeadTncAccepted(false);
    } catch (error) {
      console.error("Failed to submit calculator lead:", error);
      setLeadStatus({
        type: "error",
        message: "Unable to submit right now. Please try again in a moment.",
      });
    } finally {
      setLeadSubmitting(false);
    }
  };

  const result = calculateCharges();
  const formatCurrency = (value: number) => `\u20B9${value.toFixed(2)}`;
  const breakdownRows = [
    { label: "Turnover", value: result.turnover },
    { label: "Brokerage", value: result.brokerage },
    { label: "STT/CTT", value: result.sttCtt },
    { label: "Transaction Charges", value: result.transactionCharges },
    { label: "Clearing Charges", value: result.clearingCharges },
    { label: "GST", value: result.gst },
    { label: "State Stamp Duty", value: result.stampDuty },
    { label: "SEBI Turnover Fees", value: result.sebiFees },
  ];
  const inputClassName =
    "w-full rounded-2xl border border-emerald-200/80 bg-white/75 px-4 py-3 text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-all focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50";
  const faqItems = [
    {
      question: "What is a Brokerage calculator",
      answer:
        "A Brokerage Calculator is a handy tool that helps traders and investors estimate brokerage charges they may incur while trading across market segments.",
    },
    {
      question: "What are the benefits of a Brokerage Calculator?",
      answer:
        "By entering details like trade type, quantity, and instrument, you can get a clear estimate of charges. This helps with planning, strategy, and comparing broker costs.",
    },
    {
      question: "How are brokerage fees calculated?",
      answer:
        "Brokerage is typically calculated as a percentage of trade value or as a flat fee per executed order. It depends on segment, trade type, order value, and broker pricing plan.",
    },
    {
      question: "How are Intraday trading charges calculated?",
      answer:
        "For intraday, brokerage is usually charged on total turnover (buy value plus sell value), along with statutory costs like transaction charges, stamp duty, and GST.",
    },
    {
      question: "How is brokerage calculated on Options?",
      answer:
        "Options brokerage is usually based on premium value (option price multiplied by lot size) for both buy and sell legs, plus applicable statutory levies.",
    },
    {
      question: "How is brokerage calculated in Mutual Funds?",
      answer:
        "Mutual funds may include entry or exit load as per scheme terms, and brokers may also charge transaction fees depending on order type.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e9fff3] via-[#f4fff8] to-[#e6fff1] py-10 [font-family:'Plus_Jakarta_Sans','Manrope','Segoe_UI',sans-serif] sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute right-[-80px] top-1/4 h-80 w-80 rounded-full bg-green-400/25 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/3 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-300/70 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 backdrop-blur-sm">
            Brokerage Estimator
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl lg:text-5xl">
            Stock Brokerage Calculator
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-emerald-900/75 sm:text-base">
            Real-time stock lookup with a glossy glass calculator built for quick decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-white/65 bg-white/55 p-5 shadow-[0_25px_60px_-32px_rgba(16,185,129,0.8)] backdrop-blur-xl sm:p-8">
            <div className="mb-6 grid grid-cols-2 rounded-2xl border border-emerald-200/70 bg-white/65 p-1.5">
              <button
                onClick={() => setTradeType("intraday")}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  tradeType === "intraday"
                    ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/35"
                    : "text-emerald-900 hover:bg-emerald-50/80"
                }`}
              >
                Intraday
              </button>
              <button
                onClick={() => setTradeType("delivery")}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  tradeType === "delivery"
                    ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/35"
                    : "text-emerald-900 hover:bg-emerald-50/80"
                }`}
              >
                Delivery
              </button>
            </div>

            {selectedStockData && currentStockPrice !== null && (
              <div className="mb-5 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-emerald-950">
                      {selectedStockData.name}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-900/70">{selectedStockData.symbol}</p>
                    <span className="mt-2 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      {getStockExchange(selectedStockData)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-950">
                      {formatCurrency(currentStockPrice)}
                    </div>
                    <p
                      className={`mt-1 text-xs font-semibold ${
                        selectedStockData.changePercent >= 0 ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      {selectedStockData.changePercent >= 0 ? "+" : ""}
                      {selectedStockData.changePercent.toFixed(2)}%
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-900/60">
                      {isFetchingQuote ? "Updating live price..." : "Yahoo Finance"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="stock-search-container relative mb-6">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/80">
                Select Stock
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchQuery.trim().length >= STOCK_SEARCH_MIN_LENGTH &&
                    setShowResults(true)
                  }
                  className={inputClassName}
                  placeholder="Search for stocks (e.g. TCS, SBI, Reliance)"
                />
                <div className="absolute right-3 top-3">
                  {isSearching ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                  ) : (
                    <svg
                      className="h-5 w-5 text-emerald-700/65"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-emerald-100 bg-white/90 p-1 shadow-xl backdrop-blur-md">
                  {searchResults.map((stock) => (
                    <button
                      key={stock.yahooSymbol}
                      type="button"
                      onClick={() => handleStockSelect(stock)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-emerald-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{stock.name}</p>
                        <p className="text-xs text-gray-500">{stock.symbol}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                          {getStockExchange(stock)}
                        </span>
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          {formatCurrency(stock.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {showResults &&
                searchResults.length === 0 &&
                searchQuery.trim().length >= STOCK_SEARCH_MIN_LENGTH &&
                !isSearching && (
                  <div className="absolute z-50 mt-2 w-full rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                    <div className="text-center text-sm text-gray-600">
                      {searchError ?? "No stocks found. Try searching with a different term."}
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/80">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={inputClassName}
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/80">
                  Buy Price
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-3 text-sm font-semibold text-emerald-800/70">
                    {"\u20B9"}
                  </span>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => {
                      const newBuyPrice = e.target.value;
                      setBuyPrice(newBuyPrice);
                      if (newBuyPrice && !isNaN(parseFloat(newBuyPrice))) {
                        setSellPrice((parseFloat(newBuyPrice) + 1).toFixed(2));
                      }
                    }}
                    className={`${inputClassName} pl-8`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/80">
                  Sell Price
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-3 text-sm font-semibold text-emerald-800/70">
                    {"\u20B9"}
                  </span>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className={`${inputClassName} pl-8`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/80">
                  Brokerage Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={brokerageRate}
                    onChange={(e) => setBrokerageRate(e.target.value)}
                    className={`${inputClassName} pr-9`}
                    placeholder="0.03"
                    step="0.01"
                  />
                  <span className="pointer-events-none absolute right-3 top-3 text-sm font-semibold text-emerald-800/70">
                    %
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_-20px_rgba(16,185,129,0.95)] transition-all hover:from-emerald-700 hover:to-green-600"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10">Calculate Brokerage</span>
            </button>
          </section>

          <section className="rounded-3xl border border-white/65 bg-white/55 p-5 shadow-[0_25px_60px_-32px_rgba(16,185,129,0.8)] backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-emerald-950 sm:text-2xl">Breakdown</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Auto Updated
              </span>
            </div>

            <div className="space-y-2.5">
              {breakdownRows.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-emerald-100/80 bg-white/70 px-4 py-2.5"
                >
                  <span className="text-sm text-emerald-900/75">{item.label}</span>
                  <span className="text-sm font-semibold text-emerald-950">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}

              <div className="mt-4 rounded-2xl border border-emerald-300/70 bg-gradient-to-r from-emerald-600 to-green-500 px-4 py-3 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Total Taxes & Charges
                  </span>
                  <span className="text-lg font-bold">
                    {formatCurrency(result.totalCharges)}
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-emerald-100/80 bg-white/70 px-4 py-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-emerald-900/75">Net Buy Value</span>
                  <span className="font-semibold text-emerald-950">
                    {formatCurrency(result.netBuyValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-900/75">Net Sell Value</span>
                  <span className="font-semibold text-emerald-950">
                    {formatCurrency(result.netSellValue)}
                  </span>
                </div>
              </div>

              <div
                className={`mt-3 rounded-2xl border px-4 py-3 ${
                  result.netPL >= 0
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-700">
                    Net P&amp;L
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      result.netPL >= 0 ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(result.netPL)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mb-8 mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#12181a,#1b2326)] text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                Open a <span className="text-yellow-400">Free</span> Demat Account in{" "}
                <span className="text-yellow-400">5 Mins.</span>
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  "Free AMC for First Year",
                  "Free Research",
                  "Low DP Charges (\u20B910)",
                  "No Auto Square Off Charges",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 rounded-full border border-emerald-300/80 bg-emerald-400/10" />
                    <p className="text-lg font-semibold text-white/95">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleLeadSubmit} className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm sm:p-5">
              <label htmlFor="calculator-lead-mobile" className="sr-only">
                Mobile Number
              </label>
              <input
                id="calculator-lead-mobile"
                type="tel"
                value={leadMobileNo}
                onChange={(event) => {
                  const normalized = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, MOBILE_NUMBER_LENGTH);
                  setLeadMobileNo(normalized);
                  if (leadStatus) {
                    setLeadStatus(null);
                  }
                }}
                onInvalid={(event) => {
                  event.currentTarget.setCustomValidity("Please enter 10 digit number");
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={MOBILE_NUMBER_LENGTH}
                placeholder="Mobile Number"
                className="w-full rounded-xl border border-white/30 bg-white/90 px-5 py-3 text-lg font-medium text-gray-900 placeholder:text-gray-500 outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/40"
              />

              <label className="mt-4 flex items-start gap-2 text-sm text-white/90">
                <input
                  type="checkbox"
                  checked={leadTncAccepted}
                  onChange={(event) => {
                    setLeadTncAccepted(event.target.checked);
                    if (leadStatus) {
                      setLeadStatus(null);
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-white/40 bg-white/90 text-emerald-600 focus:ring-emerald-400"
                />
                <span>
                  I agree &amp; accept{" "}
                  <Link
                    href="/Terms-&-Conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-yellow-400 hover:text-yellow-300"
                  >
                    T&amp;C
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={leadSubmitting}
                className="mt-5 w-full rounded-xl bg-yellow-400 px-4 py-3 text-lg font-semibold text-gray-900 transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {leadSubmitting ? "Submitting..." : "Submit"}
              </button>

              {leadStatus && (
                <p
                  className={`mt-3 text-sm ${
                    leadStatus.type === "success" ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {leadStatus.message}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="relative mt-10 overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-gradient-to-br from-white/80 via-emerald-50/70 to-white/80 p-5 shadow-[0_35px_80px_-40px_rgba(16,185,129,0.85)] backdrop-blur-xl sm:p-8">
          <div className="relative">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-emerald-900/70">Everything you need about brokerage calculation.</p>
            </div>

            <div className="mt-6 grid gap-3">
              {faqItems.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-emerald-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_16px_35px_-24px_rgba(16,185,129,0.9)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold text-emerald-950 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 text-emerald-700 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-emerald-100/90 px-4 pb-4 pt-3">
                    <p className="text-sm leading-6 text-emerald-900/80">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalculatorSection;
