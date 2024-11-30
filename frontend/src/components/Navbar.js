import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            alert('Please enter a search term.');
            return;
        }
        navigate(`/search?query=${query.trim()}`);
    };

    return (
        <div className="navbar">
            <Link to="/" className="logo" aria-label="Home">
                Anony
            </Link>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search articles"
                />
                <button type="submit" aria-label="Submit search">Search</button>
            </form>
            <div className="nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    aria-label="Go to Home"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/articles"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    aria-label="View Articles"
                >
                    Articles
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    aria-label="Learn About Us"
                >
                    About
                </NavLink>
                {isAuthenticated ? (
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        aria-label="Go to Dashboard"
                    >
                        Dashboard
                    </NavLink>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            aria-label="Login"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            aria-label="Register"
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
