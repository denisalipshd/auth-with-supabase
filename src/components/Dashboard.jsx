import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/signup");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 rounded-sm shadow-sm">
      <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-sm text-center space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600">Welcome to the dashboard! You are successfully signed in.</p>
      </div>
      <button
        onClick={handleSignOut}
        className="px-4 py-1.5 mt-4 rounded-sm bg-red-600 text-white hover:cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
