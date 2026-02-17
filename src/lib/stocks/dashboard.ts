import {
  fetchQuotes,
  toDisplaySymbol,
  type Exchange,
  type StockQuote,
} from "@/lib/stocks/yahoo";

const NETWORK_ERROR_LOG_THROTTLE_MS = 60_000;
let lastNetworkErrorLogAt = 0;

export type DashboardStock = {
  symbol: string;
  yahooSymbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
};

export type MarketStats = {
  todayHigh: number;
  todayLow: number;
  advances: number;
  declines: number;
  unchanged: number;
};

export type ExchangeDashboardData = {
  exchange: Exchange;
  indices: DashboardStock[];
  gainers: DashboardStock[];
  losers: DashboardStock[];
  marketStats: MarketStats;
  timestamp: string;
};

export type CombinedDashboardSnapshot = {
  indices: DashboardStock[];
  gainers: DashboardStock[];
  losers: DashboardStock[];
  marketStatsByExchange: Partial<Record<Exchange, MarketStats>>;
  timestamp: string;
};

const WATCHLIST_BASE_SYMBOLS = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "LT",
  "HINDUNILVR",
  "ITC",
  "BHARTIARTL",
  "AXISBANK",
  "MARUTI",
  "BAJFINANCE",
  "KOTAKBANK",
  "SUNPHARMA",
];

const FALLBACK_WATCHLIST_BASE = [
  { symbol: "BAJFINANCE", name: "Bajaj Finance", price: 1024.75, change: 25.65, changePercent: 2.57 },
  { symbol: "SBIN", name: "State Bank of India", price: 1198.6, change: 6.2, changePercent: 0.52 },
  { symbol: "ITC", name: "ITC", price: 457.3, change: 1.4, changePercent: 0.31 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 4120.35, change: -89.65, changePercent: -2.13 },
  { symbol: "INFY", name: "Infosys", price: 2845.5, change: -142.35, changePercent: -4.77 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2950.1, change: -65.8, changePercent: -2.18 },
];

const INDEX_SYMBOLS: Record<Exchange, string[]> = {
  NSE: ["^NSEI"],
  BSE: ["^BSESN"],
};

const FALLBACK_INDEX: Record<Exchange, DashboardStock> = {
  NSE: {
    symbol: "^NSEI",
    yahooSymbol: "^NSEI",
    name: "NIFTY 50",
    price: 25471.1,
    change: -336.1,
    changePercent: -1.3,
    currency: "INR",
  },
  BSE: {
    symbol: "^BSESN",
    yahooSymbol: "^BSESN",
    name: "BSE SENSEX",
    price: 83545.6,
    change: -1245.4,
    changePercent: -1.47,
    currency: "INR",
  },
};

const NSE_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  accept: "application/json,text/plain,*/*",
  referer: "https://www.nseindia.com/",
};

const BSE_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  accept: "application/json,text/plain,*/*",
  referer: "https://www.bseindia.com/",
  origin: "https://www.bseindia.com",
};

function isTransientNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toUpperCase();
  return (
    message.includes("FETCH FAILED") ||
    message.includes("ENOTFOUND") ||
    message.includes("EAI_AGAIN") ||
    message.includes("DNS RESOLUTION")
  );
}

function logDashboardFetchError(error: unknown): void {
  if (!isTransientNetworkError(error)) {
    console.error("Error fetching stock data:", error);
    return;
  }

  const now = Date.now();
  if (now - lastNetworkErrorLogAt < NETWORK_ERROR_LOG_THROTTLE_MS) {
    return;
  }

  lastNetworkErrorLogAt = now;
  console.warn("Live quote source is temporarily unavailable. Serving fallback market data.");
}

function getSuffix(exchange: Exchange): "NS" | "BO" {
  return exchange === "BSE" ? "BO" : "NS";
}

function withExchangeSuffix(baseSymbol: string, exchange: Exchange): string {
  return `${baseSymbol.toUpperCase()}.${getSuffix(exchange)}`;
}

