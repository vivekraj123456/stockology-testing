import { fetchHistory, normalizeExchange } from "@/lib/stocks/yahoo";

// API route to fetch historical chart data for a stock
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "^NSEI";
  const period = searchParams.get("period") || "1d"; // 1d, 1m, 3m, 1y, 3y
  const exchange = normalizeExchange(searchParams.get("exchange"));

  try {
    const liveHistory = await fetchHistory(symbol, period, exchange);
    const historicalData =
      liveHistory.prices.length > 0
        ? liveHistory.prices
        : generateMockChartData(liveHistory.symbol, period);

    return Response.json(
      {
        success: true,
        data: {
          symbol: liveHistory.symbol,
          exchange,
          period,
          prices: historicalData,
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
    console.error("Error fetching chart data:", error);
    return Response.json(
      { success: false, error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}

function generateMockChartData(symbol: string, period: string) {
  const dataPoints = getDataPointsForPeriod(period);
  const basePrice =
    symbol === "^NSEI"
      ? 25471
      : symbol === "^BSESN"
        ? 83545
        : symbol.includes("BAJFINANCE")
          ? 1024
          : 2500;

  const prices = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = dataPoints; i > 0; i -= 1) {
    const date = new Date(now);
    if (period === "1d") {
      date.setHours(date.getHours() - i);
    } else if (period === "1m") {
      date.setDate(date.getDate() - i);
    } else if (period === "3m") {
      date.setDate(date.getDate() - i * 3);
    } else if (period === "1y") {
      date.setDate(date.getDate() - i * 7);
    } else if (period === "3y") {
      date.setDate(date.getDate() - i * 30);
    }

    currentPrice += (Math.random() - 0.48) * (basePrice * 0.015);

    prices.push({
      date: date.toISOString().split("T")[0],
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }

  return prices;
}

function getDataPointsForPeriod(period: string): number {
  switch (period) {
    case "1d":
      return 24;
    case "1m":
      return 30;
    case "3m":
      return 12;
    case "1y":
      return 52;
    case "3y":
      return 36;
    default:
      return 24;
  }
}
