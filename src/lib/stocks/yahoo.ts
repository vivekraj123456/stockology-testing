export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  dayHigh?: number;
  dayLow?: number;
  currency?: string;
  exchange?: string;
  marketState?: string;
}

export interface SearchCandidate {
  symbol: string;
  name: string;
}

export type Exchange = "NSE" | "BSE";

export interface ChartDataPoint {
  date: string;
  time: string;
  price: number;
  volume: number;
}

interface YahooSparkMeta {
  symbol?: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  previousClose?: number;
  chartPreviousClose?: number;
  currency?: string;
  fullExchangeName?: string;
  marketState?: string;
}

interface YahooSparkResultItem {
  symbol?: string;
  response?: Array<{
    meta?: YahooSparkMeta;
  }>;
}

interface YahooSparkResponse {
  spark?: {
    result?: YahooSparkResultItem[];
  };
}

interface YahooSearchQuote {
  symbol?: string;
  shortname?: string;
  longname?: string;
  quoteType?: string;
}

interface YahooSearchResponse {
  quotes?: YahooSearchQuote[];
}

interface YahooChartQuote {
  close?: Array<number | null>;
  volume?: Array<number | null>;
}

interface YahooChartResult {
  timestamp?: number[];
  indicators?: {
    quote?: YahooChartQuote[];
  };
}

interface YahooChartResponse {
  chart?: {
    result?: YahooChartResult[];
  };
}

const YAHOO_HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};

const YAHOO_DNS_BACKOFF_MS = 60_000;
let yahooDnsBackoffUntil = 0;

const PERIOD_CONFIG: Record<string, { range: string; interval: string }> = {
  "1d": { range: "1d", interval: "5m" },
  "1m": { range: "1mo", interval: "1d" },
  "3m": { range: "3mo", interval: "1d" },
  "1y": { range: "1y", interval: "1wk" },
  "3y": { range: "3y", interval: "1mo" },
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

type NetworkErrorLike = Error & {
  cause?: {
    code?: string;
  };
};

function isDnsLookupError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const withCause = error as NetworkErrorLike;
  const causeCode = withCause.cause?.code;

  if (causeCode === "ENOTFOUND" || causeCode === "EAI_AGAIN") {
    return true;
  }

  const message = error.message.toUpperCase();
  return message.includes("ENOTFOUND") || message.includes("EAI_AGAIN");
}

function getYahooUrlCandidates(url: string): string[] {
  const candidates = [url];

  if (url.includes("query1.finance.yahoo.com")) {
    candidates.push(url.replace("query1.finance.yahoo.com", "query2.finance.yahoo.com"));
  } else if (url.includes("query2.finance.yahoo.com")) {
    candidates.push(url.replace("query2.finance.yahoo.com", "query1.finance.yahoo.com"));
  }

  return Array.from(new Set(candidates));
}

