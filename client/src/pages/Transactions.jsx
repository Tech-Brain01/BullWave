import React, { useState, useContext, useEffect } from 'react';
import Hero from '../components/TransactionPage/Hero';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Transactions = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user || !user.id) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3001/api/transactions/${user.id}`, { withCredentials: true });
                setTransactions(res.data);
            } catch (error) {
                toast.error("Could not load transactions.", { theme: 'dark' });
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [user]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading Transactions...</div>;
    }

    // Pass the fetched transactions down to the Hero component
    return <Hero transactions={transactions} />;
};

export default Transactions;