function getWatchlistSymbols(exchange: Exchange): string[] {
  return WATCHLIST_BASE_SYMBOLS.map((symbol) => withExchangeSuffix(symbol, exchange));
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    const parsed = Number(cleaned);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

async function fetchNseMarketStats(): Promise<MarketStats | null> {
  try {
    const response = await fetch("https://www.nseindia.com/api/allIndices", {
      headers: NSE_HEADERS,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      data?: Array<Record<string, unknown>>;
    };

    const rows = payload.data ?? [];
    const nifty = rows.find(
      (row) => String(row.index ?? "").toUpperCase() === "NIFTY 50"
    );
    const totalMarket = rows.find(
      (row) => String(row.index ?? "").toUpperCase() === "NIFTY TOTAL MARKET"
    );

    if (!nifty) {
      return null;
    }

    const todayHigh = toFiniteNumber(nifty.high);
    const todayLow = toFiniteNumber(nifty.low);
    const advances = toFiniteNumber(totalMarket?.advances ?? nifty.advances);
    const declines = toFiniteNumber(totalMarket?.declines ?? nifty.declines);
    const unchanged = toFiniteNumber(totalMarket?.unchanged ?? nifty.unchanged);

    if (
      todayHigh === null ||
      todayLow === null ||
      advances === null ||
      declines === null ||
      unchanged === null
    ) {
      return null;
    }

    return {
      todayHigh: Number(todayHigh.toFixed(2)),
      todayLow: Number(todayLow.toFixed(2)),
      advances: Math.round(advances),
      declines: Math.round(declines),
      unchanged: Math.round(unchanged),
    };
  } catch {
    return null;
  }
}

async function fetchBseMarketStats(
  baseStats: MarketStats
): Promise<MarketStats> {
  try {
    const response = await fetch("https://api.bseindia.com/BseIndiaAPI/api/MarketStat2/w", {
      headers: BSE_HEADERS,
      cache: "no-store",
    });

    if (!response.ok) {
      return baseStats;
    }

    const payload = (await response.json()) as {
      Table?: Array<Record<string, unknown>>;
    };
    const tableRow = payload.Table?.[0];

    if (!tableRow) {
      return baseStats;
    }

    const advances = toFiniteNumber(tableRow.ADV);
    const declines = toFiniteNumber(tableRow.Dec);
    const unchanged = toFiniteNumber(tableRow.Unch);

    if (advances === null || declines === null || unchanged === null) {
      return baseStats;
    }

    return {
      ...baseStats,
      advances: Math.round(advances),
      declines: Math.round(declines),
      unchanged: Math.round(unchanged),
    };
  } catch {
    return baseStats;
  }
}

function mapQuoteToDashboardStock(quote: StockQuote): DashboardStock {
  return {
    symbol: toDisplaySymbol(quote.symbol),
    yahooSymbol: quote.symbol,
    name: quote.name,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changePercent,
    currency: quote.currency ?? "INR",
  };
}

function getFallbackData(exchange: Exchange): {
  indices: DashboardStock[];
  gainers: DashboardStock[];
  losers: DashboardStock[];
  marketStats: MarketStats;
} {
  const fallbackWatchlist: DashboardStock[] = FALLBACK_WATCHLIST_BASE.map((item) => ({
    ...item,
    yahooSymbol: withExchangeSuffix(item.symbol, exchange),
    currency: "INR",
  }));

  const sorted = [...fallbackWatchlist].sort((first, second) => second.changePercent - first.changePercent);
  const advances = fallbackWatchlist.filter((item) => item.changePercent > 0).length;
  const declines = fallbackWatchlist.filter((item) => item.changePercent < 0).length;
  const unchanged = Math.max(0, fallbackWatchlist.length - advances - declines);
  const fallbackIndex = FALLBACK_INDEX[exchange];
  const highShift = Math.abs(fallbackIndex.change) * 0.35;
  const lowShift = Math.abs(fallbackIndex.change) * 0.55;

  return {
    indices: [fallbackIndex],
    gainers: sorted.filter((item) => item.changePercent >= 0).slice(0, 5),
    losers: [...sorted].reverse().filter((item) => item.changePercent < 0).slice(0, 5),
    marketStats: {
      todayHigh: Number((fallbackIndex.price + highShift).toFixed(2)),
      todayLow: Number((fallbackIndex.price - lowShift).toFixed(2)),
      advances,
      declines,
      unchanged,
    },
  };
}

export async function fetchExchangeDashboard(
  exchange: Exchange
): Promise<ExchangeDashboardData> {
  try {
    const indexSymbols = INDEX_SYMBOLS[exchange];
    const watchlistSymbols = getWatchlistSymbols(exchange);
    const symbols = [...indexSymbols, ...watchlistSymbols];

    const quotes = await fetchQuotes(symbols);
    const quoteMap = new Map(quotes.map((quote) => [quote.symbol, quote]));

    const indexQuotes = indexSymbols
      .map((symbol) => quoteMap.get(symbol))
      .filter((quote): quote is StockQuote => Boolean(quote));
    const indices = indexQuotes.map(mapQuoteToDashboardStock);

    const rawWatchlistQuotes = watchlistSymbols
      .map((symbol) => quoteMap.get(symbol))
      .filter((quote): quote is StockQuote => Boolean(quote));
    const watchlistQuotes = rawWatchlistQuotes.map(mapQuoteToDashboardStock);

    if (indices.length === 0 || watchlistQuotes.length === 0) {
      throw new Error("Insufficient live quote data");
    }

    const primaryIndexQuote = indexQuotes[0];
    const advances = watchlistQuotes.filter((item) => item.changePercent > 0).length;
    const declines = watchlistQuotes.filter((item) => item.changePercent < 0).length;
    const unchanged = Math.max(0, watchlistQuotes.length - advances - declines);
    let marketStats: MarketStats = {
      todayHigh: Number((primaryIndexQuote.dayHigh ?? primaryIndexQuote.price).toFixed(2)),
      todayLow: Number((primaryIndexQuote.dayLow ?? primaryIndexQuote.price).toFixed(2)),
      advances,
      declines,
      unchanged,
    };

    if (exchange === "NSE") {
      const nseStats = await fetchNseMarketStats();
      if (nseStats) {
        marketStats = nseStats;
      }
    } else {
      marketStats = await fetchBseMarketStats(marketStats);
    }

    const sortedByChange = [...watchlistQuotes].sort(
      (first, second) => second.changePercent - first.changePercent
    );
    const gainers = sortedByChange.filter((item) => item.changePercent >= 0).slice(0, 5);
    const losers = [...sortedByChange].reverse().filter((item) => item.changePercent < 0).slice(0, 5);

    return {
      exchange,
      indices,
      gainers,
      losers,
      marketStats,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logDashboardFetchError(error);
    const fallbackData = getFallbackData(exchange);
    return {
      exchange,
      ...fallbackData,
      timestamp: new Date().toISOString(),
    };
  }
}

function getStockKey(stock: Pick<DashboardStock, "symbol" | "yahooSymbol">): string {
  return (stock.yahooSymbol ?? stock.symbol).toUpperCase();
}

function getStockBaseSymbol(stock: Pick<DashboardStock, "symbol" | "yahooSymbol">): string {
  const symbol = getStockKey(stock);
  if (symbol.endsWith(".NS") || symbol.endsWith(".BO")) {
    return symbol.replace(/\.(NS|BO)$/i, "");
  }
  return stock.symbol.toUpperCase();
}

function mergeUniqueStocks(stocks: DashboardStock[]): DashboardStock[] {
  return Array.from(new Map(stocks.map((stock) => [getStockKey(stock), stock])).values());
}

function mergeUniqueStocksByCompany(stocks: DashboardStock[]): DashboardStock[] {
  const uniqueByCompany = new Map<string, DashboardStock>();

  for (const stock of stocks) {
    const companyKey = getStockBaseSymbol(stock);
    const existing = uniqueByCompany.get(companyKey);

    if (!existing || Math.abs(stock.changePercent) > Math.abs(existing.changePercent)) {
      uniqueByCompany.set(companyKey, stock);
    }
  }

  return Array.from(uniqueByCompany.values());
}

export function combineExchangeDashboardData(
  nseData: ExchangeDashboardData,
  bseData: ExchangeDashboardData
): CombinedDashboardSnapshot {
  const marketStatsByExchange: Partial<Record<Exchange, MarketStats>> = {
    NSE: nseData.marketStats,
    BSE: bseData.marketStats,
  };

  const indices = mergeUniqueStocks([...(nseData.indices ?? []), ...(bseData.indices ?? [])]);
  const momentumUniverse = mergeUniqueStocksByCompany([
    ...(nseData.gainers ?? []),
    ...(nseData.losers ?? []),
    ...(bseData.gainers ?? []),
    ...(bseData.losers ?? []),
  ]);

  const gainers = momentumUniverse
    .filter((item) => item.changePercent >= 0)
    .sort((first, second) => second.changePercent - first.changePercent)
    .slice(0, 5);

  const losers = momentumUniverse
    .filter((item) => item.changePercent < 0)
    .sort((first, second) => first.changePercent - second.changePercent)
    .slice(0, 5);

  return {
    indices,
    gainers,
    losers,
    marketStatsByExchange,
    timestamp: new Date().toISOString(),
  };
}

export async function fetchCombinedDashboardSnapshot(): Promise<CombinedDashboardSnapshot> {
  const [nseData, bseData] = await Promise.all([
    fetchExchangeDashboard("NSE"),
    fetchExchangeDashboard("BSE"),
  ]);

  return combineExchangeDashboardData(nseData, bseData);
}
