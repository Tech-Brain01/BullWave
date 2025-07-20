import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tab";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Download,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  IndianRupee,
  DollarSign,
  BarChart3,
  Eye,
} from "lucide-react";

const Section = ({ searchQuery = "" }) => {
  const [selectedTab, setSelectedTab] = useState("all");

  const transactions = [
    {
      id: "TXN-001",
      type: "buy",
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      quantity: 50,
      price: 2847.65,
      total: 142382.5,
      timestamp: "2024-01-18T10:30:00Z",
      status: "completed",
      fees: 25.5,
    },
    {
      id: "TXN-002",
      type: "sell",
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd.",
      quantity: 30,
      price: 3542.8,
      total: 106284.0,
      timestamp: "2024-01-18T09:45:00Z",
      status: "completed",
      fees: 21.25,
    },
    {
      id: "TXN-003",
      type: "buy",
      symbol: "INFY",
      name: "Infosys Ltd.",
      quantity: 100,
      price: 1456.3,
      total: 145630.0,
      timestamp: "2024-01-17T14:22:00Z",
      status: "pending",
      fees: 29.15,
    },
    {
      id: "TXN-004",
      type: "dividend",
      symbol: "HDFC",
      name: "HDFC Bank Ltd.",
      quantity: 200,
      price: 15.5,
      total: 3100.0,
      timestamp: "2024-01-15T08:00:00Z",
      status: "completed",
      fees: 0,
    },
    {
      id: "TXN-005",
      type: "sell",
      symbol: "ADANI",
      name: "Adani Enterprises Ltd.",
      quantity: 40,
      price: 2156.75,
      total: 86270.0,
      timestamp: "2024-01-14T11:15:00Z",
      status: "failed",
      fees: 17.25,
    },
    {
      id: "TXN-006",
      type: "buy",
      symbol: "BAJAJ",
      name: "Bajaj Finance Ltd.",
      quantity: 25,
      price: 6847.2,
      total: 171180.0,
      timestamp: "2024-01-12T13:45:00Z",
      status: "completed",
      fees: 34.25,
    },
  ];

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
      value: "₹14,28,470",
      change: "+8.3%",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Fees Paid",
      value: "₹2,478",
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: "bg-green-500/20 text-green-500 border-green-500/20",
      pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
      failed: "bg-red-500/20 text-red-500 border-red-500/20"
    };
    
    return (
      <Badge variant="outline" className={variants[status] || "bg-gray-500/20 text-gray-500 border-gray-500/20"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "buy":
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "sell":
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      case "dividend":
        return <IndianRupee className="w-4 h-4 text-blue-500" />;
      case "transfer":
        return <RefreshCw className="w-4 h-4 text-purple-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-gray-500" />;
    }
  };


  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "all" || transaction.type === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="buy">Buys</TabsTrigger>
          <TabsTrigger value="sell">Sells</TabsTrigger>
          <TabsTrigger value="dividend">Dividends</TabsTrigger>
          <TabsTrigger value="transfer">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedTab} className="mt-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Transaction History</h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      ID
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Symbol
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Quantity
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Fees
                    </th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-2">
                        <span className="font-mono text-xs text-muted-foreground">{transaction.id}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(transaction.type)}
                          <span className="capitalize text-sm">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium">{transaction.symbol}</p>
                          <p className="text-xs text-muted-foreground">{transaction.name}</p>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2 font-medium">
                        {transaction.quantity.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-2">
                        ₹{transaction.price.toFixed(2)}
                      </td>
                      <td className="text-right py-4 px-2 font-medium">
                        ₹{transaction.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-right py-4 px-2 text-muted-foreground">
                        ₹{transaction.fees.toFixed(2)}
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(transaction.status)}
                          {getStatusBadge(transaction.status)}
                        </div>
                      </td>
                      <td className="text-right py-4 px-2 text-sm text-muted-foreground">
                        {format(new Date(transaction.timestamp), "MMM dd, HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Section;
