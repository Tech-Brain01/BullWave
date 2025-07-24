import React, { useState, useContext, useEffect } from "react";
import Hero from "../components/PortfolioPage.jsx/Hero";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"; 
import { toast } from "react-toastify";

const Portfolio = () => {
  const { user } = useContext(AuthContext);
  const [portfolioData, setPortfolioData] = useState(null); 
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }
      try {
        // Fetch from the same dashboard endpoint
        const { data } = await axios.get(
          `http://localhost:3001/dashboard/${user.id}`,
          { withCredentials: true }
        );
        setPortfolioData(data.portfolio); // We only need the portfolio part here
      } catch (error) {
        toast.error("Could not load portfolio data.", { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, [user]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading Portfolio...</div>;
  }

  return <Hero user={user} portfolio={portfolioData} />;
};

export default Portfolio;