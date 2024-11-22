import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewArticle from './pages/NewArticle';
import Article from './pages/Article';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles/new" element={<NewArticle />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
