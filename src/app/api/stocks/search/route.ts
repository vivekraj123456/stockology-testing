import {
  buildSymbolCandidates,
  fetchQuotes,
  normalizeExchange,
  searchSymbols,
  toDisplaySymbol,
  type StockQuote,
} from "@/lib/stocks/yahoo";
import { searchFallbackStocks } from "@/lib/stocks/fallback";

type SearchResultStock = {
  symbol: string;
  yahooSymbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
};

type CachedSearchEntry = {
  results: SearchResultStock[];
  timestamp: number;
};

const SEARCH_RESULT_LIMIT = 8;
const SEARCH_SYMBOL_CANDIDATE_LIMIT = 8;
const MAX_QUOTE_SYMBOLS = 16;
const SEARCH_CACHE_TTL_MS = 45_000;
const searchCache = new Map<string, CachedSearchEntry>();

function mapQuoteToSearchResult(quote: StockQuote): SearchResultStock {
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

function mapFallbackToSearchResult(item: {
  symbol: string;
  yahooSymbol: string;
  name: string;
  price: number;
  currency: string;
}): SearchResultStock {
  return {
    symbol: item.symbol,
    yahooSymbol: item.yahooSymbol,
    name: item.name,
    price: item.price,
    change: 0,
    changePercent: 0,
    currency: item.currency,
  };
}

function getRelevanceScore(stock: SearchResultStock, query: string): number {
  const normalizedQuery = query.toUpperCase();
  const symbol = stock.symbol.toUpperCase();
  const yahooSymbol = stock.yahooSymbol.toUpperCase();
  const name = stock.name.toUpperCase();

  if (symbol === normalizedQuery || yahooSymbol === normalizedQuery) {
    return 1000;
  }

  let score = 0;

  if (symbol.startsWith(normalizedQuery)) {
    score += 350;
  } else if (symbol.includes(normalizedQuery)) {
    score += 200;
  }

  if (yahooSymbol.startsWith(normalizedQuery)) {
    score += 240;
  } else if (yahooSymbol.includes(normalizedQuery)) {
    score += 140;
  }

  if (name.startsWith(normalizedQuery)) {
    score += 160;
  } else if (name.includes(normalizedQuery)) {
    score += 80;
  }

  return score;
}

function getExchangeSuffix(exchange: "NSE" | "BSE"): "NS" | "BO" {
  return exchange === "BSE" ? "BO" : "NS";
}

function mapSymbolToExchange(symbol: string, exchange: "NSE" | "BSE"): string {
  const normalized = symbol.toUpperCase();
  const targetSuffix = getExchangeSuffix(exchange);

  if (normalized.endsWith(".NS") || normalized.endsWith(".BO")) {
    return normalized.replace(/\.(NS|BO)$/i, `.${targetSuffix}`);
  }

  if (normalized.startsWith("^") || normalized.includes("=") || normalized.includes(".")) {
    return normalized;
  }

  return `${normalized}.${targetSuffix}`;
}

function isExchangePreferred(symbol: string, exchange: "NSE" | "BSE"): boolean {
  const upper = symbol.toUpperCase();
  const suffix = exchange === "BSE" ? ".BO" : ".NS";

  if (upper.endsWith(suffix)) {
    return true;
  }

  if (!upper.includes(".")) {
    return true;
  }

  return upper.startsWith("^");
}

function getCacheKey(query: string, exchange: "NSE" | "BSE"): string {
  return `${exchange}:${query.trim().toUpperCase()}`;
}

function getCachedResults(query: string, exchange: "NSE" | "BSE"): SearchResultStock[] | null {
  const key = getCacheKey(query, exchange);
  const cached = searchCache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() - cached.timestamp > SEARCH_CACHE_TTL_MS) {
    searchCache.delete(key);
    return null;
  }

  return cached.results;
}

function setCachedResults(query: string, exchange: "NSE" | "BSE", results: SearchResultStock[]): void {
  const key = getCacheKey(query, exchange);
  if (results.length === 0) {
    searchCache.delete(key);
    return;
  }

  searchCache.set(key, {
    results,
    timestamp: Date.now(),
  });
}

function mapCandidateToSearchResult(
  candidate: { symbol: string; name: string },
  exchange: "NSE" | "BSE"
): SearchResultStock {
  const yahooSymbol = mapSymbolToExchange(candidate.symbol, exchange);
  return {
    symbol: toDisplaySymbol(yahooSymbol),
    yahooSymbol,
    name: candidate.name,
    price: 0,
    change: 0,
    changePercent: 0,
    currency: "INR",
  };
}

