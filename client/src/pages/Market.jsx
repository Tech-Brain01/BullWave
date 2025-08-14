import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Listings from '../components/MarketPage/Listings';
import TopGainer from '../components/MarketPage/TopGainer';
import TopLoser from '../components/MarketPage/TopLoser';
import Stocks from '../components/MarketPage/Stocks';
import Filter from '../components/MarketPage/Filter';
import axios from 'axios';

// Establish a connection to your backend server's WebSocket
const socket = io('http://localhost:3001');

const Market = () => {
    const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Fetch the initial list of market data via a standard API call
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/market-data');
                if (response.data.success) {
                    // Add a 'name' property to each stock for display
                    const initialStocks = response.data.data.map(stock => ({
                        ...stock,
                        // You would fetch the name from your instruments.json or another source
                        // For now, we'll just use the symbol as a placeholder
                        name: stock.symbol 
                    }));
                    setStocks(initialStocks);
                }
            } catch (error) {
                console.error("🔴 Error fetching initial market data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();

        // 2. Listen for live 'stockData' updates from the WebSocket
        socket.on('stockData', (liveData) => {
            // The liveData object from the server looks like:
            // { instrumentKey: '...', ltpc: { ltp: 123.45, ... } }
            
            setStocks(prevStocks => 
                prevStocks.map(stock => {
                    if (stock.instrumentKey === liveData.instrumentKey && liveData.ltpc) {
                        console.log(`✅ Live update for ${stock.symbol}: ${liveData.ltpc.ltp}`);
                        // Return a new object with the updated price
                        return { ...stock, ltp: liveData.ltpc.ltp };
                    }
                    return stock; // Return the unchanged stock
                })
            );
        });

        // 3. Clean up the connection when the component unmounts
        return () => {
            socket.off('stockData');
        };
    }, []); // The empty dependency array ensures this runs only once on mount

    if (isLoading) {
        return <div className="text-center p-10">Loading market data...</div>;
    }

    return (
        <div className="w-full h-full p-4 md:p-8 space-y-8">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Listings />
                </div>
                <div className="space-y-8">
                    <TopGainer />
                    <TopLoser />
                </div>
            </div>
            <div className="space-y-4">
                <Filter />
                {/* Pass the live stocks data to the Stocks component */}
                <Stocks stocks={stocks} />
            </div>
        </div>
    );
};

export default Market;