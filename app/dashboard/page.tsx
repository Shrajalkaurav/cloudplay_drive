"use client";

import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
  
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome, {user?.email}!</p>
        </div>
    );
  };

  export default Dashboard;