function looksLikeTickerQuery(query: string): boolean {
  const normalized = query.trim().toUpperCase();
  return /^[A-Z0-9.^=-]{2,12}$/.test(normalized) && !normalized.includes(" ");
}

function finalizeResults(
  query: string,
  exchange: "NSE" | "BSE",
  ranked: SearchResultStock[]
): SearchResultStock[] {
  const dedupedResults = Array.from(
    new Map(ranked.map((stock) => [stock.yahooSymbol, stock])).values()
  );

  dedupedResults.sort(
    (first, second) =>
      getRelevanceScore(second, query) - getRelevanceScore(first, query)
  );

  const exchangeFirstResults = dedupedResults.filter((item) =>
    isExchangePreferred(item.yahooSymbol, exchange)
  );
  const orderedResults =
    exchangeFirstResults.length > 0
      ? [
          ...exchangeFirstResults,
          ...dedupedResults.filter((item) => !isExchangePreferred(item.yahooSymbol, exchange)),
        ]
      : dedupedResults;

  const fallbackResults = searchFallbackStocks(query, exchange)
    .slice(0, SEARCH_RESULT_LIMIT)
    .map(mapFallbackToSearchResult);

  return orderedResults.length > 0
    ? orderedResults.slice(0, SEARCH_RESULT_LIMIT)
    : fallbackResults;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const exchange = normalizeExchange(searchParams.get("exchange"));

  if (!query) {
    return Response.json(
      { success: false, error: "Query parameter q is required" },
      { status: 400 }
    );
  }

  const cachedResults = getCachedResults(query, exchange);
  if (cachedResults) {
    return Response.json(
      {
        success: true,
        data: {
          query,
          exchange,
          results: cachedResults,
          timestamp: new Date().toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const normalizedQuery = query.toUpperCase();
    const fallbackSymbols = buildSymbolCandidates(query, exchange);
    const directQuotes = looksLikeTickerQuery(normalizedQuery)
      ? await fetchQuotes(fallbackSymbols).catch(() => [])
      : [];
    const directRanked = directQuotes.map(mapQuoteToSearchResult);

    // For ticker-like input (e.g. TCS, SBIN), return direct quote matches immediately.
    if (looksLikeTickerQuery(normalizedQuery) && normalizedQuery.length <= 6 && directRanked.length > 0) {
      const finalDirectResults = finalizeResults(query, exchange, directRanked);
      setCachedResults(query, exchange, finalDirectResults);

      return Response.json(
        {
          success: true,
          data: {
            query,
            exchange,
            results: finalDirectResults,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const candidates = await searchSymbols(query, SEARCH_SYMBOL_CANDIDATE_LIMIT).catch(() => []);
    const candidateSymbols = candidates.map((candidate) => candidate.symbol);
    const preferredCandidateSymbols = candidates.map((candidate) =>
      mapSymbolToExchange(candidate.symbol, exchange)
    );
    const symbolsToFetch = Array.from(
      new Set([...preferredCandidateSymbols, ...candidateSymbols, ...fallbackSymbols])
    ).slice(0, MAX_QUOTE_SYMBOLS);
    const quotes = await fetchQuotes(symbolsToFetch).catch(() => []);
    const quoteMap = new Map(quotes.map((quote) => [quote.symbol, quote]));

    let ranked = candidates
      .map((candidate) => {
        const preferredSymbol = mapSymbolToExchange(candidate.symbol, exchange);
        return quoteMap.get(preferredSymbol) ?? quoteMap.get(candidate.symbol);
      })
      .filter((quote): quote is StockQuote => Boolean(quote))
      .map(mapQuoteToSearchResult);

    if (ranked.length === 0) {
      ranked = quotes.map(mapQuoteToSearchResult);
    }

    if (ranked.length === 0 && candidates.length > 0) {
      ranked = candidates.map((candidate) => mapCandidateToSearchResult(candidate, exchange));
    }

    const finalResults = finalizeResults(query, exchange, [...directRanked, ...ranked]);
    setCachedResults(query, exchange, finalResults);

    return Response.json(
      {
        success: true,
        data: {
          query,
          exchange,
          results: finalResults,
          timestamp: new Date().toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error searching stocks:", error);

    const fallbackResults = searchFallbackStocks(query, exchange)
      .slice(0, SEARCH_RESULT_LIMIT)
      .map(mapFallbackToSearchResult);
    setCachedResults(query, exchange, fallbackResults);

    return Response.json(
      {
        success: true,
        data: {
          query,
          exchange,
          results: fallbackResults,
          timestamp: new Date().toISOString(),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
