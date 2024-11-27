import React, { useState, useEffect } from 'react';
import { getAllArticles } from '../services/articleService';
import ArticleCard from '../components/ArticleCard';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getAllArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error('Failed to fetch articles:', error);
                setError('Failed to load articles. Please try again later.');
            }
        };
        fetchArticles();
    }, []);

    return (
        <div>
            <h1>All Articles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {articles.length > 0 ? (
                articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                ))
            ) : (
                !error && <p>No articles available at the moment.</p>
            )}
        </div>
    );
};

export default Articles;
