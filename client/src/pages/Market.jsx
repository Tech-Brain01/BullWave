// client/src/pages/Market.jsx

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Listings from '../components/MarketPage/Listings';

// Establish a persistent connection to your backend WebSocket
const socket = io('http://localhost:3001');

const Market = () => {
  // State to hold all live stock data received from the server
  const [marketData, setMarketData] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

   useEffect(() => {
    // --- STEP 1: Fetch End-of-Day data on initial load ---
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/market-data');
        if (data.success) {
          setMarketData(data.data); // Populate the page immediately
          console.log("Successfully fetched EOD data.");
        }
      } catch (error) {
        console.error("Could not fetch EOD market data:", error);
      }
    };

    fetchInitialData();

    // --- STEP 2: Listen for LIVE updates from the WebSocket ---
    socket.on('connect', () => {
      console.log('✅ Connected to backend WebSocket for live updates');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from backend WebSocket');
      setIsConnected(false);
    });

    socket.on('stockData', (liveTick) => {
      // This function will run for every live update during market hours
      setMarketData(currentData => {
        const stockIndex = currentData.findIndex(stock => stock.instrumentKey === liveTick.instrumentKey);
        
        if (stockIndex > -1) {
          // If stock exists, update its price and change
          const updatedData = [...currentData];
          updatedData[stockIndex] = { ...updatedData[stockIndex], ...liveTick };
          return updatedData;
        }
        // If the live tick is for a stock not in our initial list, you could add it here
        return currentData; 
      });
    });

     // Clean up connections when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('stockData');
    };
  }, []); // The empty array ensures this runs only once

  // --- Data Processing (no changes needed) ---
  const topGainers = [...marketData]
    .sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0))
    .slice(0, 5);

  const topLosers = [...marketData]
    .sort((a, b) => (a.changePercent || 0) - (b.changePercent || 0))
    .slice(0, 5);

  return (
    <>
      <Listings 
        allStocks={marketData} 
        topGainers={topGainers} 
        topLosers={topLosers} 
        isConnected={isConnected} 
      />
    </>
  );
};

export default Market;