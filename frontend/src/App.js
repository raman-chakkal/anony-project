import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import SearchArticles from "./components/SearchArticles";
import FullArticle from "./components/FullArticle";
import EditArticle from "./components/EditArticle";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyArticles from "./components/MyArticles";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import WriteArticle from "./components/WriteArticle";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<FullArticle />} />
          <Route path="/search" element={<SearchArticles />} />
          <Route path="/edit-article/:articleId" element={<EditArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register login={login} />} />

          {/* Private Routes */}
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Child Routes */}
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-articles" element={<MyArticles />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
