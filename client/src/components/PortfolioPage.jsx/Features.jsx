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

const Features = ({ portfolio, hideValues = false }) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const holdings = portfolio?.holdings || [];
  
  // Mock allocations data - replace with real data from your API
  const allocations = [
    { category: "Technology", value: 35, amount: 175000 },
    { category: "Finance", value: 25, amount: 125000 },
    { category: "Healthcare", value: 20, amount: 100000 },
    { category: "Consumer", value: 15, amount: 75000 },
    { category: "Others", value: 5, amount: 25000 },
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
                  {holdings.length > 0 ? (
                    holdings.map((holding) => (
                      <tr
                        key={holding.tickerSymbol}
                        className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium">{holding.tickerSymbol}</p>
                            <p className="text-xs text-muted-foreground">
                              {holding.companyName}
                            </p>
                          </div>
                        </td>
                        <td className="text-right py-4 px-2 font-medium">
                          {holding.quantity}
                        </td>
                        <td className="text-right py-4 px-2">
                          {formatValue(holding.averageBuyPrice)}
                        </td>
                        <td className="text-right py-4 px-2">
                          {formatValue(holding.averageBuyPrice)}
                        </td>
                        <td className="text-right py-4 px-2 font-medium">
                          {formatValue(holding.quantity * holding.averageBuyPrice)}
                        </td>
                        <td
                          className={`text-right py-4 px-2 ${
                            holding.dayChange >= 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {formatPercent(0)}
                        </td>
                        <td
                          className={`text-right py-4 px-2 ${
                            holding.totalReturn >= 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {formatPercent(0)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-muted-foreground">
                        No holdings found. Start investing to see your portfolio here.
                      </td>
                    </tr>
                  )}
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
