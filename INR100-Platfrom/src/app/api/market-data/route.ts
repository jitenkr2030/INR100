import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Mock market data service - In production, use Alpha Vantage, IEX Cloud, or Yahoo Finance API
class MarketDataService {
  private static instance: MarketDataService;
  
  private constructor() {}
  
  public static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }

  // Mock stock data - Replace with real API calls in production
  private getMockStockData(symbol: string) {
    const basePrices: { [key: string]: number } = {
      'RELIANCE': 2500,
      'TCS': 3200,
      'HDFCBANK': 1600,
      'INFY': 1400,
      'ITC': 450,
      'BHARTIARTL': 800,
      'LT': 2800,
      'SBIN': 600,
      'ASIANPAINT': 2800,
      'KOTAKBANK': 1750
    };

    const basePrice = basePrices[symbol] || 1000;
    const change = (Math.random() - 0.5) * 0.1; // ±5% random change
    const currentPrice = basePrice * (1 + change);
    const previousClose = basePrice;
    const changeAmount = currentPrice - previousClose;
    const changePercent = (changeAmount / previousClose) * 100;

    return {
      symbol,
      name: symbol,
      price: Math.round(currentPrice * 100) / 100,
      previousClose: previousClose,
      change: Math.round(changeAmount * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      dayHigh: Math.round(currentPrice * 1.05 * 100) / 100,
      dayLow: Math.round(currentPrice * 0.95 * 100) / 100,
      fiftyTwoWeekHigh: Math.round(basePrice * 1.3 * 100) / 100,
      fiftyTwoWeekLow: Math.round(basePrice * 0.7 * 100) / 100,
      marketCap: Math.floor(Math.random() * 1000000000000) + 500000000000,
      pe: Math.round((Math.random() * 30 + 10) * 100) / 100,
      updatedAt: new Date().toISOString()
    };
  }

  // Mock index data
  private getMockIndexData() {
    const indices = [
      { symbol: 'NIFTY', name: 'NIFTY 50', value: 20000 + Math.random() * 1000 },
      { symbol: 'SENSEX', name: 'BSE SENSEX', value: 67000 + Math.random() * 2000 },
      { symbol: 'BANKNIFTY', name: 'BANK NIFTY', value: 45000 + Math.random() * 1000 },
      { symbol: 'NIFTYIT', name: 'NIFTY IT', value: 32000 + Math.random() * 800 }
    ];

    return indices.map(index => ({
      ...index,
      change: Math.round((Math.random() - 0.5) * 200 * 100) / 100,
      changePercent: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
      updatedAt: new Date().toISOString()
    }));
  }

  // Mock mutual fund data
  private getMockMFData() {
    const mfs = [
      { symbol: 'AXISBLUECHIP', name: 'Axis Bluechip Fund', category: 'Large Cap' },
      { symbol: 'MIRAEASSET', name: 'Mirae Asset Large Cap', category: 'Large Cap' },
      { symbol: 'SBI', name: 'SBI Small Cap Fund', category: 'Small Cap' },
      { symbol: 'DSP', name: 'DSP Mid Cap Fund', category: 'Mid Cap' }
    ];

    return mfs.map(mf => ({
      ...mf,
      nav: Math.round((20 + Math.random() * 80) * 1000) / 1000,
      change: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
      changePercent: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
      aum: Math.floor(Math.random() * 50000) + 5000,
      expenseRatio: Math.round((Math.random() * 2 + 0.5) * 100) / 100,
      updatedAt: new Date().toISOString()
    }));
  }

  public async getStockData(symbols: string[]) {
    // In production, this would call a real market data API
    const promises = symbols.map(symbol => 
      new Promise(resolve => {
        setTimeout(() => {
          resolve(this.getMockStockData(symbol));
        }, Math.random() * 100); // Simulate API delay
      })
    );
    
    return Promise.all(promises);
  }

  public async getIndices() {
    return this.getMockIndexData();
  }

  public async getMutualFunds() {
    return this.getMockMFData();
  }

  public async getGoldPrice() {
    return {
      symbol: 'GOLD',
      name: 'Digital Gold',
      price: 6200 + Math.random() * 200,
      change: Math.round((Math.random() - 0.5) * 50 * 100) / 100,
      changePercent: Math.round((Math.random() - 0.5) * 2 * 100) / 100,
      unit: '1 gram',
      updatedAt: new Date().toISOString()
    };
  }

  public async getGlobalIndices() {
    return [
      { symbol: 'SPX', name: 'S&P 500', value: 4500 + Math.random() * 100 },
      { symbol: 'NDX', name: 'NASDAQ 100', value: 15000 + Math.random() * 300 },
      { symbol: 'FTSE', name: 'FTSE 100', value: 7500 + Math.random() * 150 },
      { symbol: 'DAX', name: 'DAX', value: 16000 + Math.random() * 200 }
    ].map(index => ({
      ...index,
      change: Math.round((Math.random() - 0.5) * 100 * 100) / 100,
      changePercent: Math.round((Math.random() - 0.5) * 1.5 * 100) / 100,
      updatedAt: new Date().toISOString()
    }));
  }

  public async getTopGainers() {
    const stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'BHARTIARTL', 'LT', 'SBIN'];
    return stocks.slice(0, 5).map(symbol => this.getMockStockData(symbol));
  }

  public async getTopLosers() {
    const stocks = ['ASIANPAINT', 'KOTAKBANK', 'MARUTI', 'HCLTECH', 'TATAMOTORS'];
    return stocks.slice(0, 5).map(symbol => this.getMockStockData(symbol));
  }

  public async getMostActive() {
    const stocks = ['RELIANCE', 'TCS', 'INFY', 'SBIN', 'TATAMOTORS'];
    return stocks.slice(0, 5).map(symbol => this.getMockStockData(symbol));
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const symbols = searchParams.get("symbols")?.split(",") || [];

    const marketData = MarketDataService.getInstance();

    switch (type) {
      case "stocks":
        if (symbols.length === 0) {
          return NextResponse.json(
            { error: "Stock symbols are required" },
            { status: 400 }
          );
        }
        const stockData = await marketData.getStockData(symbols);
        return NextResponse.json({ success: true, data: stockData });

      case "indices":
        const indexData = await marketData.getIndices();
        return NextResponse.json({ success: true, data: indexData });

      case "mutualfunds":
        const mfData = await marketData.getMutualFunds();
        return NextResponse.json({ success: true, data: mfData });

      case "gold":
        const goldData = await marketData.getGoldPrice();
        return NextResponse.json({ success: true, data: goldData });

      case "global":
        const globalData = await marketData.getGlobalIndices();
        return NextResponse.json({ success: true, data: globalData });

      case "gainers":
        const gainersData = await marketData.getTopGainers();
        return NextResponse.json({ success: true, data: gainersData });

      case "losers":
        const losersData = await marketData.getTopLosers();
        return NextResponse.json({ success: true, data: losersData });

      case "active":
        const activeData = await marketData.getMostActive();
        return NextResponse.json({ success: true, data: activeData });

      default:
        // Return all market data
        const [stockData, indexData, mfData, goldData, globalData, gainersData] = await Promise.all([
          marketData.getStockData(['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC']),
          marketData.getIndices(),
          marketData.getMutualFunds(),
          marketData.getGoldPrice(),
          marketData.getGlobalIndices(),
          marketData.getTopGainers()
        ]);

        return NextResponse.json({
          success: true,
          data: {
            stocks: stockData,
            indices: indexData,
            mutualFunds: mfData,
            gold: goldData,
            global: globalData,
            gainers: gainersData,
            updatedAt: new Date().toISOString()
          }
        });
    }

  } catch (error) {
    console.error("Market data error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}