import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importing useNavigate and Link
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated }) => {
    const [query, setQuery] = useState(''); // Store search query
    const navigate = useNavigate();  // For navigation

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Navigate to search results page with query as a parameter
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <div className="navbar">
            <div className="logo">anony</div>
            <div className="search-container">
                <form onSubmit={handleSearch}>  {/* Wrap search input with form to handle submit */}
                    <input 
                        type="text" 
                        placeholder="Search articles..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} // Update the query state as user types
                    />
                    <button type="submit">Search</button>  {/* Button submits form */}
                </form>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/articles">Articles</Link>
                <Link to="/about">About</Link>
                {isAuthenticated ? (
                    <Link to="/dashboard">Dashboard</Link>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
