'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  type ChartOptions,
  type Plugin,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  type TooltipItem,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChevronDown, ChevronUp, Loader2, Minus, Search, TrendingDown, TrendingUp } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

type Exchange = 'NSE' | 'BSE';

interface Stock {
  symbol: string;
  yahooSymbol?: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
}

interface ChartDataPoint {
  date: string;
  time: string;
  price: number;
  volume: number;
}

interface ExchangeDashboardData {
  exchange?: Exchange;
  indices: Stock[];
  gainers: Stock[];
  losers: Stock[];
  marketStats?: {
    todayHigh: number;
    todayLow: number;
    advances: number;
    declines: number;
    unchanged: number;
  };
  timestamp: string;
}

interface IndicesResponse {
  success: boolean;
  data?: ExchangeDashboardData;
}

interface HistoryResponse {
  success: boolean;
  data?: {
    symbol: string;
    exchange?: Exchange;
    period: string;
    prices: ChartDataPoint[];
    timestamp: string;
  };
}

interface SearchResponse {
  success: boolean;
  data?: {
    query: string;
    exchange?: Exchange;
    results: Stock[];
    timestamp: string;
  };
  error?: string;
}

interface QuoteResponse {
  success: boolean;
  data?: Stock & {
    exchange?: Exchange;
    timestamp: string;
  };
}

interface MarketStats {
  todayHigh: number;
  todayLow: number;
  advances: number;
  declines: number;
  unchanged: number;
}

interface LiveMarketSnapshot {
  indices: Stock[];
  gainers: Stock[];
  losers: Stock[];
  marketStatsByExchange: Partial<Record<Exchange, MarketStats>>;
  timestamp: string;
}

const getStockFetchSymbol = (stock: Pick<Stock, 'symbol' | 'yahooSymbol'>) => {
  return (stock.yahooSymbol ?? stock.symbol).toUpperCase();
};

const getStockKey = (stock: Pick<Stock, 'symbol' | 'yahooSymbol'>) => {
  return getStockFetchSymbol(stock);
};

const mergeUniqueStocks = (stocks: Stock[]) => {
  return Array.from(new Map(stocks.map((stock) => [getStockKey(stock), stock])).values());
};

const getStockExchange = (stock: Pick<Stock, 'symbol' | 'yahooSymbol'>): Exchange => {
  const symbol = getStockFetchSymbol(stock);
  return symbol.endsWith('.BO') ? 'BSE' : 'NSE';
};

const getStockBaseSymbol = (stock: Pick<Stock, 'symbol' | 'yahooSymbol'>) => {
  const symbol = getStockFetchSymbol(stock);
  if (symbol.endsWith('.NS') || symbol.endsWith('.BO')) {
    return symbol.replace(/\.(NS|BO)$/i, '');
  }
  return stock.symbol.toUpperCase();
};

const isNifty50Stock = (stock: Pick<Stock, 'symbol' | 'yahooSymbol' | 'name'>) => {
  const symbol = getStockFetchSymbol(stock);
  const baseSymbol = getStockBaseSymbol(stock);
  const normalizedName = stock.name.trim().toUpperCase();

  return symbol === '^NSEI' || baseSymbol === '^NSEI' || normalizedName.includes('NIFTY 50');
};

const createSeedStockFromSymbol = (symbolInput: string): Stock => {
  const yahooSymbol = symbolInput.toUpperCase();
  const symbol = yahooSymbol.replace(/\.(NS|BO)$/i, '');

  return {
    symbol,
    yahooSymbol,
    name: symbol,
    price: 0,
    change: 0,
    changePercent: 0,
    currency: 'INR',
  };
};

const mergeUniqueStocksByCompany = (stocks: Stock[]) => {
  const uniqueByCompany = new Map<string, Stock>();

  for (const stock of stocks) {
    const companyKey = getStockBaseSymbol(stock).toUpperCase();
    const existing = uniqueByCompany.get(companyKey);

    if (!existing || Math.abs(stock.changePercent) > Math.abs(existing.changePercent)) {
      uniqueByCompany.set(companyKey, stock);
    }
  }

  return Array.from(uniqueByCompany.values());
};

const SEARCH_DEBOUNCE_MS = 120;
const SEARCH_CACHE_TTL_MS = 45_000;
const SEARCH_RESULT_LIMIT = 8;
const transparentPricingItems = [
  'Account Opening Fee',
  'AMC for 1st Year',
  'Auto Square-off Charges',
  'For Call & Trade',
];

const getInstantSearchScore = (stock: Stock, query: string) => {
  const normalizedQuery = query.toUpperCase();
  const baseSymbol = getStockBaseSymbol(stock).toUpperCase();
  const yahooSymbol = getStockFetchSymbol(stock).toUpperCase();
  const name = stock.name.toUpperCase();

  if (baseSymbol === normalizedQuery || yahooSymbol === normalizedQuery) {
    return 1000;
  }

  let score = 0;

  if (baseSymbol.startsWith(normalizedQuery)) {
    score += 360;
  } else if (baseSymbol.includes(normalizedQuery)) {
    score += 200;
  }

  if (yahooSymbol.startsWith(normalizedQuery)) {
    score += 220;
  } else if (yahooSymbol.includes(normalizedQuery)) {
    score += 120;
  }

  if (name.startsWith(normalizedQuery)) {
    score += 150;
  } else if (name.includes(normalizedQuery)) {
    score += 90;
  }

  return score;
};

