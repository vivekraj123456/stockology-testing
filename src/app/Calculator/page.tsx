"use client";

import { useState, useEffect } from "react";

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
  shortname: string;
  longname: string;
  exchDisp: string;
  quoteType: string;
  price?: number;
}

const CalculatorSection = () => {
  const [tradeType, setTradeType] = useState<"intraday" | "delivery">(
    "intraday"
  );
  const [quantity, setQuantity] = useState<string>("1");
  const [buyPrice, setBuyPrice] = useState<string>("3025.70");
  const [sellPrice, setSellPrice] = useState<string>("3026.80");
  const [brokerageRate, setBrokerageRate] = useState<string>("0.03");
  
  // Stock search states
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StockResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedStockData, setSelectedStockData] = useState<StockResult | null>(null);
  const [currentStockPrice, setCurrentStockPrice] = useState<number | null>(null);
  // Google Sheet derived stocks
  const [sheetStocks, setSheetStocks] = useState<StockResult[]>([]);

  // Stock search function - only uses Google Sheet data
  const searchStocks = (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Filter from Google Sheet data
    const filtered = sheetStocks.filter((stock) => {
      const q = query.toLowerCase();
      return (
        (stock.shortname && stock.shortname.toLowerCase().includes(q)) ||
        (stock.longname && stock.longname.toLowerCase().includes(q)) ||
        (stock.symbol && stock.symbol.toLowerCase().includes(q))
      );
    });
    
    setSearchResults(filtered);
    setShowResults(true);
    setIsSearching(false);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear selected stock when user types
    if (query !== selectedStock) {
      setSelectedStock("");
    }
    
    searchStocks(query);
  };

  // Get stock price from Google Sheet data
  const getStockPrice = (stock: StockResult): number => {
    // Price is stored in the stock object from sheet
    return stock.price || 0;
  };

  // Handle stock selection
  const handleStockSelect = (stock: StockResult) => {
    const stockName = `${stock.shortname || stock.longname}`;
    setSelectedStock(stockName);
    setSearchQuery(stockName);
    setSelectedStockData(stock);
    setShowResults(false);

    // Get price from sheet and update buy/sell prices
    const price = getStockPrice(stock);
    if (price > 0) {
      setCurrentStockPrice(price);
      setBuyPrice(price.toFixed(2));
      setSellPrice((price + 1).toFixed(2));
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.stock-search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set default stock from sheet when data loads
  useEffect(() => {
    if (sheetStocks.length > 0 && !selectedStockData) {
      const firstStock = sheetStocks[0];
      setSelectedStockData(firstStock);
      setSelectedStock(firstStock.shortname);
      setSearchQuery(firstStock.shortname);
      
      const price = firstStock.price || 0;
      if (price > 0) {
        setCurrentStockPrice(price);
        setBuyPrice(price.toFixed(2));
        setSellPrice((price + 1).toFixed(2));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetStocks]);

  // Load company list from Google Sheets (first sheet) via Google Visualization API
  useEffect(() => {
    const SHEET_ID = '14MZurSHSss8d2SZd1Fh12E2FZKQ9pFF5ln0-c6VUHhk';
    // If the sheet is publicly accessible (Anyone with link can view), this works without API key
    const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

    const parseGvizJson = (text: string) => {
      // text is like: "/*O_o*/\ngoogle.visualization.Query.setResponse({...});"
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start === -1 || end === -1) return null;
      try {
        return JSON.parse(text.substring(start, end + 1));
      } catch {
        return null;
      }
    };

    const normalizeRowToStock = (rowObj: Record<string, string | number | null>): StockResult | null => {
      // Map exact columns from your Google Sheet:
      // Column A: "Comany symbols" (ticker)
      // Column B: Full NSE symbol (e.g., "NSE:20MICRONS")
      // Column C: "Company name" (full name)
      // Column D: "price"
      
      const companyNameRaw = rowObj['Company name'] || rowObj['company name'] || rowObj['C'];
      const shortSymbolRaw = rowObj['Comany symbols'] || rowObj['comany symbols'] || rowObj['A'];
      const fullSymbol = rowObj['B']; // NSE:SYMBOL format
      const price = rowObj['price'] || rowObj['D'];

      if (!companyNameRaw || !shortSymbolRaw) return null;

      const companyName = String(companyNameRaw);
      const shortSymbol = String(shortSymbolRaw);

      // Extract exchange from column B if available (e.g., "NSE:20MICRONS" -> "NSE")
      let exchange = 'NSE';
      let cleanSymbol = shortSymbol;
      if (fullSymbol && typeof fullSymbol === 'string') {
        const parts = fullSymbol.split(':');
        if (parts.length === 2) {
          exchange = parts[0]; // "NSE"
          cleanSymbol = parts[1]; // "20MICRONS"
        }
      }

      return {
        symbol: `${cleanSymbol}.NS`,
        shortname: companyName,
        longname: companyName,
        exchDisp: exchange,
        quoteType: 'EQUITY',
        price: typeof price === 'number' ? price : parseFloat(String(price)) || 0,
      };
    };

    const loadSheet = async () => {
      try {
        const res = await fetch(GVIZ_URL);
        const text = await res.text();
        const json = parseGvizJson(text);
        if (!json || !json.table) return;
        const cols: string[] = (json.table.cols || []).map((c: { label?: string; id?: string }) => c.label || c.id || '');
        const rows: Array<{ c?: Array<{ v: string | number | null } | null> }> = (json.table.rows || []);
        const mapped: StockResult[] = [];
        for (const r of rows) {
          const obj: Record<string, string | number | null> = {};
          const cells = r.c || [];
          cols.forEach((label: string, idx: number) => {
            const cell = cells[idx];
            obj[label] = cell ? cell.v : null;
          });
          const st = normalizeRowToStock(obj);
          if (st) mapped.push(st);
        }
        // Deduplicate by symbol + name
        const seen = new Set<string>();
        const unique = mapped.filter((s) => {
          const key = `${s.symbol}|${s.shortname}`.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setSheetStocks(unique);
      } catch {
        // Silent fail; UI will fall back to empty list
        console.warn('Failed to load Google Sheet');
      }
    };

    loadSheet();
  }, []);

  const calculateCharges = (): CalculationResult => {
    const qty = parseFloat(quantity) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const rate = parseFloat(brokerageRate) || 0;

    // Turnover
    const turnover = (buy + sell) * qty;

    // Brokerage
    const brokerage = (buy * qty * rate) / 100 + (sell * qty * rate) / 100;

    // STT/CTT
    const sttCtt =
      tradeType === "intraday"
        ? (sell * qty * 0.025) / 100 // 0.025% of Sell Value for Intraday
        : ((buy + sell) * qty * 0.1) / 100; // 0.1% of Both Buy + Sell Value for Delivery

    // Transaction Charges (0.00325% of Turnover)
    const transactionCharges = (turnover * 0.00297) / 100;

    // Clearing Charges (Flat ₹0.01)
    const clearingCharges = 0.02;

    // GST (18% of Brokerage + Transaction Charges + Clearing Charges)
    const gst = ((brokerage + transactionCharges + clearingCharges) * 18) / 100;

    // Stamp Duty (0.003% of Buy Value)
    const stampDuty = (buy * qty * 0.002) / 100;

    // SEBI Turnover Fees (0.0001% of Turnover)
    const sebiFees = (turnover * 0.00015) / 100;

    // Total Taxes & Charges
    const totalCharges =
      brokerage +
      sttCtt +
      transactionCharges +
      clearingCharges +
      gst +
      stampDuty +
      sebiFees;

    // Net Values
    const netBuyValue = buy * qty;
    const netSellValue = sell * qty;

    // Net P&L
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

  const result = calculateCharges();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Stock Brokerage Calculator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Inputs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Trade Type Tabs */}
              <div className="flex mb-6">
                <button
                  onClick={() => setTradeType("intraday")}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
                    tradeType === "intraday"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Intraday
                </button>
                <button
                  onClick={() => setTradeType("delivery")}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
                    tradeType === "delivery"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Delivery
                </button>
              </div>

              {/* Stock Information Display */}
              {selectedStockData && currentStockPrice && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedStockData.shortname}</h3>
                      <p className="text-sm text-gray-600">{selectedStockData.symbol}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                        {selectedStockData.exchDisp}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        ₹{currentStockPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Search */}
              <div className="mb-6 relative stock-search-container">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Stock
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search for stocks (e.g. TCS, SBI, Reliance)"
                  />
                  <div className="absolute right-3 top-3">
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-400"
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

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((stock, index) => (
                      <div
                        key={`${stock.symbol}-${index}`}
                        onClick={() => handleStockSelect(stock)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {stock.shortname || stock.longname}
                            </div>
                            <div className="text-sm text-gray-500">
                              {stock.symbol}
                            </div>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {stock.exchDisp === "Bombay" ? "BSE" : stock.exchDisp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showResults && searchResults.length === 0 && searchQuery.length >= 2 && !isSearching && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <div className="text-center text-gray-500">
                      No stocks found. Try searching with a different term.
                    </div>
                  </div>
                )}
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buy Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => {
                        const newBuyPrice = e.target.value;
                        setBuyPrice(newBuyPrice);
                        // Auto-update sell price to be ₹1 more
                        if (newBuyPrice && !isNaN(parseFloat(newBuyPrice))) {
                          setSellPrice((parseFloat(newBuyPrice) + 1).toFixed(2));
                        }
                      }}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sell Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brokerage Rate
                  </label>
                  <input
                    type="number"
                    value={brokerageRate}
                    onChange={(e) => setBrokerageRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.03"
                    step="0.01"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                Calculate Brokerage
              </button>
            </div>

            {/* Right Panel - Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Breakdown
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Turnover:</span>
                  <span className="font-medium">
                    ₹{result.turnover.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Brokerage:</span>
                  <span className="font-medium">
                    ₹{result.brokerage.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">STT/CTT:</span>
                  <span className="font-medium">
                    ₹{result.sttCtt.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Transaction Charges:</span>
                  <span className="font-medium">
                    ₹{result.transactionCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Clearing Charges:</span>
                  <span className="font-medium">
                    ₹{result.clearingCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">GST:</span>
                  <span className="font-medium">₹{result.gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">State Stamp Duty:</span>
                  <span className="font-medium">
                    ₹{result.stampDuty.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">SEBI Turnover Fees:</span>
                  <span className="font-medium">
                    ₹{result.sebiFees.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-t-2 border-gray-300 bg-gray-50 -mx-6 px-6">
                  <span className="font-semibold text-gray-800">
                    TOTAL TAXES & CHARGES:
                  </span>
                  <span className="font-bold text-gray-800">
                    ₹{result.totalCharges.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Buy Value:</span>
                  <span className="font-medium">
                    ₹{result.netBuyValue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Net Sell Value:</span>
                  <span className="font-medium">
                    ₹{result.netSellValue.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-t-2 border-gray-300 bg-gray-50 -mx-6 px-6">
                  <span className="font-semibold text-gray-800">Net P&L:</span>
                  <span
                    className={`font-bold ${
                      result.netPL >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{result.netPL.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSection;
