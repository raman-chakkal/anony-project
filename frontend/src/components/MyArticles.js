import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyArticleCard from './MyArticleCard';

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyArticles = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You are not authorized. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/my-articles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setArticles(response.data);
                } else {
                    setError('Failed to fetch articles. Please try again later.');
                }
            } catch (err) {
                setError('Error fetching articles. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, []);

    const handleEdit = (articleId) => {
        navigate(`/edit-article/${articleId}`);
    };

    const handleView = (articleId) => {
        navigate(`/article/${articleId}`);
    };

    const handleDelete = async (articleId) => {
        if (!window.confirm('Are you sure you want to delete this article?')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not authorized to delete this article. Please log in.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/articles/${articleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setArticles((prev) => prev.filter((article) => article._id !== articleId));
            } else {
                alert('Failed to delete the article. Please try again.');
            }
        } catch (err) {
            console.error('Error deleting article:', err);
            alert('Error deleting article. Please try again later.');
        }
    };

    if (loading) return <p>Loading your articles...</p>;

    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h2>My Articles</h2>
            {articles.length === 0 ? (
                <div>
                    <p>You have not posted any articles yet.</p>
                    <button onClick={() => navigate('/write-article')}>Write Your First Article</button>
                </div>
            ) : (
                articles.map((article) => (
                    <MyArticleCard
                        key={article._id}
                        article={article}
                        onEdit={() => handleEdit(article._id)}
                        onDelete={() => handleDelete(article._id)}
                        onView={() => handleView(article._id)}
                    />
                ))
            )}
        </div>
    );
};

export default MyArticles;
