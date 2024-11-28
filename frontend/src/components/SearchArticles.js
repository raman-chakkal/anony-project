import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  // For reading query parameters

const SearchArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [query, setQuery] = useState("");  // Store search query
    const location = useLocation();  // Hook to access the current location (URL)

    useEffect(() => {
        // Get the search query from the URL
        const queryParams = new URLSearchParams(location.search);
        const queryFromUrl = queryParams.get('query');

        if (queryFromUrl) {
            setQuery(queryFromUrl);  // Set query from URL into state
            const fetchArticles = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/search?query=${queryFromUrl}`);
                    setArticles(response.data);  // Set articles from search results
                    setLoading(false);  // Set loading to false once data is fetched
                } catch (err) {
                    console.error('Error fetching articles:', err);
                    setLoading(false);
                }
            };
            fetchArticles();
        }
    }, [location.search]);  // Re-run the effect when the query in the URL changes

    if (loading) return <p>Loading search results...</p>;

    return (
        <div>
            <h2>Search Results</h2>
            {articles.length === 0 ? (
                <p>No articles found for "{query}".</p>
            ) : (
                articles.map((article) => (
                    <div key={article._id}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p>Author: {article.author.name}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchArticles;
