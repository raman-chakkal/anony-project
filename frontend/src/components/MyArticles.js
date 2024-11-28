import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyArticles = () => {
    const [articles, setArticles] = useState([]);   // State to hold articles
    const [loading, setLoading] = useState(true);    // Loading state for fetching data
    const [error, setError] = useState(null);        // Error state for any issues during fetching

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-articles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,  // JWT token stored in localStorage
                    },
                });
                setArticles(response.data);  // Set the fetched articles
            } catch (err) {
                console.error('Error fetching user articles:', err);
                setError('Failed to load articles. Please try again later.'); // Set error message
            } finally {
                setLoading(false);  // Stop the loading spinner once the request is completed
            }
        };

        fetchUserArticles();
    }, []);  // Empty dependency array, will only run once on component mount

    // Show a loading indicator while fetching data
    if (loading) {
        return <p>Loading articles...</p>;
    }

    // Show error message if there's an error
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>My Articles</h2>
            {articles.length === 0 ? (
                <p>No articles found.</p>  // If no articles are found
            ) : (
                articles.map((article) => (
                    <div key={article._id}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        {/* You can add edit and delete buttons here */}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyArticles;
