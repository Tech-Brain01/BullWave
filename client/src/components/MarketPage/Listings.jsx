// client/src/components/MarketPage/Listings.jsx

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import TopGainer from "./TopGainer";
import TopLoser from "./TopLoser";
import Filter from "./Filter";
import { TrendingUp, TrendingDown, Star, BarChart3 } from "lucide-react";

const formatIndianNumber = (num) => {
    if (typeof num !== 'number' || !num) return 'N/A';
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
    if (num >= 1000) return (num / 1000).toFixed(2) + ' K';
    return num.toString();
};

const Listings = ({ allStocks, topGainers, topLosers, isConnected }) => {
  return (
    <main className="pt-24">
      <section className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">Stock <span className="block bg-gradient-financial bg-clip-text text-transparent">Market Hub</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Connection Status: <span className={isConnected ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>{isConnected ? ' Live' : ' Disconnected'}</span></p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
              <TopGainer gainers={topGainers} />
            </Card>
            <Card className="p-6 bg-gradient-to-br from-red-500/10 to-rose-600/10 border-red-500/20">
              <TopLoser losers={topLosers} />
            </Card>
          </div>
        </div>
      </section>

      <section>
        <Filter/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4">
            {allStocks && allStocks.length > 0 ? (
              allStocks.map((stock, index) => {
                const isPositive = (stock.change || 0) >= 0;
                return (
                  <motion.div key={stock.instrumentKey || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }}>
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">{stock.symbol ? stock.symbol.slice(0, 4) : 'NA'}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{stock.symbol || 'Loading...'}</h3>
                            <p className="text-muted-foreground text-sm">{stock.name || ''}</p>
                            <Badge variant="secondary" className="mt-1">{stock.sector || 'N/A'}</Badge>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-bold">₹{stock.ltp ? Number(stock.ltp).toFixed(2) : '0.00'}</p>
                          <div className={`flex items-center justify-end space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="font-medium">
                              {stock.change ? `${isPositive ? '+' : ''}${Number(stock.change).toFixed(2)}` : '0.00'}
                              ({stock.changePercent ? `${isPositive ? '+' : ''}${Number(stock.changePercent).toFixed(2)}%` : '0.00%'})
                            </span>
                          </div>
                        </div>
                        <div className="hidden md:block text-right space-y-1">
                          <p className="text-sm text-muted-foreground">Volume: {formatIndianNumber(stock.volume)}</p>
                          <p className="text-sm text-muted-foreground">Market Cap: {stock.marketCap || 'N/A'}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm"><Star className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm"><BarChart3 className="w-4 h-4" /></Button>
                          <Button asChild variant="premium" size="sm"><Link to={`/market/${stock.symbol?.toLowerCase()}`}>Trade</Link></Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-10">Awaiting live market data from the server...</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Listings;