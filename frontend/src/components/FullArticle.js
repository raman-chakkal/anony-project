import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FullArticle = () => {
    const { id } = useParams();  // Get article ID from URL
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
                setArticle(response.data);  // Set the article data from the response
                setLoading(false);  // Set loading to false once data is fetched
            } catch (err) {
                console.error('Error fetching article:', err);
                setLoading(false);  // Set loading to false even on error
            }
        };
        fetchArticle();
    }, [id]);  // Re-fetch article when the ID changes

    if (loading) return <p>Loading...</p>;  // Display loading message until article is fetched

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p><strong>Author:</strong> {article.author.name}</p>
        </div>
    );
};

export default FullArticle;
