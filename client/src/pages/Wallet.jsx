import React, { useContext, useState, useEffect } from 'react';
import Hero from '../components/WalletPage/Hero';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Wallet = () => {
  const { user } = useContext(AuthContext);
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user || !user.id) return;
      try {
        const { data } = await axios.get(`http://localhost:3001/dashboard/${user.id}`, { withCredentials: true });
        setWalletData(data);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      }
    };
    fetchWalletData();
  }, [user]);

  return (
    <>
      <Hero user={user} data={walletData} />
    </>
  );
};

export default Wallet;