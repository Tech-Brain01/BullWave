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
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `http://localhost:3001/dashboard/${user.id}`, // Use the new endpoint
          { withCredentials: true }
        );
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Could not load dashboard data.", { theme: 'dark' });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-white">Loading Dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="flex h-screen items-center justify-center text-white">Could not load dashboard data.</div>;
  }

  return <Hero user={user} data={dashboardData} />;
};

export default Dashboard;