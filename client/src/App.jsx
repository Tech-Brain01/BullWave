import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Transactions from './pages/Transactions'
import Wallet from './pages/Wallet'
import SignUp from './components/SignUp'
import SignIn from './components/signIn'
 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        
        
      </Routes>
      
    </Router>
  )
}

export default App
