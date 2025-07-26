import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { TrendingUp, ArrowRight, Star, BarChart3 } from "lucide-react";

// Renamed prop to 'initialData' for clarity.
const TopGainer = ({ gainers = [] }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-500">Top 3 Gainers</h3>
      </div>

       <div className="space-y-4">
        {/* Check if the gainers array has data */}
        {Array.isArray(gainers) && gainers.length > 0 ? (
          gainers.map((stock, index) => (
            <motion.div
              key={stock.instrumentKey || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {stock.symbol ? stock.symbol.slice(0, 4) : 'NA'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate">{stock.symbol || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {stock.name || ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{Number(stock.ltp || 0).toFixed(2)}</p>
                <div className="flex items-center justify-end space-x-1 text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-sm font-medium">
                    +{Number(stock.changePercent || 0).toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // This message will show while the data is being fetched by the parent Market.jsx
          <p className="text-center text-muted-foreground py-4">Awaiting market data...</p>
        )}
      </div>
    </div>
  );
};
export default TopGainer;
