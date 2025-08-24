// client/src/pages/Market.jsx

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Listings from '../components/MarketPage/Listings';

// const socket = io('http://localhost:3001');
const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

const Market = () => {
    const [marketData, setMarketData] = useState([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const updatedStocks = useRef(new Set()); 

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/market-data`);
                if (data.success) {
                    // This sets up our initial state with all necessary static data
                    setMarketData(data.data);
                }
            } catch (error) {
                console.error("Could not fetch EOD market data:", error);
            }
        };

        fetchInitialData();

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));

        // --- The New, Smarter State Updater ---
        socket.on('stockData', (liveTick) => {
            updatedStocks.current.add(liveTick.instrumentKey);

            setMarketData(currentData =>
                currentData.map(stock => {
                    if (stock.instrumentKey === liveTick.instrumentKey) {
                        // Merge the new live data with existing static data.
                        // Any fields in liveTick (ltp, change, volume) will overwrite the EOD data.
                        return { ...stock, ...liveTick };
                    }
                    return stock;
                })
            );

            // This timer removes the "updated" status after 1 second for the visual flash effect.
            setTimeout(() => {
                updatedStocks.current.delete(liveTick.instrumentKey);
            }, 1000);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('stockData');
        };
    }, []);


   const topGainers = [...marketData]
        .sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0))
        .slice(0, 5);

    const topLosers = [...marketData]
        .sort((a, b) => (a.changePercent || 0) - (b.changePercent || 0))
        .slice(0, 5);


     return (
        <Listings
            allStocks={marketData}
            topGainers={topGainers}
            topLosers={topLosers}
            isConnected={isConnected}
            updatedStocks={updatedStocks.current} 
        />
    );
};

export default Market;