const findInstantSearchMatches = (pool: Stock[], query: string) => {
  const normalizedQuery = query.trim().toUpperCase();
  if (normalizedQuery.length < 2) {
    return [];
  }

  const ranked = mergeUniqueStocksByCompany(pool)
    .map((stock) => ({
      stock,
      score: getInstantSearchScore(stock, normalizedQuery),
    }))
    .filter((item) => item.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, SEARCH_RESULT_LIMIT)
    .map((item) => item.stock);

  return ranked;
};

const combineExchangeSnapshots = (
  nseData?: ExchangeDashboardData,
  bseData?: ExchangeDashboardData
): LiveMarketSnapshot => {
  const nse = nseData ?? { indices: [], gainers: [], losers: [], timestamp: "" };
  const bse = bseData ?? { indices: [], gainers: [], losers: [], timestamp: "" };

  const marketStatsByExchange: Partial<Record<Exchange, MarketStats>> = {};
  if (nse.marketStats) {
    marketStatsByExchange.NSE = nse.marketStats;
  }
  if (bse.marketStats) {
    marketStatsByExchange.BSE = bse.marketStats;
  }

  const indices = mergeUniqueStocks([...(nse.indices ?? []), ...(bse.indices ?? [])]);
  const momentumUniverse = mergeUniqueStocksByCompany([
    ...(nse.gainers ?? []),
    ...(nse.losers ?? []),
    ...(bse.gainers ?? []),
    ...(bse.losers ?? []),
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
    timestamp: nse.timestamp || bse.timestamp || new Date().toISOString(),
  };
};

const supportsExchangeToggle = (stock: Pick<Stock, 'symbol' | 'yahooSymbol'>) => {
  const symbol = getStockFetchSymbol(stock);
  return !symbol.startsWith('^') && !symbol.includes('=');
};

const withExchangeSymbol = (
  stock: Pick<Stock, 'symbol' | 'yahooSymbol'>,
  exchange: Exchange
) => {
  const symbol = getStockFetchSymbol(stock);
  const suffix = exchange === 'BSE' ? 'BO' : 'NS';

  if (symbol.endsWith('.NS') || symbol.endsWith('.BO')) {
    return symbol.replace(/\.(NS|BO)$/i, `.${suffix}`);
  }

  if (symbol.startsWith('^') || symbol.includes('=') || symbol.includes('.')) {
    return symbol;
  }

  return `${symbol}.${suffix}`;
};

interface DragRangeSelection {
  startIndex: number;
  endIndex: number;
  startLabel: string;
  endLabel: string;
  startPrice: number;
  endPrice: number;
  delta: number;
  deltaPercent: number;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

interface DragRangePluginOptions {
  onRangeChange?: (selection: DragRangeSelection | null) => void;
}

type LineChartOptionsWithDrag = ChartOptions<'line'> & {
  plugins: NonNullable<ChartOptions<'line'>['plugins']> & {
    dragRange?: DragRangePluginOptions;
  };
};

interface DragRangeState {
  pointerDown: boolean;
  startIndex: number | null;
  currentIndex: number | null;
  active: boolean;
  lastEmittedKey: string | null;
}

type LineChartWithDragRange = ChartJS<'line'> & {
  $dragRangeState?: DragRangeState;
};

const clampValue = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
};

const resolvePointValue = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (value && typeof value === 'object') {
    const candidate = (value as { y?: number }).y;
    if (typeof candidate === 'number' && Number.isFinite(candidate)) {
      return candidate;
    }
  }
  return null;
};

const ensureDragRangeState = (chart: ChartJS<'line'>): DragRangeState => {
  const chartWithState = chart as LineChartWithDragRange;
  if (!chartWithState.$dragRangeState) {
    chartWithState.$dragRangeState = {
      pointerDown: false,
      startIndex: null,
      currentIndex: null,
      active: false,
      lastEmittedKey: null,
    };
  }
  return chartWithState.$dragRangeState;
};

const resolveNearestDataIndex = (chart: ChartJS<'line'>, xPosition: number): number | null => {
  const dataLength = chart.data.datasets[0]?.data?.length ?? 0;
  if (dataLength === 0) {
    return null;
  }

  const xScale = chart.scales.x;
  const { left, right } = chart.chartArea;
  const boundedX = clampValue(xPosition, left, right);
  const rawValue = xScale.getValueForPixel(boundedX);
  const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  return clampValue(Math.round(numericValue), 0, dataLength - 1);
};

const buildDragRangeSelection = (
  chart: ChartJS<'line'>,
  startIndex: number,
  endIndex: number
): DragRangeSelection | null => {
  const datasetValues = chart.data.datasets[0]?.data ?? [];
  const labels = chart.data.labels ?? [];
  const dataLength = datasetValues.length;
  if (dataLength === 0) {
    return null;
  }

  const safeStartIndex = clampValue(startIndex, 0, dataLength - 1);
  const safeEndIndex = clampValue(endIndex, 0, dataLength - 1);
  const startPrice = resolvePointValue(datasetValues[safeStartIndex]);
  const endPrice = resolvePointValue(datasetValues[safeEndIndex]);
  if (startPrice === null || endPrice === null) {
    return null;
  }

  const xScale = chart.scales.x;
  const yScale = chart.scales.y;
  const startX = xScale.getPixelForValue(safeStartIndex);
  const endX = xScale.getPixelForValue(safeEndIndex);
  const startY = yScale.getPixelForValue(startPrice);
  const endY = yScale.getPixelForValue(endPrice);
  const delta = endPrice - startPrice;
  const deltaPercent = startPrice !== 0 ? (delta / startPrice) * 100 : 0;

  return {
    startIndex: safeStartIndex,
    endIndex: safeEndIndex,
    startLabel: String(labels[safeStartIndex] ?? ''),
    endLabel: String(labels[safeEndIndex] ?? ''),
    startPrice,
    endPrice,
    delta,
    deltaPercent,
    startX,
    endX,
    startY,
    endY,
  };
};

