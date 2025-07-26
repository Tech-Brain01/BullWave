// client/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Transactions from './pages/Transactions';
import Wallet from './pages/Wallet';
import SignUp from './components/SignUp';
import SignIn from './components/signIn';
import Market from './pages/Market';
import ProtectedRoute from './components/ProtectedRoute';
import Stocks from './components/MarketPage/Stocks';
import StockDetails from './components/MarketPage/StockDetails';
import TopGainer from './components/MarketPage/TopGainer';
import TopLoser from './components/MarketPage/TopLoser';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/market" element={<Market />} />
        
        {/* --- FIXED: Added Routes for Stocks and Stock Details --- */}
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/market/:symbol" element={<StockDetails />} />
        <Route path="/top-gainers" element={<TopGainer isFullPage={true} />} />
        <Route path="/top-losers" element={<TopLoser isFullPage={true} />} />

        {/* --- Protected Routes --- */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;