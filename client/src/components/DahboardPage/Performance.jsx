import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import {
  TrendingUp,
  BarChart3,
  Star,
} from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Performance = ({ portfolio }) => {
  // --- Chart Data and Options ---
 const chartData = {
    labels: portfolio?.holdings?.map(stock => stock.tickerSymbol) || [],
    datasets: [
      {
        label: 'Value',
        data: portfolio?.holdings?.map(stock => stock.quantity * stock.averageBuyPrice) || [],
        backgroundColor: [
          '#3b82f6', // Blue-500
          '#22c55e', // Green-500
          '#f97316', // Orange-500
          '#8b5cf6', // Violet-500
          '#ef4444', // Red-500
          '#06b6d4', // Cyan-500
        ],
        borderColor: 'hsl(var(--card))',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#E5E7EB', // Tailwind's gray-200 for high visibility
          font: {
            size: 12,
            family: "inherit",
          },
          boxWidth: 15,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        // --- FINAL STYLE FIX: Explicitly set title color to white ---
        titleColor: '#FFFFFF', // This ensures the stock name is always bright white
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            let value = context.parsed;
            return `Value: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}`;
          }
        }
      }
    }
  };

  const topPerformers = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: "₹2,847.50",
      change: "+3.24%",
      trend: "up",
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: "₹3,248.42",
      change: "+5.12%",
      trend: "up",
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      price: "₹1,489.33",
      change: "+1.89%",
      trend: "up",
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      price: "₹1,542.65",
      change: "-0.73%",
      trend: "down",
    },
    {
      symbol: "ITC",
      name: "ITC Limited",
      price: "₹428.90",
      change: "+2.45%",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Portfolio Overview Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2"
      >
        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Portfolio Composition</h3>
          
              <Badge
                variant="outline"
                className="bg-success/10 text-success border-success/20"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
          
           <div className="h-64">
            {portfolio && portfolio.holdings && portfolio.holdings.length > 0 ? (
              <Pie data={chartData} options={chartOptions} />
            ) : (
               <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <BarChart3 className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                  <p>No holdings yet. Add stocks to see your portfolio composition.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* top performers */}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
          <h3 className="text-xl font-semibold mb-6">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((stock, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      {stock.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{stock.price}</p>
                  <p
                    className={`text-xs ${
                      stock.trend === "up" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Performance;