const emitDragRangeSelection = (
  chart: ChartJS<'line'>,
  state: DragRangeState,
  options?: DragRangePluginOptions
) => {
  if (!options?.onRangeChange) {
    return;
  }
  if (state.startIndex === null || state.currentIndex === null || !state.active) {
    if (state.lastEmittedKey !== null) {
      state.lastEmittedKey = null;
      options.onRangeChange(null);
    }
    return;
  }

  const selection = buildDragRangeSelection(chart, state.startIndex, state.currentIndex);
  if (!selection || selection.startIndex === selection.endIndex) {
    if (state.lastEmittedKey !== null) {
      state.lastEmittedKey = null;
      options.onRangeChange(null);
    }
    return;
  }

  const emissionKey = `${selection.startIndex}:${selection.endIndex}:${selection.startPrice}:${selection.endPrice}`;
  if (state.lastEmittedKey !== emissionKey) {
    state.lastEmittedKey = emissionKey;
    options.onRangeChange(selection);
  }
};

const resetDragRangeState = (
  chart: ChartJS<'line'>,
  options?: DragRangePluginOptions
) => {
  const state = ensureDragRangeState(chart);
  const hadSelection = state.active || state.startIndex !== null || state.currentIndex !== null;
  state.pointerDown = false;
  state.startIndex = null;
  state.currentIndex = null;
  state.active = false;
  state.lastEmittedKey = null;

  if (hadSelection && options?.onRangeChange) {
    options.onRangeChange(null);
  }
};

const drawSelectionHandle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(x, y, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 2.2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const dragRangePlugin: Plugin<'line'> = {
  id: 'dragRange',
  beforeEvent: (chart, args, pluginOptions) => {
    const options = pluginOptions as DragRangePluginOptions | undefined;
    const state = ensureDragRangeState(chart);
    const dataLength = chart.data.datasets[0]?.data?.length ?? 0;

    if (dataLength === 0) {
      resetDragRangeState(chart, options);
      return;
    }

    const event = args.event;
    const eventType = String(event.type);
    const nativeEvent = event.native;
    const pointerX = typeof event.x === 'number' ? event.x : null;
    const pointerY = typeof event.y === 'number' ? event.y : null;
    const { left, right, top, bottom } = chart.chartArea;
    const isInsideChart =
      pointerX !== null &&
      pointerY !== null &&
      pointerX >= left &&
      pointerX <= right &&
      pointerY >= top &&
      pointerY <= bottom;

    const markChanged = () => {
      (args as { changed?: boolean }).changed = true;
    };

    if (eventType === 'mousedown' || eventType === 'touchstart') {
      if (eventType === 'mousedown' && nativeEvent instanceof MouseEvent && nativeEvent.button !== 0) {
        return;
      }
      if (!isInsideChart || pointerX === null) {
        return;
      }
      const nearestIndex = resolveNearestDataIndex(chart, pointerX);
      if (nearestIndex === null) {
        return;
      }

      state.pointerDown = true;
      state.startIndex = nearestIndex;
      state.currentIndex = nearestIndex;
      state.active = true;
      state.lastEmittedKey = null;
      emitDragRangeSelection(chart, state, options);
      markChanged();
      return;
    }

    if ((eventType === 'mousemove' || eventType === 'touchmove') && state.pointerDown) {
      if (eventType === 'mousemove' && nativeEvent instanceof MouseEvent && (nativeEvent.buttons & 1) !== 1) {
        resetDragRangeState(chart, options);
        markChanged();
        return;
      }
      if (pointerX === null) {
        return;
      }
      const nearestIndex = resolveNearestDataIndex(chart, pointerX);
      if (nearestIndex === null) {
        return;
      }

      state.currentIndex = nearestIndex;
      state.active = state.startIndex !== null;
      emitDragRangeSelection(chart, state, options);
      markChanged();
      return;
    }

    if (
      eventType === 'mouseup' ||
      eventType === 'touchend' ||
      eventType === 'touchcancel' ||
      eventType === 'mouseout'
    ) {
      if (!state.pointerDown) {
        return;
      }

      state.pointerDown = false;
      resetDragRangeState(chart, options);
      markChanged();
    }
  },
  afterDatasetsDraw: (chart) => {
    const state = ensureDragRangeState(chart);
    if (!state.pointerDown || !state.active || state.startIndex === null || state.currentIndex === null) {
      return;
    }

    const selection = buildDragRangeSelection(chart, state.startIndex, state.currentIndex);
    if (!selection || selection.startIndex === selection.endIndex) {
      return;
    }

    const { ctx, chartArea } = chart;
    const leftX = Math.min(selection.startX, selection.endX);
    const rightX = Math.max(selection.startX, selection.endX);
    const selectionColor = selection.delta >= 0 ? '#059669' : '#dc2626';
    const areaFill = selection.delta >= 0 ? 'rgba(5, 150, 105, 0.14)' : 'rgba(220, 38, 38, 0.14)';
    const guideLine = selection.delta >= 0 ? 'rgba(5, 150, 105, 0.45)' : 'rgba(220, 38, 38, 0.45)';
    const deltaPrefix = selection.delta >= 0 ? '+' : '';
    const percentPrefix = selection.deltaPercent >= 0 ? '+' : '';
    const primaryText = `${deltaPrefix}${selection.delta.toFixed(2)} (${percentPrefix}${selection.deltaPercent.toFixed(2)}%)`;
    const secondaryText = `${selection.startLabel} - ${selection.endLabel}`;

    ctx.save();

    ctx.fillStyle = areaFill;
    ctx.fillRect(leftX, chartArea.top, rightX - leftX, chartArea.bottom - chartArea.top);

    ctx.beginPath();
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = guideLine;
    ctx.moveTo(selection.startX, chartArea.top);
    ctx.lineTo(selection.startX, chartArea.bottom);
    ctx.moveTo(selection.endX, chartArea.top);
    ctx.lineTo(selection.endX, chartArea.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    drawSelectionHandle(ctx, selection.startX, selection.startY, selectionColor);
    drawSelectionHandle(ctx, selection.endX, selection.endY, selectionColor);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.font = '700 14px "Segoe UI", sans-serif';
    const primaryWidth = ctx.measureText(primaryText).width;
    ctx.font = '500 12px "Segoe UI", sans-serif';
    const secondaryWidth = ctx.measureText(secondaryText).width;
    const labelWidth = Math.max(primaryWidth, secondaryWidth) + 26;
    const labelHeight = 56;
    const rawLabelX = (selection.startX + selection.endX) / 2 - labelWidth / 2;
    const labelX = clampValue(rawLabelX, chartArea.left + 8, chartArea.right - labelWidth - 8);
    const hasLiveTooltip = (chart.tooltip?.getActiveElements()?.length ?? 0) > 0;
    const labelY = hasLiveTooltip ? chartArea.bottom - labelHeight - 8 : chartArea.top + 8;

    drawRoundedRect(ctx, labelX, labelY, labelWidth, labelHeight, 8);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '700 14px "Segoe UI", sans-serif';
    ctx.fillStyle = selectionColor;
    ctx.fillText(primaryText, labelX + 13, labelY + 20);

    ctx.font = '500 12px "Segoe UI", sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(secondaryText, labelX + 13, labelY + 40);

    ctx.restore();
  },
};

const hoverGuidePlugin: Plugin<'line'> = {
  id: 'hover-guide',
  afterDatasetsDraw: (chart) => {
    const tooltip = chart.tooltip;
    const activeElements = tooltip?.getActiveElements() ?? [];

    if (activeElements.length === 0) {
      return;
    }

    const firstActive = activeElements[0];
    const pointElement = firstActive.element;
    const pointIndex = firstActive.index;
    const label = String(chart.data.labels?.[pointIndex] ?? '');

    const { ctx, chartArea } = chart;
    const x = pointElement.x;
    const top = chartArea.top;
    const bottom = chartArea.bottom;

    ctx.save();

    // Vertical crosshair line
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom + 26);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#2f4fa7';
    ctx.stroke();

    // Highlighted time label box at the bottom
    ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textWidth = ctx.measureText(label).width;
    const boxWidth = Math.max(56, textWidth + 18);
    const boxHeight = 28;
    const rawX = x - boxWidth / 2;
    const minX = chartArea.left;
    const maxX = chartArea.right - boxWidth;
    const clampedX = Math.max(minX, Math.min(rawX, maxX));
    const boxY = bottom + 6;

    ctx.fillStyle = '#4d5ea7';
    ctx.fillRect(clampedX, boxY, boxWidth, boxHeight);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, clampedX + boxWidth / 2, boxY + boxHeight / 2);

    ctx.restore();
  },
};

