import { fetchBestQuote, normalizeExchange, toDisplaySymbol } from "@/lib/stocks/yahoo";
import { findFallbackBySymbol } from "@/lib/stocks/fallback";

function createFallbackQuoteResponse(symbol: string, exchange: "NSE" | "BSE") {
  const fallback = findFallbackBySymbol(symbol, exchange);
  if (!fallback) {
    return null;
  }

  return {
    symbol: fallback.symbol,
    yahooSymbol: fallback.yahooSymbol,
    exchange,
    name: fallback.name,
    price: fallback.price,
    change: 0,
    changePercent: 0,
    currency: fallback.currency,
    timestamp: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.trim() ?? "";
  const exchange = normalizeExchange(searchParams.get("exchange"));

  if (!symbol) {
    return Response.json(
      { success: false, error: "Query parameter symbol is required" },
      { status: 400 }
    );
  }

  try {
    const quote = await fetchBestQuote(symbol, exchange);

    if (!quote) {
      const fallbackData = createFallbackQuoteResponse(symbol, exchange);
      if (fallbackData) {
        return Response.json(
          {
            success: true,
            data: fallbackData,
          },
          {
            headers: {
              "Cache-Control": "no-store, max-age=0",
              "Content-Type": "application/json",
            },
          }
        );
      }

      return Response.json(
        { success: false, error: "Stock quote not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: {
          symbol: toDisplaySymbol(quote.symbol),
          yahooSymbol: quote.symbol,
          exchange,
          name: quote.name,
          price: quote.price,
          change: quote.change,
          changePercent: quote.changePercent,
          currency: quote.currency ?? "INR",
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
    console.error("Error fetching quote:", error);

    const fallbackData = createFallbackQuoteResponse(symbol, exchange);
    if (fallbackData) {
      return Response.json(
        {
          success: true,
          data: fallbackData,
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "Content-Type": "application/json",
          },
        }
      );
    }

    return Response.json(
      { success: false, error: "Failed to fetch stock quote" },
      { status: 500 }
    );
  }
}
