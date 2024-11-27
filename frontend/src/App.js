// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import AuthContext
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import WriteArticle from './pages/WriteArticle';
import ArticleDetails from './pages/ArticleDetails';
import EditArticle from './pages/EditArticle';

const App = () => {
    const { isAuthenticated } = useContext(AuthContext); // Consume isAuthenticated

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetails />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/write-article"
                    element={isAuthenticated ? <WriteArticle /> : <Navigate to="/login" />}
                />
                <Route
                    path="/edit-article/:id"
                    element={isAuthenticated ? <EditArticle /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/register"
                    element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
