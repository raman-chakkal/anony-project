import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/articleService';  // Implement this service to fetch articles

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <div>
        {articles.map((article) => (
          <div key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;