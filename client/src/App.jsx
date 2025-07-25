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
import ProtectedRoute from './components/ProtectedRoute'; // Import the component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/market" element={<Market />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wallet" 
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          } 
        />

        
      </Routes>
    </>
  );
}

export default App;