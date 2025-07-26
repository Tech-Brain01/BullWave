import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Star, Share, Plus, Minus } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const StockDetails = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('buy');
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/market-data/${symbol.toUpperCase()}`);
        if(data.success) {
            setStock(data.data);
        }
      } catch (error) {
        console.error("Could not fetch stock details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();

    const handleStockUpdate = (liveTick) => {
      // The backend should emit the symbol with the tick for this to work
      if (liveTick.symbol && liveTick.symbol.toLowerCase() === symbol.toLowerCase()) {
        setStock(prevStock => ({ ...prevStock, ...liveTick }));
      }
    };

    socket.on('stockData', handleStockUpdate);

    return () => {
      socket.off('stockData', handleStockUpdate);
    };
  }, [symbol]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-24">Loading Stock Details...</div>;
  }

  if (!stock) {
    return <div className="min-h-screen flex items-center justify-center pt-24">Could not find data for {symbol.toUpperCase()}</div>;
  }

  const totalValue = (stock.ltp || 0) * quantity;
  const isPositive = (stock.change || 0) >= 0;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Market
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{stock.symbol}</h1>
                    <p className="text-lg text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold">₹{Number(stock.ltp).toFixed(2)}</p>
                    <div className={`flex items-center justify-end space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        <span className="text-xl font-medium">
                            {`${isPositive ? '+' : ''}₹${Math.abs(stock.change).toFixed(2)} (${isPositive ? '+' : ''}${Number(stock.changePercent).toFixed(2)}%)`}
                        </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Trade {stock.symbol}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button variant={orderType === 'buy' ? 'default' : 'outline'} className="flex-1" onClick={() => setOrderType('buy')}>Buy</Button>
                    <Button variant={orderType === 'sell' ? 'default' : 'outline'} className="flex-1" onClick={() => setOrderType('sell')}>Sell</Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></Button>
                        <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="text-center" min="1" />
                        <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}><Plus className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Total Value</Label>
                    <div className="text-2xl font-bold">
                        ₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                      <Button className={`w-full ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`} size="lg">
                          {orderType === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
                      </Button>
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