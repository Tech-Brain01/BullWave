import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Transactions from './pages/Transactions'
import Wallet from './pages/Wallet'
import SignUp from './components/SignUp'
import SignIn from './components/signIn'
import Market from './pages/Market'
import StockDetails from './components/MarketPage/StockDetails'
import Stocks from './components/MarketPage/Stocks'
import TopGainer from './components/MarketPage/TopGainer'
import TopLoser from './components/MarketPage/TopLoser'
import ProtectedRoute from './components/ProtectedRoute';
 


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:symbol" element={<StockDetails />} />
        <Route path="/stocks" element={<Stocks />} />
       <Route path="/top-gainers" element={<TopGainer isFullPage={true} />} />
       <Route path="/top-losers" element={<TopLoser isFullPage={true} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>
      
      </Routes>
    
    </>
  )
}

export default App
