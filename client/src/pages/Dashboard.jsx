import React , { useContext, useState , useEffect } from "react";
import Hero from "../components/DahboardPage/Hero";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchDashboardData = async () => {
      // Ensure we don't run this fetch if the user is not yet available
      if (!user || !user.id) {
          setLoading(false); // Stop loading if no user
          return;
      }

      try {
        console.log("Fetching dashboard data for user:", user.id);
        
        // Fetch all necessary data for the dashboard in parallel
        const portfolioPromise = axios.get(`http://localhost:3001/api/portfolio/${user.id}`, { withCredentials: true });
        const transactionsPromise = axios.get(`http://localhost:3001/api/transactions/${user.id}`, { withCredentials: true });

        const [portfolioRes, transactionsRes] = await Promise.all([portfolioPromise, transactionsPromise]);
        
        // Combine the fetched data into a single object
        setDashboardData({
          portfolio: portfolioRes.data,
          transactions: transactionsRes.data,
        });

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Could not load dashboard data.", { theme: 'dark' });
      } finally {
        // This will run regardless of success or failure
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]); // The effect depends on the user object


 // --- Render Logic ---

  // 1. Display a loading indicator while fetching data
  if (loading) {
    return <div className="flex h-screen items-center justify-center text-white">Loading Dashboard...</div>;
  }

  // 2. If not loading and there's no data, something went wrong or the user is new
  if (!dashboardData) {
    return <div className="flex h-screen items-center justify-center text-white">Could not load dashboard data or you have no activity yet.</div>;
  }
  
  // 3. Once data is successfully loaded, render the Hero component with the data
  return <Hero user={user} data={dashboardData} />;
};

export default Dashboard;
