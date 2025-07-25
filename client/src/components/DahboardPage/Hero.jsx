import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  TrendingUp,
  IndianRupee,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Performance from "./Performance";
import Activities from "./Activities";

const Hero = ({ user , data }) => {
  const [timeframe, setTimeframe] = useState("24h");

// --- FIX: Calculate total value correctly using useMemo for performance ---
  const totalPortfolioValue = useMemo(() => {
    return data?.portfolio?.holdings?.reduce((acc, holding) => {
        return acc + (holding.quantity * holding.averageBuyPrice);
    }, 0) || 0;
  }, [data?.portfolio]);

  const activePositions = data?.portfolio?.holdings?.length || 0;

  const stats = [
    {
      title: "Total Portfolio Value",
      value: `₹${totalPortfolioValue.toLocaleString('en-IN')}`,
      change: "+0.0%", // You would calculate this based on more detailed data
      trend: "up",
      icon: IndianRupee,
      color: "text-success",
    },
    {
      title: "Active Positions",
      value: activePositions,
      change: "",
      trend: "up",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "P&L Today",
      value: "+₹0.00", // This requires real-time price change data
      change: "+0.0%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Win Rate",
      value: "N/A", // This would be a more complex calculation
      change: "",
      trend: "up",
      icon: Target,
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background  mt-12">
      <div className="pt-8 px-4  sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.username || 'Trader'}! Here's your trading overview.
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                {["24h", "7d", "30d", "90d"].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className="text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-danger" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p
                    className={`text-sm ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </Card>
            ))}
          </motion.div>

          <Performance portfolio={data?.portfolio} />
          <Activities transactions={data?.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
