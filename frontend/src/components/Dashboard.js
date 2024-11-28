import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import MyArticles from '../components/MyArticles';
import WriteArticle from '../components/WriteArticle';
import Settings from '../components/Settings';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');  // State for active tab
    const [user, setUser] = useState(null);  // User state to hold user data
    const [articles, setArticles] = useState([]);  // State to hold articles
    const [isAuthenticated, setIsAuthenticated] = useState(true);  // Authentication state
    const navigate = useNavigate();  // To handle navigation

    // Fetch user data when the component mounts
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUser(response.data);  // Set user data in state
        } catch (err) {
            console.error('Error fetching user data:', err);
            setIsAuthenticated(false);  // If there's an error, set authentication to false
            localStorage.removeItem('token');  // Remove the token in case of invalid session
            navigate('/login');  // Redirect to login page
        }
    };

    // Fetch articles if user is authenticated
    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/articles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setArticles(response.data);  // Set articles data in state
        } catch (err) {
            console.error('Error fetching articles:', err);
        }
    };

    useEffect(() => {
        // Fetch user data when the component mounts
        fetchUserData();
    }, []);  // Empty dependency array to run only once when the component mounts

    useEffect(() => {
        // Fetch articles if user is authenticated
        if (isAuthenticated && user) {
            fetchArticles();
        }
    }, [isAuthenticated, user]);  // Re-fetch articles if authentication or user data changes

    const updateUser = (updatedUser) => {
        setUser(updatedUser);  // Update user state when profile is updated
    };

    const createArticle = (newArticle) => {
        setArticles([...articles, { ...newArticle, id: articles.length + 1 }]);  // Add new article to the state
    };

    const deleteArticle = (id) => {
        setArticles(articles.filter(article => article.id !== id));  // Remove deleted article from the state
    };

    const deleteAccount = async () => {
        try {
            await axios.delete('http://localhost:5000/api/delete-account', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setIsAuthenticated(false);  // Set authentication to false after account is deleted
            localStorage.removeItem('token');  // Remove token from localStorage
            alert('Account deleted successfully!');
            navigate('/login');  // Redirect to login page after account deletion
        } catch (err) {
            console.error('Error deleting account:', err);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);  // Clear the authentication state
        localStorage.removeItem('token');  // Remove the token from localStorage
        navigate('/login');  // Redirect to login page
    };

    if (!user) {
        return <p>Loading user data...</p>;  // Show loading message while user data is being fetched
    }

    return (
        <div className="dashboard">
            <div className="dashboard-body">
                <Sidebar setActiveTab={setActiveTab} logout={logout} />  {/* Sidebar with logout */}
                <div className="main-content">
                    {activeTab === 'profile' && <Profile user={user} updateUser={updateUser} />}
                    {activeTab === 'myArticles' && <MyArticles articles={articles} deleteArticle={deleteArticle} />}
                    {activeTab === 'writeArticle' && <WriteArticle createArticle={createArticle} />}
                    {activeTab === 'settings' && <Settings deleteAccount={deleteAccount} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;