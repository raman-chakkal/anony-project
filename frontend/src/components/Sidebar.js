import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ setActiveTab, logout }) => {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => setActiveTab('profile')}>Profile</li>
                <li onClick={() => setActiveTab('myArticles')}>My Articles</li>
                <li onClick={() => setActiveTab('writeArticle')}>Write Article</li>
                <li onClick={() => setActiveTab('settings')}>Settings</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;

