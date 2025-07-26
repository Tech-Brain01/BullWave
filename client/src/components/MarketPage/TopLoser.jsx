import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { TrendingDown, ArrowRight, Star, BarChart3 } from "lucide-react";

const TopLoser = ({ isFullPage = false, showHeader = true , losers = [] }) => {
  const location = useLocation();
  
  
    const isFullPageView = isFullPage || location.pathname === "/top-losers";
  const displayedLosers = isFullPageView ? losers : losers.slice(0, 3);


if (!isFullPageView) {
    return (
      <div>
        {showHeader && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-red-500">Top Losers</h3>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              <Link to="/top-losers">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {displayedLosers && displayedLosers.length > 0 ? (
            displayedLosers.map((stock, index) => (
              <motion.div
                key={stock.instrumentKey || stock.symbol}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {stock.symbol ? stock.symbol.slice(0, 4) : 'NA'}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{stock.symbol || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {stock.name || ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{stock.ltp ? stock.ltp.toFixed(2) : '0.00'}</p>
                  <div className="flex items-center space-x-1 text-red-500">
                    <TrendingDown className="w-3 h-3" />
                    <span className="text-sm font-medium">
                      {stock.changePercent ? stock.changePercent.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">Awaiting market data...</p>
          )}
        </div>
      </div>
    );
  }

  // Full page view (detailed)
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-red-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-bold">
                Top
                <span className="block bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                  Losers
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track today's biggest declines in the stock market with real-time performance data
              </p>
            </motion.div>
          </div>
        </section>

        {/* Market Summary */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-red-500/10 border-red-500/20">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Average Loss</p>
                  <p className="text-3xl font-bold text-red-500">-5.64%</p>
                  <p className="text-sm text-muted-foreground">across top losers</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">423M</p>
                  <div className="flex items-center space-x-1 text-red-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">-8.2%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Heavy Declines</p>
                  <p className="text-2xl font-bold text-red-500">8</p>
                  <p className="text-sm text-muted-foreground">stocks below -4%</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Losers List */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {displayedLosers.map((stock, index) => (
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
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-500 font-bold text-sm">
                          #{index + 1}
                        </div>
                        
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
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
                        <div className="flex items-center space-x-1 text-red-500">
                          <TrendingDown className="w-4 h-4" />
                          <span className="font-medium text-lg">
                            {stock.change} ({stock.changePercent}%)
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

export default TopLoser;