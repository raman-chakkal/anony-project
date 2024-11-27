import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle } from '../services/articleService';

const EditArticle = () => {
    const { articleId } = useParams(); // Retrieve article ID from the URL
    const navigate = useNavigate(); // To redirect after successful update
    const [article, setArticle] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the article details when the component mounts
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const fetchedArticle = await getArticleById(articleId);
                setArticle(fetchedArticle);
            } catch (err) {
                console.error('Error fetching article:', err.message);
                setError('Failed to load the article. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle(articleId, { title: article.title, content: article.content });
            alert('Article updated successfully!');
            navigate(`/articles/${articleId}`); // Redirect to the article details page
        } catch (err) {
            console.error('Error updating article:', err.message);
            setError('Failed to update the article. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading article...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            <h1>Edit Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Article</button>
            </form>
        </div>
    );
};

export default EditArticle;
