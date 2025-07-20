import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  Wallet as WalletIcon,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Bell,
  IndianRupee,
} from "lucide-react";
import Section from "./Section";

const Hero = () => {
  const [hideBalances, setHideBalances] = useState(false);

  const walletStats = {
    totalBalance: 52847.83,
    availableBalance: 12847.23,
    investedAmount: 35420.6,
    pendingTransfers: 4580.0,
    monthlyGain: 3247.5,
    monthlyGainPercent: 6.8,
  };

  const formatValue = (value) => {
    if (hideBalances) return "₹ ******";
    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    })}`;
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
                  Wallet
                </h1>
                <p className="text-muted-foreground">
                  Manage your funds, transfers, and payment methods
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setHideBalances(!hideBalances)}
                >
                  {hideBalances ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Balance Overview */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <WalletIcon className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Balance{" "}
                </p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(walletStats.totalBalance)}
                </p>
                <p className="text-sm text-success">
                  +
                  {hideBalances
                    ? "****"
                    : `₹${walletStats.monthlyGain.toLocaleString()}`}
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <IndianRupee className="w-5 h-5 text-success" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Cash
                </p>
                <p className="text-2xl font-bold mb-1">
                  {formatValue(walletStats.availableBalance)}
                </p>
                <p className="text-sm text-muted-foreground">Ready to invest</p>
              </div>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
                <p className="text-2xl font-bold mb-1">{formatValue(walletStats.investedAmount)}</p>
                <p className="text-sm text-success">
                  +{hideBalances ? "••••%" : `${walletStats.monthlyGainPercent}%`}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <RefreshCw className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Transfers</p>
                <p className="text-2xl font-bold mb-1">{formatValue(walletStats.pendingTransfers)}</p>
                <p className="text-sm text-muted-foreground">Processing</p>
              </div>
            </Card>
          </motion.div>

          <Section hideBalances={hideBalances} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
