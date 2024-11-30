import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar /> {/* Sidebar is persistent */}
      <div className="dashboard-content">
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
};

export default Dashboard;
