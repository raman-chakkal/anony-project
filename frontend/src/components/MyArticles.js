import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import MyArticleCard from './MyArticleCard'; // Import the new MyArticleCard component

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                const response = await axios.get('http://localhost:5000/api/my-articles', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                });
                setArticles(response.data);
            } catch (err) {
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false); // Ensure loading is set to false in both success and error cases
            }
        };

        fetchMyArticles();
    }, []);

    const handleEdit = (articleId) => {
        navigate(`/edit-article/${articleId}`); // Use navigate instead of history.push
    };

    const handleDelete = async (articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await axios.delete(`http://localhost:5000/api/articles/${articleId}`); // Adjust the endpoint as needed
                setArticles(articles.filter(article => article._id !== articleId)); // Remove the deleted article from state
            } catch (err) {
                console.error('Error deleting article:', err);
            }
        }
    };

    if (loading) return <p>Loading your articles...</p>;

    return (
        <div>
            <h2>My Articles</h2>
            {articles.length === 0 ? (
                <p>You have not posted any articles yet.</p>
            ) : (
                articles.map((article) => (
                    <MyArticleCard 
                        key={article._id} 
                        article={article} 
                        onEdit={() => handleEdit(article._id)} 
                        onDelete={() => handleDelete(article._id)} 
                    />
                ))
            )}
        </div>
    );
};

export default MyArticles;