function ExchangeSwitch({
  stock,
  onSelect,
  size = 'md',
}: {
  stock: Stock;
  onSelect: (exchange: Exchange) => void;
  size?: 'sm' | 'md';
}) {
  if (!supportsExchangeToggle(stock)) {
    return null;
  }

  const activeExchange = getStockExchange(stock);
  const exchanges: Exchange[] = ['NSE', 'BSE'];
  const sizingClass =
    size === 'sm'
      ? 'px-2 py-0.5 text-[10px]'
      : 'px-2.5 py-1 text-[11px]';

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-md">
      {exchanges.map((exchange) => {
        const active = exchange === activeExchange;
        return (
          <button
            key={exchange}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(exchange);
            }}
            className={`${sizingClass} rounded font-semibold transition-colors ${
              active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {exchange}
          </button>
        );
      })}
    </div>
  );
}

export default function StockDashboard() {
  const searchParams = useSearchParams();
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [indices, setIndices] = useState<Stock[]>([]);
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [dragRangeSelection, setDragRangeSelection] = useState<DragRangeSelection | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('1d');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());
  const [marketStatsByExchange, setMarketStatsByExchange] = useState<
    Partial<Record<Exchange, MarketStats>>
  >({});
  const [activeMarketStatsExchange, setActiveMarketStatsExchange] = useState<Exchange>('NSE');

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const selectionRequestRef = useRef(0);
  const navbarSelectionRef = useRef<string | null>(null);
  const ignoreInitialNavbarQueryOnReloadRef = useRef(false);
  const hasProcessedInitialNavbarQueryRef = useRef(false);
  const searchCacheRef = useRef<Map<string, { results: Stock[]; timestamp: number }>>(new Map());
  const quickSearchPoolRef = useRef<Stock[]>([]);

  const formatPrice = (price: number, currency = 'INR') => {
    try {
      return price.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  const formatTooltipValue = (value: number) => {
    return value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const applyLiveSnapshot = (snapshot: LiveMarketSnapshot) => {
    const nextMarketStats = snapshot.marketStatsByExchange ?? {};
    const nextIndices = snapshot.indices ?? [];
    const nextGainers = snapshot.gainers ?? [];
    const nextLosers = snapshot.losers ?? [];
    const nextMarketStocks = [...nextIndices, ...nextGainers, ...nextLosers];
    const defaultReloadStock =
      nextIndices.find((stock) => isNifty50Stock(stock)) ??
      nextMarketStocks.find((stock) => isNifty50Stock(stock)) ??
      nextIndices[0] ??
      nextMarketStocks[0] ??
      null;

    setMarketStatsByExchange(nextMarketStats);
    setActiveMarketStatsExchange((previous) => {
      if (nextMarketStats[previous]) {
        return previous;
      }
      if (nextMarketStats.NSE) {
        return 'NSE';
      }
      if (nextMarketStats.BSE) {
        return 'BSE';
      }
      return previous;
    });

    setIndices(nextIndices);
    setGainers(nextGainers);
    setLosers(nextLosers);

    const snapshotTime = snapshot.timestamp ? new Date(snapshot.timestamp) : new Date();
    setLastUpdated(
      Number.isNaN(snapshotTime.getTime()) ? new Date().toLocaleTimeString() : snapshotTime.toLocaleTimeString()
    );

    setSelectedStock((previous) => {
      if (!previous) {
        return defaultReloadStock;
      }

      const previousKey = getStockKey(previous);
      const refreshed = nextMarketStocks.find((item) => getStockKey(item) === previousKey);
      return refreshed ?? previous;
    });
  };

  const selectStockForExchange = useCallback(async (
    stock: Stock,
    exchange: Exchange,
    options?: { resetPeriod?: boolean; closeSearch?: boolean }
  ) => {
    const resetPeriod = options?.resetPeriod ?? true;
    const closeSearch = options?.closeSearch ?? false;
    const baseSymbol = getStockBaseSymbol(stock);
    const yahooSymbol = withExchangeSymbol(stock, exchange);
    const requestId = Date.now();
    selectionRequestRef.current = requestId;

    if (resetPeriod) {
      setSelectedPeriod('1d');
    }

    setChartData([]);

    setSelectedStock({
      ...stock,
      symbol: baseSymbol,
      yahooSymbol,
    });

    if (closeSearch) {
      setSearchQuery('');
      setSearchResults([]);
      setSearchError(null);
      setSearchOpen(false);
    }

    try {
      const response = await fetch(
        `/api/stocks/quote?symbol=${encodeURIComponent(yahooSymbol)}&exchange=${exchange}`,
        {
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        return;
      }

      const result: QuoteResponse = await response.json();

      if (!result.success || !result.data) {
        return;
      }
      const quoteData = result.data;

      if (selectionRequestRef.current !== requestId) {
        return;
      }

      setSelectedStock((current) => {
        if (!current) {
          return {
            ...quoteData,
            symbol: quoteData.symbol ?? baseSymbol,
            yahooSymbol: quoteData.yahooSymbol ?? yahooSymbol,
          };
        }

        return {
          ...current,
          ...quoteData,
          symbol: quoteData.symbol ?? baseSymbol,
          yahooSymbol: quoteData.yahooSymbol ?? yahooSymbol,
        };
      });

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error loading stock by exchange:', error);
    }
  }, []);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const legacyNavigationType = (performance as Performance & { navigation?: { type?: number } }).navigation?.type;
    ignoreInitialNavbarQueryOnReloadRef.current =
      navigationEntry?.type === 'reload' || legacyNavigationType === 1;
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let disposed = false;
    let hasSnapshot = false;

    const fetchFallbackSnapshot = async () => {
      try {
        const [nseResponse, bseResponse] = await Promise.all([
          fetch('/api/stocks/indices?exchange=NSE', { cache: 'no-store' }),
          fetch('/api/stocks/indices?exchange=BSE', { cache: 'no-store' }),
        ]);

        const [nseResult, bseResult]: [IndicesResponse, IndicesResponse] = await Promise.all([
          nseResponse.json(),
          bseResponse.json(),
        ]);

        if (disposed) {
          return;
        }

        if ((nseResult.success && nseResult.data) || (bseResult.success && bseResult.data)) {
          applyLiveSnapshot(combineExchangeSnapshots(nseResult.data, bseResult.data));
          hasSnapshot = true;
        }
      } catch (error) {
        console.error('Error fetching fallback indices snapshot:', error);
      } finally {
        if (!disposed) {
          setLoading(false);
        }
      }
    };

    if (typeof EventSource === 'undefined') {
      void fetchFallbackSnapshot();
      return () => {
        disposed = true;
      };
    }

    eventSource = new EventSource('/api/stocks/live');
    eventSource.addEventListener('snapshot', (event) => {
      if (disposed) {
        return;
      }

      try {
        const messageEvent = event as MessageEvent<string>;
        const snapshot = JSON.parse(messageEvent.data) as LiveMarketSnapshot;
        applyLiveSnapshot(snapshot);
        hasSnapshot = true;
        setLoading(false);
      } catch (error) {
        console.error('Error parsing live stock snapshot:', error);
      }
    });

    eventSource.onerror = () => {
      if (!hasSnapshot && !disposed) {
        void fetchFallbackSnapshot();
      }
    };

    return () => {
      disposed = true;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const selectedStockKey = selectedStock ? getStockKey(selectedStock) : '';

  useEffect(() => {
    if (!selectedStockKey) return;

    const fetchChartData = async () => {
      setUpdating(true);
      try {
        const exchange: Exchange = selectedStockKey.endsWith('.BO') ? 'BSE' : 'NSE';
        const response = await fetch(
          `/api/stocks/history?symbol=${encodeURIComponent(selectedStockKey)}&period=${selectedPeriod}&exchange=${exchange}`,
          {
            cache: 'no-store',
          }
        );
        const result: HistoryResponse = await response.json();

        if (result.success && result.data) {
          setChartData(result.data.prices);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setUpdating(false);
      }
    };

    fetchChartData();
  }, [selectedStockKey, selectedPeriod]);

  const clearDragSelection = useCallback(() => {
    const chart = chartRef.current;
    if (!chart) {
      setDragRangeSelection(null);
      return;
    }
    resetDragRangeState(chart, { onRangeChange: setDragRangeSelection });
    chart.draw();
  }, []);

  useEffect(() => {
    clearDragSelection();
  }, [selectedStockKey, selectedPeriod, clearDragSelection]);

  useEffect(() => {
    quickSearchPoolRef.current = mergeUniqueStocksByCompany([
      ...indices,
      ...gainers,
      ...losers,
      ...(selectedStock ? [selectedStock] : []),
    ]);
  }, [indices, gainers, losers, selectedStock]);

  const navbarStockSymbol = searchParams.get('stock')?.trim().toUpperCase() ?? '';
  const navbarExchangeParam = searchParams.get('exchange')?.trim().toUpperCase() ?? '';
  const navbarExchange: Exchange = navbarExchangeParam === 'BSE' ? 'BSE' : 'NSE';

  useEffect(() => {
    if (!navbarStockSymbol) {
      hasProcessedInitialNavbarQueryRef.current = true;
      return;
    }

    const requestKey = `${navbarExchange}:${navbarStockSymbol}`;
    if (!hasProcessedInitialNavbarQueryRef.current) {
      hasProcessedInitialNavbarQueryRef.current = true;
      if (ignoreInitialNavbarQueryOnReloadRef.current) {
        navbarSelectionRef.current = requestKey;
        return;
      }
    }

    if (navbarSelectionRef.current === requestKey) {
      return;
    }
    navbarSelectionRef.current = requestKey;

    const baseSymbol = navbarStockSymbol.replace(/\.(NS|BO)$/i, '');
    const marketUniverse = mergeUniqueStocks([
      ...indices,
      ...gainers,
      ...losers,
      ...searchResults,
    ]);
    const existingStock =
      marketUniverse.find((stock) => getStockFetchSymbol(stock) === navbarStockSymbol) ??
      marketUniverse.find((stock) => getStockBaseSymbol(stock) === baseSymbol);

    void selectStockForExchange(existingStock ?? createSeedStockFromSymbol(navbarStockSymbol), navbarExchange, {
      resetPeriod: true,
      closeSearch: true,
    });
  }, [navbarStockSymbol, navbarExchange, indices, gainers, losers, searchResults, selectStockForExchange]);

  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      setSearchResults([]);
      setSearching(false);
      setSearchError(null);
      return;
    }

    const searchExchange: Exchange = 'NSE';
    const cacheKey = `${searchExchange}:${query.toUpperCase()}`;
    const now = Date.now();
    const instantMatches = findInstantSearchMatches(quickSearchPoolRef.current, query);

    if (instantMatches.length > 0) {
      setSearchResults(instantMatches);
      setSearchError(null);
    }

    const cachedEntry = searchCacheRef.current.get(cacheKey);
    if (cachedEntry) {
      setSearchResults(cachedEntry.results);
      if (cachedEntry.results.length > 0) {
        setSearchError(null);
      }
    }

    if (cachedEntry && now - cachedEntry.timestamp < SEARCH_CACHE_TTL_MS) {
      setSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setSearching(true);
      setSearchError(null);

      try {
        const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}&exchange=${searchExchange}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        const result: SearchResponse = await response.json();

        if (result.success && result.data) {
          const dedupedByBase = Array.from(
            new Map(
              (result.data.results ?? []).map((stock) => [getStockBaseSymbol(stock), stock])
            ).values()
          );
          const finalResults =
            dedupedByBase.length > 0
              ? dedupedByBase.slice(0, SEARCH_RESULT_LIMIT)
              : instantMatches.slice(0, SEARCH_RESULT_LIMIT);

          setSearchResults(finalResults);
          searchCacheRef.current.set(cacheKey, {
            results: finalResults,
            timestamp: Date.now(),
          });

          if (finalResults.length === 0) {
            setSearchError('No stocks found for this search.');
          } else {
            setSearchError(null);
          }

          return;
        }

        if (instantMatches.length > 0) {
          setSearchResults(instantMatches.slice(0, SEARCH_RESULT_LIMIT));
          setSearchError(null);
          return;
        }

        setSearchResults([]);
        setSearchError(result.error ?? 'Search is temporarily unavailable.');
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error('Error searching stocks:', error);
        if (instantMatches.length > 0) {
          setSearchResults(instantMatches.slice(0, SEARCH_RESULT_LIMIT));
          setSearchError(null);
        } else {
          setSearchResults([]);
          setSearchError('Search is temporarily unavailable.');
        }
      } finally {
        setSearching(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchContainerRef.current) {
        return;
      }

      if (!searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const prepareChartData = () => {
    if (chartData.length === 0) return null;

    const labels =
      selectedPeriod === '1d' ? chartData.map((point) => point.time) : chartData.map((point) => point.date);
    const prices = chartData.map((point) => point.price);

    return {
      labels,
      datasets: [
        {
          label: `${selectedStock?.name} Price`,
          data: prices,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHitRadius: 24,
          pointHoverRadius: 0,
          pointBackgroundColor: '#2563eb',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  const StockCard = ({ stock }: { stock: Stock }) => {
    const isPositive = stock.changePercent >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const isSelected = selectedStock ? getStockKey(selectedStock) === getStockKey(stock) : false;

    return (
      <div
        onClick={() => {
          void selectStockForExchange(stock, getStockExchange(stock), { resetPeriod: true });
        }}
        className={`p-4 rounded-lg border cursor-pointer transition-all ${
          isSelected ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:border-blue-300'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-semibold text-gray-800">{stock.name}</p>
            <p className="text-xs text-gray-500">{getStockBaseSymbol(stock)}</p>
          </div>
          <Icon className={`w-5 h-5 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        </div>

        <div className="mb-2">
          <ExchangeSwitch
            stock={stock}
            size="sm"
            onSelect={(exchange) => {
              void selectStockForExchange(stock, exchange, { resetPeriod: true });
            }}
          />
        </div>

        <div className="flex justify-between items-end">
          <p className="text-lg font-bold text-gray-900">{formatPrice(stock.price, stock.currency)}</p>
          <div className="text-right">
            <p className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? '+' : ''}
              {stock.change.toFixed(2)}
            </p>
            <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}
              {stock.changePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-gray-200 p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  const preparedChartData = prepareChartData();
  const activeMarketStats =
    marketStatsByExchange[activeMarketStatsExchange] ??
    marketStatsByExchange.NSE ??
    marketStatsByExchange.BSE ??
    {
      todayHigh: 0,
      todayLow: 0,
      advances: 0,
      declines: 0,
      unchanged: 0,
    };

  const chartOptions: LineChartOptionsWithDrag = {
    responsive: true,
    maintainAspectRatio: true,
    events: ['mousemove', 'mouseout', 'click', 'mousedown', 'mouseup', 'touchstart', 'touchmove', 'touchend', 'touchcancel'],
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#ffffff',
        borderColor: '#97b83f',
        borderWidth: 1,
        displayColors: false,
        titleColor: '#111827',
        bodyColor: '#111827',
        padding: 6,
        cornerRadius: 0,
        caretSize: 6,
        caretPadding: 2,
        titleFont: { size: 0 },
        bodyFont: { size: 16, weight: 500 },
        callbacks: {
          title: () => '',
          label: (context: TooltipItem<'line'>) => {
            return formatTooltipValue(context.parsed.y);
          },
        },
      },
      dragRange: {
        onRangeChange: setDragRangeSelection,
      },
    },
    scales: {
      y: {
        display: true,
        beginAtZero: false,
        ticks: {
          callback: (value: string | number) =>
            formatPrice(typeof value === 'number' ? value : Number(value), selectedStock?.currency ?? 'INR'),
          font: { size: 11 },
          color: '#999',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        display: true,
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          font: { size: 10 },
          color: '#999',
          maxTicksLimit: 8,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-none xl:-mx-6 2xl:-mx-8 bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl border border-gray-200 p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6 relative" ref={searchContainerRef}>
              <label htmlFor="stock-search-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Search Stock or Company
              </label>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="stock-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search by symbol or company name (e.g. TCS, Reliance)"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                {searching && (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {searchOpen && (searchQuery.trim().length >= 2 || searchError) && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {searching && (
                    <p className="px-4 py-3 text-sm text-gray-600">Searching market data...</p>
                  )}

                  {!searching && searchResults.length > 0 && (
                    <div className="max-h-72 overflow-y-auto">
                      {searchResults.map((stock) => (
                        <div
                          key={getStockBaseSymbol(stock)}
                          className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              void selectStockForExchange(stock, getStockExchange(stock), {
                                resetPeriod: true,
                                closeSearch: true,
                              });
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
                                    stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                                  }`}
                                >
                                  {stock.changePercent >= 0 ? '+' : ''}
                                  {stock.changePercent.toFixed(2)}%
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {!searching && searchResults.length === 0 && searchQuery.trim().length >= 2 && (
                    <p className="px-4 py-3 text-sm text-gray-600">
                      {searchError ?? 'No stocks found for this search.'}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                {selectedStock && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStock.name}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <p className="text-xs text-gray-500">{getStockBaseSymbol(selectedStock)}</p>
                      <ExchangeSwitch
                        stock={selectedStock}
                        onSelect={(exchange) => {
                          void selectStockForExchange(selectedStock, exchange, { resetPeriod: false });
                        }}
                      />
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {formatPrice(selectedStock.price, selectedStock.currency)}
                    </p>
                    <p
                      className={`text-lg mt-1 ${
                        selectedStock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {selectedStock.change >= 0 ? '+' : ''}
                      {selectedStock.change.toFixed(2)} (
                      {selectedStock.changePercent >= 0 ? '+' : ''}
                      {selectedStock.changePercent.toFixed(2)}%)
                    </p>
                  </>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-2">Last updated: {lastUpdated}</p>
                {updating && <p className="text-xs text-blue-600 font-semibold">Updating...</p>}
              </div>
            </div>

            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
              {['1d', '1m', '3m', '1y', '3y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                    selectedPeriod === period ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-gray-500">Drag on the chart to compare any two points in real time.</p>
              {dragRangeSelection && (
                <button
                  type="button"
                  onClick={clearDragSelection}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Clear selection
                </button>
              )}
            </div>

            {dragRangeSelection && (
              <p
                className={`mb-4 text-sm font-semibold ${
                  dragRangeSelection.delta >= 0 ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                Move: {dragRangeSelection.delta >= 0 ? '+' : ''}
                {dragRangeSelection.delta.toFixed(2)} ({dragRangeSelection.deltaPercent >= 0 ? '+' : ''}
                {dragRangeSelection.deltaPercent.toFixed(2)}%) from {dragRangeSelection.startLabel} to{' '}
                {dragRangeSelection.endLabel}
              </p>
            )}

            <div className="relative h-80">
              {preparedChartData ? (
                <Line
                  ref={chartRef}
                  data={preparedChartData}
                  options={chartOptions}
                  plugins={[hoverGuidePlugin, dragRangePlugin]}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Loading chart data...
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Market Indices (NSE & BSE)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {indices.map((index) => (
                <StockCard key={index.yahooSymbol ?? index.symbol} stock={index} />
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500">
                    Market Breadth
                  </p>
                  <p className="text-sm text-slate-700 mt-1">Latest Snapshot</p>
                </div>

                <div className="inline-flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
                  {(['NSE', 'BSE'] as Exchange[]).map((exchange) => (
                    <button
                      key={exchange}
                      type="button"
                      onClick={() => setActiveMarketStatsExchange(exchange)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        activeMarketStatsExchange === exchange
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {exchange}
                    </button>
                  ))}
                </div>
              </div>

	              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 p-4">
	                <div className="rounded-xl border border-green-200 bg-green-50/70 px-3 py-3 min-w-0 h-full flex flex-col justify-between">
	                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Today&apos;s High</p>
	                  <p className="mt-2 font-bold text-slate-900 tabular-nums leading-tight whitespace-nowrap text-[clamp(1.1rem,1.5vw,1.6rem)]">
	                    {formatPrice(activeMarketStats.todayHigh, 'INR')}
                  </p>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50/70 px-3 py-3 min-w-0 h-full flex flex-col justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Today&apos;s Low</p>
                  <p className="mt-2 font-bold text-slate-900 tabular-nums leading-tight whitespace-nowrap text-[clamp(1.1rem,1.5vw,1.6rem)]">
                    {formatPrice(activeMarketStats.todayLow, 'INR')}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-3 min-w-0 h-full flex flex-col justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Advances</p>
                  <p className="mt-2 font-bold text-slate-900 tabular-nums leading-tight whitespace-nowrap text-[clamp(1.2rem,1.7vw,1.75rem)] flex items-center gap-1.5">
                    <ChevronUp className="h-5 w-5 text-emerald-600 shrink-0" />
                    {activeMarketStats.advances.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-3 min-w-0 h-full flex flex-col justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Declines</p>
                  <p className="mt-2 font-bold text-slate-900 tabular-nums leading-tight whitespace-nowrap text-[clamp(1.2rem,1.7vw,1.75rem)] flex items-center gap-1.5">
                    <ChevronDown className="h-5 w-5 text-rose-600 shrink-0" />
                    {activeMarketStats.declines.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-3 min-w-0 h-full flex flex-col justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Unchanged</p>
                  <p className="mt-2 font-bold text-slate-900 tabular-nums leading-tight whitespace-nowrap text-[clamp(1.2rem,1.7vw,1.75rem)] flex items-center gap-1.5">
                    <Minus className="h-5 w-5 text-sky-600 shrink-0" />
                    {activeMarketStats.unchanged.toLocaleString('en-IN')}
	                  </p>
	                </div>
	              </div>

	              <div className="border-t border-slate-200 bg-slate-50/80 px-4 py-4 md:px-5 md:py-5">
	                <h4 className="text-center text-xl md:text-2xl font-black tracking-tight text-slate-900">
	                  Transparent, Zero Hidden Charges
	                </h4>
	                <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
	                  {transparentPricingItems.map((item) => (
	                    <div
	                      key={item}
	                      className="rounded-xl border border-slate-200 bg-white px-2 py-4 text-center shadow-sm"
	                    >
	                      <p className="leading-none text-emerald-500">
	                        <span className="relative -top-1 text-lg font-bold">&#8377;</span>
	                        <span className="text-4xl md:text-5xl font-black">0</span>
	                      </p>
	                      <p className="mt-2 text-xs md:text-sm font-semibold text-slate-900 leading-tight">{item}</p>
	                    </div>
	                  ))}
	                </div>
	                <p className="mt-3 text-center text-sm text-slate-500">
	                  Get more value with our competitive pricing.
	                </p>
	              </div>
	            </div>
	          </div>
	        </div>

        <div className="space-y-8 lg:col-span-4 xl:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Top Gainers
            </h3>
            <div className="space-y-3">
              {gainers.map((stock, index) => {
                const isSelected = selectedStock ? getStockKey(selectedStock) === getStockKey(stock) : false;
                return (
                  <div
                    key={stock.yahooSymbol ?? `${stock.symbol}-${index}`}
                    onClick={() => {
                      void selectStockForExchange(stock, getStockExchange(stock), { resetPeriod: true });
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{stock.name}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <p className="text-xs text-gray-500">{getStockBaseSymbol(stock)}</p>
                          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                            {getStockExchange(stock)}
                          </span>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <p className="text-sm font-bold text-gray-900">{formatPrice(stock.price, stock.currency)}</p>
                      <p
                        className={`text-sm font-semibold ${
                          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stock.changePercent >= 0 ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Top Losers
            </h3>
            <div className="space-y-3">
              {losers.map((stock, index) => {
                const isSelected = selectedStock ? getStockKey(selectedStock) === getStockKey(stock) : false;
                return (
                  <div
                    key={stock.yahooSymbol ?? `${stock.symbol}-${index}`}
                    onClick={() => {
                      void selectStockForExchange(stock, getStockExchange(stock), { resetPeriod: true });
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{stock.name}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <p className="text-xs text-gray-500">{getStockBaseSymbol(stock)}</p>
                          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                            {getStockExchange(stock)}
                          </span>
                        </div>
                      </div>
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <p className="text-sm font-bold text-gray-900">{formatPrice(stock.price, stock.currency)}</p>
                      <p
                        className={`text-sm font-semibold ${
                          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stock.changePercent >= 0 ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

