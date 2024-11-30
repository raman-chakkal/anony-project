import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaFileAlt, FaPen, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
        { name: "My Articles", path: "/dashboard/my-articles", icon: <FaFileAlt /> },
        { name: "Write Article", path: "/dashboard/write-article", icon: <FaPen /> },
        { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
        { name: "Logout", path: "/login", icon: <FaSignOutAlt /> },
    ];

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} role="navigation">
            <button
                className="toggle-button"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? "☰" : "➔"}
            </button>
            <ul>
    {menuItems.map((item) =>
        item.name === "Logout" ? (
            <li key={item.name} className="sidebar-item">
                <button
                    onClick={handleLogout}
                    className="sidebar-link logout-button"
                    aria-label="Logout"
                >
                    {isCollapsed ? item.icon : <>{item.icon} {item.name}</>}
                </button>
            </li>
        ) : (
            <li key={item.name} className="sidebar-item">
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                    aria-label={`Go to ${item.name}`}
                >
                    {isCollapsed ? item.icon : <>{item.icon} {item.name}</>}
                </NavLink>
            </li>
        )
    )}
</ul>

        </div>
    );
};

export default Sidebar;
