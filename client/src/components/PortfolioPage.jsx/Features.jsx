import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tab";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Shuffle,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Features = ({ hideValues = false }) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const allocations = [
    {
      category: "Technology",
      value: 45.2,
      amount: 21845.23,
      color: "bg-primary",
    },
    {
      category: "Healthcare",
      value: 18.5,
      amount: 8933.89,
      color: "bg-success",
    },
    { category: "Finance", value: 15.3, amount: 7388.59, color: "bg-accent" },
    {
      category: "Consumer",
      value: 12.8,
      amount: 6181.31,
      color: "bg-secondary",
    },
    {
      category: "Energy",
      value: 8.2,
      amount: 3962.48,
      color: "bg-destructive",
    },
  ];

  const holdings = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      shares: 50,
      avgPrice: 2650.0,
      currentPrice: 2847.5,
      value: 142375.0,
      dayChange: 3.24,
      totalReturn: 7.45,
      allocation: 15.2,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      shares: 25,
      avgPrice: 3100.0,
      currentPrice: 3248.42,
      value: 81210.5,
      dayChange: 5.12,
      totalReturn: 4.79,
      allocation: 8.7,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      shares: 75,
      avgPrice: 1485.0,
      currentPrice: 1542.65,
      value: 115698.75,
      dayChange: -0.73,
      totalReturn: 3.88,
      allocation: 12.4,
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      shares: 100,
      avgPrice: 1420.0,
      currentPrice: 1489.33,
      value: 148933.0,
      dayChange: 1.89,
      totalReturn: 4.88,
      allocation: 15.9,
    },
    {
      symbol: "ITC",
      name: "ITC Limited",
      shares: 200,
      avgPrice: 405.5,
      currentPrice: 428.9,
      value: 85780.0,
      dayChange: 2.45,
      totalReturn: 5.77,
      allocation: 9.2,
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Limited",
      shares: 60,
      avgPrice: 1085.0,
      currentPrice: 1156.8,
      value: 69408.0,
      dayChange: 4.67,
      totalReturn: 6.62,
      allocation: 7.4,
    },
    {
      symbol: "WIPRO",
      name: "Wipro Limited",
      shares: 150,
      avgPrice: 385.0,
      currentPrice: 412.3,
      value: 61845.0,
      dayChange: 1.25,
      totalReturn: 7.09,
      allocation: 6.6,
    },
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd.",
      shares: 15,
      avgPrice: 9850.0,
      currentPrice: 10245.75,
      value: 153686.25,
      dayChange: 2.88,
      totalReturn: 4.02,
      allocation: 16.4,
    },
  ];

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
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-sm bg-card/50 backdrop-blur-sm">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings</TabsTrigger>
        <TabsTrigger value="allocation">Allocation</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-semibold mb-6">
                Portfolio Performance
              </h3>
              <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border border-border/20">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Performance Chart</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-semibold mb-6">Asset Allocation</h3>
              <div className="space-y-4">
                {allocations.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {allocation.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {allocation.value}%
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={allocation.value} className="flex-1" />
                      <span className="text-xs text-muted-foreground min-w-[80px] text-right">
                        {formatValue(allocation.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </TabsContent>

      <TabsContent value="holdings" className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Holdings</h3>

              {/* filter and add position buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Position
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Symbol
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Shares
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Avg Price
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Current
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Day Change
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Total Return
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium">{holding.symbol}</p>
                          <p className="text-xs text-muted-foreground">
                            {holding.name}
                          </p>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2 font-medium">
                        {holding.shares}
                      </td>
                      <td className="text-right py-4 px-2">
                        {formatValue(holding.avgPrice)}
                      </td>
                      <td className="text-right py-4 px-2">
                        {formatValue(holding.currentPrice)}
                      </td>
                      <td className="text-right py-4 px-2 font-medium">
                        {formatValue(holding.value)}
                      </td>
                      <td
                        className={`text-right py-4 px-2 ${
                          holding.dayChange >= 0
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {formatPercent(holding.dayChange)}
                      </td>
                      <td
                        className={`text-right py-4 px-2 ${
                          holding.totalReturn >= 0
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {formatPercent(holding.totalReturn)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </TabsContent>

      <TabsContent value="allocation" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-semibold mb-6">Sector Allocation</h3>
              <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border border-border/20">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Allocation Chart</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Rebalance Portfolio</h3>
                <Button size="sm">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Auto Rebalance
                </Button>
              </div>
              <div className="space-y-4">
                {allocations.map((allocation, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{allocation.category}</span>
                      <span className="text-sm text-muted-foreground">
                        Current: {allocation.value}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Target: 20%</span>
                        <span
                          className={
                            allocation.value > 20
                              ? "text-destructive"
                              : "text-success"
                          }
                        >
                          {allocation.value > 20 ? "Overweight" : "Underweight"}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(allocation.value, 100)}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Features;
