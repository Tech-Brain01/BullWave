import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  BarChart3,
  PieChart,
  Target,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Eye,
} from "lucide-react";

const Activities = () => {
  const recentActivities = [
    {
      action: "Buy",
      symbol: "RELIANCE",
      amount: "50 shares",
      time: "2 minutes ago",
      price: "₹2,847.50",
    },
    {
      action: "Sell",
      symbol: "TCS",
      amount: "25 shares",
      time: "15 minutes ago",
      price: "₹3,248.42",
    },
    {
      action: "Buy",
      symbol: "INFY",
      amount: "100 shares",
      time: "1 hour ago",
      price: "₹1,489.33",
    },
    {
      action: "Sell",
      symbol: "HDFCBANK",
      amount: "75 shares",
      time: "2 hours ago",
      price: "₹1,542.65",
    },
    {
      action: "Buy",
      symbol: "ITC",
      amount: "200 shares",
      time: "3 hours ago",
      price: "₹428.90",
    },
    {
      action: "Sell",
      symbol: "BHARTIARTL",
      amount: "40 shares",
      time: "4 hours ago",
      price: "₹1,156.80",
    },
  ];

  return (
    <>
      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant={activity.action === "Buy" ? "default" : "secondary"}
                    className={
                      activity.action === "Buy"
                        ? "bg-green-500/20 text-green-500 border-green-500/30"
                        : "bg-red-500/20 text-red-500 border-red-500/30"
                    }
                  >
                    {activity.action}
                  </Badge>
                  <div>
                    <p className="font-medium">{activity.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.amount}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.price}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <Button className="h-20 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Quick Trade</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 hover:bg-primary/10 transition-all duration-300">
          <div className="text-center">
            <PieChart className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Analyze Portfolio</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 hover:bg-primary/10 transition-all duration-300">
          <div className="text-center">
            <Wallet className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Manage Funds</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20 hover:bg-primary/10 transition-all duration-300">
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm">Social Trading</span>
          </div>
        </Button>
      </motion.div>
    </>
  );
};

export default Activities;
