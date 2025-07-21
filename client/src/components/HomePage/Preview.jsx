import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee, DollarSign, BarChart3, PieChart, Activity } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";


const Preview = () => {
const marketData = [
  { 
    symbol: "RELIANCE", 
    price: "₹2,847.50", 
    change: "+2.34%", 
    isPositive: true,
    volume: "45.2M"
  },
  { 
    symbol: "TCS", 
    price: "₹3,248.42", 
    change: "-1.23%", 
    isPositive: false,
    volume: "67.8M"
  },
  { 
    symbol: "INFY", 
    price: "₹1,489.33", 
    change: "+5.67%", 
    isPositive: true,
    volume: "52.1M"
  },
  { 
    symbol: "HDFCBANK", 
    price: "₹1,542.65", 
    change: "+0.89%", 
    isPositive: true,
    volume: "38.7M"
  }
];

const portfolioStats = [
  { label: "Total Value", value: "₹12,75,456", icon: IndianRupee, change: "+12.5%" },
  { label: "Today's P&L", value: "+₹23,400", icon: TrendingUp, change: "+1.87%" },
  { label: "Active Positions", value: "23", icon: BarChart3, change: "+3" },
  { label: "Win Rate", value: "84.2%", icon: PieChart, change: "+2.1%" }
];
  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2  bg-emerald-500/10 rounded-full border border-success/20">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">Live Trading Dashboard</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            Professional Trading
            <span className="block bg-gradient-financial bg-clip-text text-transparent">
              Interface
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our premium trading interface with real-time data, advanced charting, 
            and intuitive portfolio management tools.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Data Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Live Market Data</h3>
            
            {marketData.map((stock, index) => (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-bold text-lg">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">Vol: {stock.volume}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-bold text-lg">{stock.price}</div>
                      <div className={`text-sm font-medium ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Chart Visualization Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="h-[400px] bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Portfolio Performance</h4>
                  <p className="text-sm text-muted-foreground">Interactive 3D charts coming soon</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Portfolio Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Portfolio Overview</h3>
            
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="font-bold text-xl text-white">{stat.value}</div>
                    </div>
                    <div className="text-sm font-medium text-green-500">
                      {stat.change}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 backdrop-blur-sm border-border/50">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                Ready to start trading with
                <span className="block bg-gradient-financial bg-clip-text text-transparent">
                  professional tools?
                </span>
              </h3>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of traders who trust Bullwave for their investment journey. 
                Experience zero-commission trading with advanced analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="premium" size="lg">
                  Start Trading Now
                </Button>
                <Button variant="outline" size="lg">
                  View Live Demo
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Preview;