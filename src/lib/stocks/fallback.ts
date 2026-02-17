import { normalizeExchange, type Exchange } from "@/lib/stocks/yahoo";

export interface FallbackStock {
  symbol: string;
  yahooSymbol: string;
  name: string;
  price: number;
  currency: string;
}

export const FALLBACK_STOCKS: FallbackStock[] = [
  { symbol: "RELIANCE", yahooSymbol: "RELIANCE.NS", name: "Reliance Industries", price: 2950.1, currency: "INR" },
  { symbol: "TCS", yahooSymbol: "TCS.NS", name: "Tata Consultancy Services", price: 4120.35, currency: "INR" },
  { symbol: "INFY", yahooSymbol: "INFY.NS", name: "Infosys", price: 2845.5, currency: "INR" },
  { symbol: "HDFCBANK", yahooSymbol: "HDFCBANK.NS", name: "HDFC Bank", price: 1684.25, currency: "INR" },
  { symbol: "ICICIBANK", yahooSymbol: "ICICIBANK.NS", name: "ICICI Bank", price: 1249.85, currency: "INR" },
  { symbol: "SBIN", yahooSymbol: "SBIN.NS", name: "State Bank of India", price: 1198.6, currency: "INR" },
  { symbol: "LT", yahooSymbol: "LT.NS", name: "Larsen & Toubro", price: 3625.4, currency: "INR" },
  { symbol: "ITC", yahooSymbol: "ITC.NS", name: "ITC", price: 457.3, currency: "INR" },
  { symbol: "AXISBANK", yahooSymbol: "AXISBANK.NS", name: "Axis Bank", price: 1162.75, currency: "INR" },
  { symbol: "BAJFINANCE", yahooSymbol: "BAJFINANCE.NS", name: "Bajaj Finance", price: 1024.75, currency: "INR" },
  { symbol: "KOTAKBANK", yahooSymbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", price: 1841.1, currency: "INR" },
  { symbol: "SUNPHARMA", yahooSymbol: "SUNPHARMA.NS", name: "Sun Pharmaceutical", price: 1675.2, currency: "INR" },
];

function normalizeQuery(input: string): string {
  return input.trim().toUpperCase();
}

function stripIndianSuffix(symbol: string): string {
  return symbol.toUpperCase().replace(/\.(NS|BO)$/i, "");
}

function convertStockToExchange(stock: FallbackStock, exchange: Exchange): FallbackStock {
  const baseSymbol = stripIndianSuffix(stock.yahooSymbol);
  const suffix = exchange === "BSE" ? "BO" : "NS";

  return {
    ...stock,
    yahooSymbol: `${baseSymbol}.${suffix}`,
  };
}

export function searchFallbackStocks(
  query: string,
  exchangeInput?: string | null
): FallbackStock[] {
  const normalized = normalizeQuery(query);
  const exchange = normalizeExchange(exchangeInput);

  if (!normalized) {
    return [];
  }

  const ranked = FALLBACK_STOCKS.map((baseStock) => {
    const stock = convertStockToExchange(baseStock, exchange);
    const stockSymbol = stock.symbol.toUpperCase();
    const stockYahoo = stock.yahooSymbol.toUpperCase();
    const stockName = stock.name.toUpperCase();
    let score = 0;

    if (stockSymbol === normalized || stockYahoo === normalized) {
      score += 1000;
    }
    if (stockSymbol.startsWith(normalized)) {
      score += 300;
    } else if (stockSymbol.includes(normalized)) {
      score += 170;
    }
    if (stockYahoo.startsWith(normalized)) {
      score += 250;
    } else if (stockYahoo.includes(normalized)) {
      score += 120;
    }
    if (stockName.startsWith(normalized)) {
      score += 160;
    } else if (stockName.includes(normalized)) {
      score += 80;
    }

    return { stock, score };
  })
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score);

  return ranked.map((item) => item.stock);
}

export function findFallbackBySymbol(
  symbol: string,
  exchangeInput?: string | null
): FallbackStock | null {
  const normalized = normalizeQuery(symbol);
  const exchange = normalizeExchange(exchangeInput);

  if (!normalized) {
    return null;
  }

  const normalizedWithoutSuffix = stripIndianSuffix(normalized);

  const matched =
    FALLBACK_STOCKS.find((item) => item.yahooSymbol.toUpperCase() === normalized) ??
    FALLBACK_STOCKS.find((item) => item.symbol.toUpperCase() === normalized) ??
    FALLBACK_STOCKS.find((item) => item.symbol.toUpperCase() === normalizedWithoutSuffix) ??
    null;

  if (!matched) {
    return null;
  }

  return convertStockToExchange(matched, exchange);
}
