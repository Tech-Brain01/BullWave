import React , { useContext, useState , useEffect } from "react";
import Hero from "../components/DahboardPage/Hero";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

   return (
    <>
      {userData ? <Hero user={userData} /> : <div>Loading Dashboard...</div>}
    </>
  );
};

export default Dashboard;
