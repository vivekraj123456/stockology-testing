import { fetchExchangeDashboard } from "@/lib/stocks/dashboard";
import { normalizeExchange } from "@/lib/stocks/yahoo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exchange = normalizeExchange(searchParams.get("exchange"));

  const data = await fetchExchangeDashboard(exchange);

  return Response.json(
    {
      success: true,
      data,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json",
      },
    }
  );
}
