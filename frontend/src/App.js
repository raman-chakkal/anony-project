import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Articles from './pages/Articles';
import SearchArticles from './components/SearchArticles';  // Import SearchArticles
import FullArticle from './components/FullArticle';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Manage authentication state

  const login = () => setIsAuthenticated(true);  // Set to true when the user logs in
  const logout = () => setIsAuthenticated(false);  // Set to false when the user logs out

  return (
      <Router>
          <div className="app-container">
              {/* Pass isAuthenticated prop to Navbar */}
              <Navbar isAuthenticated={isAuthenticated} logout={logout} />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/article/:id" element={<FullArticle />} />
                  <Route path="/search" element={<SearchArticles />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login login={login} />} />
                  <Route path="/register" element={<Register login={login} />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
