

import { motion } from "framer-motion";
import { Search, Filter, TrendingUp, TrendingDown, Star, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";

const Stocks = () => {
  const stocks = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: 2847.65,
      change: 142.3,
      changePercent: 5.26,
      volume: "1.2M",
      marketCap: "19.23L Cr",
      sector: "Oil & Gas"
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3542.8,
      change: -45.6,
      changePercent: -1.26,
      volume: "865K",
      marketCap: "12.87L Cr",
      sector: "IT Services"
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      price: 1624.85,
      change: 67.25,
      changePercent: 4.32,
      volume: "2.1M",
      marketCap: "12.41L Cr",
      sector: "Banking"
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      price: 1456.3,
      change: 23.45,
      changePercent: 1.64,
      volume: "1.8M",
      marketCap: "6.12L Cr",
      sector: "IT Services"
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Limited",
      price: 1089.75,
      change: -15.2,
      changePercent: -1.38,
      volume: "3.2M",
      marketCap: "7.65L Cr",
      sector: "Banking"
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Limited",
      price: 1186.4,
      change: 28.9,
      changePercent: 2.5,
      volume: "1.5M",
      marketCap: "6.78L Cr",
      sector: "Telecommunications"
    },
    {
      symbol: "ITC",
      name: "ITC Limited",
      price: 456.75,
      change: -8.25,
      changePercent: -1.77,
      volume: "4.2M",
      marketCap: "5.68L Cr",
      sector: "FMCG"
    },
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever Ltd.",
      price: 2634.9,
      change: 42.15,
      changePercent: 1.62,
      volume: "890K",
      marketCap: "6.18L Cr",
      sector: "FMCG"
    }
  ];

  const sectors = [
    "All Sectors", 
    "Banking", 
    "IT Services", 
    "Oil & Gas", 
    "Telecommunications", 
    "FMCG", 
    "Pharmaceuticals",
    "Automobiles",
    "Metals & Mining"
  ];

  return (
    <div className="min-h-screen bg-background">
     
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-bold">
                Stock
                <span className="block bg-gradient-financial bg-clip-text text-transparent">
                  Market
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover and track thousands of Indian stocks with real-time data and advanced analytics
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Search stocks..." 
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-background/50">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="market-cap">
                    <SelectTrigger className="w-40 bg-background/50">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market-cap">Market Cap</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="change">Daily Change</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Market Overview */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-2xl font-bold">₹285.2L Cr</p>
                  <div className="flex items-center space-x-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+1.24%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">32M</p>
                  <div className="flex items-center space-x-1 text-red-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm">-0.45%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Gainers</p>
                  <p className="text-2xl font-bold text-green-500">1,247</p>
                  <p className="text-sm text-muted-foreground">stocks up today</p>
                </div>
              </Card>
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Losers</p>
                  <p className="text-2xl font-bold text-red-500">892</p>
                  <p className="text-sm text-muted-foreground">stocks down today</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stocks List */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {stocks.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Stock info - Fixed width */}
                      <div className="col-span-5 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-foreground font-bold text-sm">
                            {stock.symbol.slice(0, 2)}
                          </span>
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg truncate">{stock.symbol}</h3>
                          <p className="text-muted-foreground text-sm truncate">{stock.name}</p>
                          <Badge variant="secondary" className="mt-1">
                            {stock.sector}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Price and change - Fixed alignment */}
                      <div className="col-span-3 text-center">
                        <p className="text-2xl font-bold">₹{stock.price.toFixed(2)}</p>
                        <div className={`flex items-center justify-center space-x-1 ${
                          stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {stock.change >= 0 ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                      
                      {/* Volume and Market Cap - Fixed alignment */}
                      <div className="col-span-2 hidden md:block text-center">
                        <p className="text-sm text-muted-foreground">Volume: {stock.volume}</p>
                        <p className="text-sm text-muted-foreground">Market Cap: ₹{stock.marketCap}</p>
                      </div>
                      
                      {/* Action buttons - Fixed alignment */}
                      <div className="col-span-2 flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                         <Button asChild variant="premium">
                          <Link to={`/market/${stock.symbol.toLowerCase()}`}>
                            Trade
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/market">View Top Gainers</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/market">View Top Losers</Link>
              </Button>
              <Button variant="outline" size="lg">
                Load More Stocks
              </Button>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
};

export default Stocks;