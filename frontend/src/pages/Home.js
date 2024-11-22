import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map((article) => (
        <div key={article._id}>
          <h2>{article.title}</h2>
          <Link to={`/articles/${article._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