async function fetchYahooJson<T>(url: string): Promise<T> {
  const now = Date.now();
  if (now < yahooDnsBackoffUntil) {
    throw new Error("Yahoo DNS resolution is temporarily unavailable");
  }

  const candidates = getYahooUrlCandidates(url);
  let lastError: unknown = null;
  let sawDnsError = false;

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, {
        headers: YAHOO_HEADERS,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Yahoo request failed with status ${response.status}`);
      }

      yahooDnsBackoffUntil = 0;
      return (await response.json()) as T;
    } catch (error) {
      if (isDnsLookupError(error)) {
        sawDnsError = true;
      }
      lastError = error;
    }
  }

  if (sawDnsError) {
    yahooDnsBackoffUntil = Date.now() + YAHOO_DNS_BACKOFF_MS;
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Yahoo request failed");
}

export function toDisplaySymbol(symbol: string): string {
  return symbol.replace(/\.(NS|BO)$/i, "");
}

export function normalizeExchange(exchange?: string | null): Exchange {
  return exchange?.trim().toUpperCase() === "BSE" ? "BSE" : "NSE";
}

function getSuffixForExchange(exchange: Exchange): "NS" | "BO" {
  return exchange === "BSE" ? "BO" : "NS";
}

function replaceSuffixForExchange(symbol: string, exchange: Exchange): string {
  const normalized = symbol.trim().toUpperCase();
  const targetSuffix = getSuffixForExchange(exchange);

  if (normalized.endsWith(".NS") || normalized.endsWith(".BO")) {
    return normalized.replace(/\.(NS|BO)$/i, `.${targetSuffix}`);
  }

  if (normalized.startsWith("^") || normalized.includes("=")) {
    return normalized;
  }

  if (normalized.includes(".")) {
    return normalized;
  }

  return `${normalized}.${targetSuffix}`;
}

export function buildSymbolCandidates(input: string, preferredExchange: Exchange = "NSE"): string[] {
  const normalized = input.trim().toUpperCase();

  if (!normalized) {
    return [];
  }

  if (normalized.startsWith("^") || normalized.includes("=") || normalized.includes(".")) {
    return [normalized];
  }

  const preferred = replaceSuffixForExchange(normalized, preferredExchange);
  const secondaryExchange: Exchange = preferredExchange === "NSE" ? "BSE" : "NSE";
  const secondary = replaceSuffixForExchange(normalized, secondaryExchange);

  return Array.from(new Set([normalized, preferred, secondary]));
}

export async function fetchQuotes(symbols: string[]): Promise<StockQuote[]> {
  const uniqueSymbols = Array.from(
    new Set(
      symbols
        .map((symbol) => symbol.trim().toUpperCase())
        .filter((symbol) => symbol.length > 0)
    )
  );

  if (uniqueSymbols.length === 0) {
    return [];
  }

  const encodedSymbols = uniqueSymbols.map((symbol) => encodeURIComponent(symbol)).join(",");
  const url =
    `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${encodedSymbols}` +
    `&range=1d&interval=5m`;

  const data = await fetchYahooJson<YahooSparkResponse>(url);
  const results = data.spark?.result ?? [];

  return results
    .map((item): StockQuote | null => {
      const meta = item.response?.[0]?.meta;
      const symbol = (meta?.symbol ?? item.symbol)?.toUpperCase();
      const price = meta?.regularMarketPrice;

      if (!symbol || !isFiniteNumber(price)) {
        return null;
      }

      const previousClose = isFiniteNumber(meta?.previousClose)
        ? meta.previousClose
        : isFiniteNumber(meta?.chartPreviousClose)
          ? meta.chartPreviousClose
          : null;

      const change =
        previousClose !== null && previousClose !== 0
          ? price - previousClose
          : 0;
      const changePercent =
        previousClose !== null && previousClose !== 0
          ? (change / previousClose) * 100
          : 0;

      const quote: StockQuote = {
        symbol,
        name: meta?.longName ?? meta?.shortName ?? symbol,
        price,
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
      };

      if (isFiniteNumber(meta?.regularMarketDayHigh)) {
        quote.dayHigh = meta.regularMarketDayHigh;
      }

      if (isFiniteNumber(meta?.regularMarketDayLow)) {
        quote.dayLow = meta.regularMarketDayLow;
      }

      if (meta?.currency) {
        quote.currency = meta.currency;
      }

      if (meta?.fullExchangeName) {
        quote.exchange = meta.fullExchangeName;
      }

      if (meta?.marketState) {
        quote.marketState = meta.marketState;
      }

      return quote;
    })
    .filter((item): item is StockQuote => item !== null);
}

export async function fetchBestQuote(
  input: string,
  preferredExchange: Exchange = "NSE"
): Promise<StockQuote | null> {
  const normalized = input.trim().toUpperCase();
  const candidates = buildSymbolCandidates(normalized, preferredExchange);
  const quotes = await fetchQuotes(candidates);

  if (quotes.length === 0) {
    return null;
  }

  const preferredSymbol = replaceSuffixForExchange(normalized, preferredExchange);
  const secondarySymbol = replaceSuffixForExchange(
    normalized,
    preferredExchange === "NSE" ? "BSE" : "NSE"
  );

  return (
    quotes.find((quote) => quote.symbol === normalized) ??
    quotes.find((quote) => quote.symbol === preferredSymbol) ??
    quotes.find((quote) => quote.symbol === secondarySymbol) ??
    quotes[0]
  );
}

export async function searchSymbols(query: string, limit = 10): Promise<SearchCandidate[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const url =
    `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(normalizedQuery)}` +
    `&quotesCount=${Math.max(limit, 10)}&newsCount=0&lang=en-US&region=IN`;

  const data = await fetchYahooJson<YahooSearchResponse>(url);
  const rawQuotes = data.quotes ?? [];
  const allowedTypes = new Set(["EQUITY", "ETF", "INDEX"]);

  const seenSymbols = new Set<string>();
  const candidates: SearchCandidate[] = [];

  for (const item of rawQuotes) {
    const symbol = item.symbol?.toUpperCase();
    const quoteType = item.quoteType?.toUpperCase();

    if (!symbol || seenSymbols.has(symbol)) {
      continue;
    }

    if (quoteType && !allowedTypes.has(quoteType)) {
      continue;
    }

    seenSymbols.add(symbol);
    candidates.push({
      symbol,
      name: item.longname ?? item.shortname ?? symbol,
    });

    if (candidates.length >= limit) {
      break;
    }
  }

  return candidates;
}

async function fetchHistoryForSymbol(symbol: string, period: string): Promise<ChartDataPoint[]> {
  const periodConfig = PERIOD_CONFIG[period] ?? PERIOD_CONFIG["1d"];
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?range=${periodConfig.range}&interval=${periodConfig.interval}&includePrePost=false&events=div%2Csplit`;

  const data = await fetchYahooJson<YahooChartResponse>(url);
  const result = data.chart?.result?.[0];
  const timestamps = result?.timestamp ?? [];
  const quote = result?.indicators?.quote?.[0];
  const closes = quote?.close ?? [];
  const volumes = quote?.volume ?? [];

  const points: ChartDataPoint[] = [];

  for (let index = 0; index < timestamps.length; index += 1) {
    const timestamp = timestamps[index];
    const close = closes[index];

    if (!isFiniteNumber(timestamp) || !isFiniteNumber(close)) {
      continue;
    }

    const pointDate = new Date(timestamp * 1000);
    const volume = volumes[index];

    points.push({
      date: pointDate.toISOString().slice(0, 10),
      time: pointDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      price: Number(close.toFixed(2)),
      volume: isFiniteNumber(volume) ? Math.round(volume) : 0,
    });
  }

  return points;
}

export async function fetchHistory(
  symbol: string,
  period: string,
  preferredExchange: Exchange = "NSE"
): Promise<{ symbol: string; prices: ChartDataPoint[] }> {
  const candidates = buildSymbolCandidates(symbol, preferredExchange);

  if (candidates.length === 0) {
    return { symbol, prices: [] };
  }

  for (const candidate of candidates) {
    try {
      const prices = await fetchHistoryForSymbol(candidate, period);
      if (prices.length > 0) {
        return { symbol: candidate, prices };
      }
    } catch {
      // Try next candidate symbol
    }
  }

  return { symbol: candidates[0], prices: [] };
}
