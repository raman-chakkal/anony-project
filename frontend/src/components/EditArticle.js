import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!articleId) {
            setError("Article ID is not provided.");
            return;
        }

        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/articles/${articleId}`);
                const article = response.data;
                setUpdatedTitle(article.title);
                setUpdatedContent(article.content);
            } catch (err) {
                console.error("Error fetching article:", err);
                setError("Error fetching article data.");
            }
        };

        fetchArticle();
    }, [articleId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found. User might not be authenticated.");
            return;
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const articleData = {
            title: updatedTitle,
            content: updatedContent,
        };

        try {
            await axios.put(`http://localhost:5000/api/articles/${articleId}`, articleData, config);
            console.log("Article updated successfully");
            navigate('/dashboard/MyArticles'); // Redirect to the articles page after successful update
        } catch (error) {
            console.error("Error updating article:", error.response ? error.response.data : error.message);
            setError("Error updating article. Please try again later.");
        }
    };

    return (
        <div>
            <h1>Edit Article</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                </div>
                <button type="submit">Update Article</button>
            </form>
        </div>
    );
};

export default EditArticle;