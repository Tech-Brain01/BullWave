import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import SearchBar from './SearchBar'
import {
  Filter,
  Download,
  TrendingDown,
  CheckCircle,
  IndianRupee,
  BarChart3,
} from "lucide-react";
import Section from "./Section";
import Action from "./Action";

const Hero = () => {
  const stats = [
    {
      title: "Total Transactions",
      value: "1,247",
      change: "+23",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      title: "Total Volume",
      value: "₹142,847",
      change: "+8.3%",
      icon: IndianRupee,
      color: "text-success",
    },
    {
      title: "Fees Paid",
      value: "₹247.80",
      change: "-12%",
      icon: TrendingDown,
      color: "text-accent",
    },
    {
      title: "Success Rate",
      value: "98.2%",
      change: "+0.5%",
      icon: CheckCircle,
      color: "text-success",
    },
  ];

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
                  Transactions
                </h1>
                <p className="text-muted-foreground">
                  Track all your trading activity and transaction history
                </p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-success">{stat.change}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          <SearchBar />
          
          <Section />

          <Action />
        </div>
      </div>
    </div>
  );
};

export default Hero;
