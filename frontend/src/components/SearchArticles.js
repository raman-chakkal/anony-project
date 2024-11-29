import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  // For reading query parameters
import ArticleCard from './ArticleCard' ;

const SearchArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');

        if (query) {
            const fetchArticles = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
                    setArticles(response.data);
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching articles:', err);
                    setLoading(false);
                }
            };
            fetchArticles();
        }
    }, [location.search]);

    if (loading) return <p>Loading search results...</p>;

    return (
        <div>
            <h2>Search Results for "{new URLSearchParams(location.search).get('query')}"</h2>
            {articles.length === 0 ? (
                <p>No articles found for "{new URLSearchParams(location.search).get('query')}".</p>
            ) : (
                articles.map((article) => (
                    <ArticleCard key={article._id} article={article} /> // Use ArticleCard for displaying articles
                ))
            )}
        </div>
    );
};

export default SearchArticles;