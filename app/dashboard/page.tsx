"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (user === null) return; 
      if (!user) {
        router.replace("/sign-in");
      } 
    }, [user, router]);
  
  
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome, {user?.email}!</p>
        </div>
    );
  };

  export default Dashboard;