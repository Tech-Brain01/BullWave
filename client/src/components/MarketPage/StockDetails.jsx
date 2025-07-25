import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Star, Share, Plus, Minus } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useState } from "react";

const StockDetails = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('buy');

  // Mock Indian stock data - in real app, this would come from API
  const stock = {
    symbol: symbol?.toUpperCase() || "RELIANCE",
    name: "Reliance Industries Ltd.",
    price: 2847.65,
    change: 142.30,
    changePercent: 5.26,
    volume: "1.2M",
    marketCap: "19.23L Cr",
    sector: "Oil & Gas",
    description: "Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai. It has diverse business interests across energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles."
  };

  const totalValue = stock.price * quantity;

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stocks
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stock Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{stock.symbol}</h1>
                    <p className="text-lg text-muted-foreground">{stock.name}</p>
                    <Badge variant="secondary" className="mt-2">
                      {stock.sector}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-4xl font-bold">₹{stock.price.toFixed(2)}</p>
                    <div className={`flex items-center space-x-1 ${
                      stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                      <span className="text-xl font-medium">
                        {stock.change >= 0 ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-semibold">{stock.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-semibold">₹{stock.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">52W High</p>
                    <p className="font-semibold">₹3,024.50</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">52W Low</p>
                    <p className="font-semibold">₹2,220.30</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">About {stock.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stock.description}
                </p>
              </Card>
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Trade {stock.symbol}</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Order Type */}
                  <div className="flex space-x-2">
                    <Button 
                      variant={orderType === 'buy' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setOrderType('buy')}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant={orderType === 'sell' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setOrderType('sell')}
                    >
                      Sell
                    </Button>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center"
                        min="1"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="space-y-2">
                    <Label>Total Value</Label>
                    <div className="text-2xl font-bold">
                      ₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button 
                      className={`w-full ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                      size="lg"
                    >
                      {orderType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">P/E Ratio</span>
                    <span className="font-medium">15.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EPS</span>
                    <span className="font-medium">₹180.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dividend Yield</span>
                    <span className="font-medium">0.35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beta</span>
                    <span className="font-medium">1.15</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default StockDetails;