import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard'; // Import the ArticleCard component

const Articles = () => {
    const [articles, setArticles] = useState([]);  // State to store articles
    const [loading, setLoading] = useState(true);   // Loading state to show while fetching data
    const [error, setError] = useState(null);       // Error state to handle any errors

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/articles');
                setArticles(response.data);  // Set all articles in the state
            } catch (err) {
                setError('Error fetching articles'); // Set error message if the fetch fails
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);  // Set loading to false after the fetch is complete
            }
        };

        fetchArticles();
    }, []);  // Empty dependency array to run only once when component mounts

    // Show loading state while fetching data
    if (loading) {
        return <p>Loading articles...</p>;
    }

    // Show error message if there's an issue with fetching articles
    if (error) {
        return <p>{error}</p>;
    }

    // Render articles once they are fetched using ArticleCard
    return (
        <div>
            <h2>All Articles</h2>
            {articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                ))
            )}
        </div>
    );
};

export default Articles;
