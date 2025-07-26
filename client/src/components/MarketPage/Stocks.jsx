import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { TrendingUp, TrendingDown, Star, BarChart3 } from "lucide-react";
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

const Stocks = () => {
  const [allStocks, setAllStocks] = useState([]);

  useEffect(() => {
    // Fetch initial data just like the Market page
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/market-data');
        if (data.success) {
          setAllStocks(data.data);
        }
      } catch (error) {
        console.error("Could not fetch EOD market data for Stocks page:", error);
      }
    };
    fetchInitialData();

    // Listen for live updates
    socket.on('stockData', (liveTick) => {
      setAllStocks(currentData =>
        currentData.map(stock => {
          if (stock.instrumentKey === liveTick.instrumentKey) {
            return { ...stock, ...liveTick };
          }
          return stock;
        })
      );
    });

    return () => {
      socket.off('stockData');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24">
        <section className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold">
                All Stocks
                <span className="block bg-gradient-financial bg-clip-text text-transparent">
                  Live Market
                </span>
            </h1>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {allStocks.map((stock, index) => (
                <motion.div
                  key={stock.instrumentKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-12 md:col-span-5 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                          <span className="text-primary-foreground font-bold text-sm">
                            {stock.symbol ? stock.symbol.slice(0, 4) : '...'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg truncate">{stock.symbol}</h3>
                          <p className="text-muted-foreground text-sm truncate">{stock.name}</p>
                        </div>
                      </div>
                      <div className="col-span-6 md:col-span-3 text-left md:text-center">
                        <p className="text-2xl font-bold">₹{Number(stock.ltp).toFixed(2)}</p>
                        <div className={`flex items-center justify-start md:justify-center space-x-1 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{Number(stock.changePercent).toFixed(2)}%</span>
                        </div>
                      </div>
                      <div className="col-span-6 md:col-span-2 hidden md:block text-center">
                        <p className="text-sm text-muted-foreground">Market Cap</p>
                        <p>{stock.marketCap}</p>
                      </div>
                      <div className="col-span-12 md:col-span-2 flex items-center justify-end space-x-2">
                        <Button asChild variant="premium">
                          <Link to={`/market/${stock.symbol.toLowerCase()}`}>
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

export default Stocks;