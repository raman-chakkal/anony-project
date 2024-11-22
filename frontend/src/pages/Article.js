import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../services/articleService';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default Article;
