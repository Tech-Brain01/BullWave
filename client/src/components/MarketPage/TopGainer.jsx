import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Add useLocation import
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { TrendingUp, ArrowRight, Star, BarChart3 } from "lucide-react";

const TopGainer = ({ isFullPage = false, showHeader = true }) => {
  const location = useLocation(); // Add this hook
  
  const topGainers = [
    {
      symbol: "ADANIENT",
      name: "Adani Enterprises Ltd.",
      price: 2156.75,
      change: 168.45,
      changePercent: 8.47,
      volume: "945K",
      marketCap: "2.46L Cr",
      sector: "Metals & Mining",
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3542.80,
      change: 245.60,
      changePercent: 7.45,
      volume: "865K",
      marketCap: "12.87L Cr",
      sector: "IT Services",
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      price: 1456.30,
      change: 89.75,
      changePercent: 6.57,
      volume: "1.8M",
      marketCap: "6.12L Cr",
      sector: "IT Services",
    },
    {
      symbol: "BAJFINANCE",
      name: "Bajaj Finance Limited",
      price: 6847.20,
      change: 387.90,
      changePercent: 6.00,
      volume: "425K",
      marketCap: "4.23L Cr",
      sector: "Financial Services",
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: 2847.65,
      change: 142.30,
      changePercent: 5.26,
      volume: "1.2M",
      marketCap: "19.23L Cr",
      sector: "Oil & Gas",
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      price: 1624.85,
      change: 67.25,
      changePercent: 4.32,
      volume: "2.1M",
      marketCap: "12.41L Cr",
      sector: "Banking",
    },
    {
      symbol: "WIPRO",
      name: "Wipro Limited",
      price: 445.80,
      change: 17.25,
      changePercent: 4.02,
      volume: "3.5M",
      marketCap: "2.45L Cr",
      sector: "IT Services",
    },
    {
      symbol: "LTI",
      name: "LTI Mindtree Limited",
      price: 4567.90,
      change: 165.30,
      changePercent: 3.75,
      volume: "156K",
      marketCap: "1.35L Cr",
      sector: "IT Services",
    },
  ];

  // Fix: Use prop or check location properly
  const isFullPageView = isFullPage || location.pathname === "/top-gainers";
  const displayedGainers = isFullPageView ? topGainers : topGainers.slice(0, 3);

  // Card view (compact)
  if (!isFullPageView) {
    return (
      <div>
        {showHeader && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-green-500">Top Gainers</h3>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-500 hover:bg-green-500/10"
            >
              <Link to="/top-gainers">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {displayedGainers.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-bold">{stock.symbol}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {stock.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{stock.price.toFixed(2)}</p>
                <div className="flex items-center space-x-1 text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-sm font-medium">
                    +{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Full page view (detailed) 
  return (
    <div className="min-h-screen bg-background">
       <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-green-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-bold">
                Top
                <span className="block bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Gainers
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover today's biggest winners in the stock market with real-time performance data
              </p>
            </motion.div>
          </div>
        </section>

        {/* Market Summary */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-green-500/10 border-green-500/20">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Average Gain</p>
                  <p className="text-3xl font-bold text-green-500">+6.84%</p>
                  <p className="text-sm text-muted-foreground">across top gainers</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">847M</p>
                  <div className="flex items-center space-x-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12.4%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Market Leaders</p>
                  <p className="text-2xl font-bold text-green-500">8</p>
                  <p className="text-sm text-muted-foreground">stocks above 6%</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Gainers List */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {displayedGainers.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-500 font-bold text-sm">
                          #{index + 1}
                        </div>
                        
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-lg">{stock.symbol}</h3>
                          <p className="text-muted-foreground text-sm">{stock.name}</p>
                          <Badge variant="secondary" className="mt-1">
                            {stock.sector}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <p className="text-2xl font-bold">${stock.price}</p>
                        <div className="flex items-center space-x-1 text-green-500">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium text-lg">
                            +{stock.change} (+{stock.changePercent}%)
                          </span>
                        </div>
                      </div>
                      
                      <div className="hidden md:block text-right space-y-1">
                        <p className="text-sm text-muted-foreground">Volume: {stock.volume}</p>
                        <p className="text-sm text-muted-foreground">Market Cap: {stock.marketCap}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button asChild variant="premium" size="sm">
                          <Link to={`/stock/${stock.symbol.toLowerCase()}`}>
                            Trade
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopGainer;
