import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  TrendingUp,
  IndianRupee,
  Target,
  Download,
  Settings,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Features from "./Features";
import Action from "./Action";

const Hero = ({ user, portfolio }) => {
  const [hideValues, setHideValues] = useState(false);

  // Calculate total portfolio value, day change, and total return
  const totalValue = useMemo(() => {
    return (
      portfolio?.holdings?.reduce((acc, holding) => {
        return acc + holding.quantity * holding.averageBuyPrice;
      }, 0) || 0
    );
  }, [portfolio]);

  // Placeholders for when you integrate a live API
  const dayChange = 0;
  const totalReturn = 0;

  const availableCash = portfolio?.cashBalance || user?.walletBalance || 0;

  // Helper functions for formatting (your code here is already perfect)
  const formatValue = (value) => {
    if (hideValues) return "₹ ******";
    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    })}`;
  };

  const formatPercent = (value) => {
    return hideValues ? "****" : `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Portfolio
                </h1>
                <p className="text-muted-foreground">
                  Manage your investments and track performance
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHideValues(!hideValues)}
                  className="text-xs"
                >
                  {hideValues ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </motion.div>

          {/* portfolio summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <IndianRupee className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(totalValue)}
                </p>
                <p className="text-sm text-success">{formatPercent(0)}</p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Day P&L</p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(dayChange)}
                </p>
                <p className="text-sm text-success">{formatPercent(0)}</p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Return
                </p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(totalReturn)}
                </p>
                <p className="text-sm text-success">{formatPercent(0)}</p>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <IndianRupee className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Cash
                </p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(availableCash)}
                </p>
                <p className="text-sm text-muted-foreground">Ready to invest</p>
              </div>
            </Card>
          </motion.div>

          <Features portfolio={portfolio} hideValues={hideValues} />
          <Action />
        </div>
      </div>
    </div>
  );
};

export default Hero;
