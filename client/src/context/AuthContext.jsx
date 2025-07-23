// client/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.token) {
        try {
          const { data } = await axios.post(
            'http://localhost:3001/', 
            {},
            { withCredentials: true }
          );
          if (data.status) {
            // FIX: Set the user state with the full user object from the backend
            setUser(data.user); 
            setIsAuthenticated(true);
          } else {
            removeCookie('token');
          }
        } catch (error) {
          console.log("Verification error:", error);
          removeCookie('token');
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, [cookies, removeCookie]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};