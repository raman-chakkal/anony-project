import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();

    const handleViewArticle = () => {
        // Navigate to the article details page with the article ID
        navigate(`/articles/${article._id}`);
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{article.title}</h2>
            <p style={styles.content}>{article.content.slice(0, 100)}...</p> {/* Show truncated content */}
            <button style={styles.button} onClick={handleViewArticle}>
                Read More
            </button>
        </div>
    );
};

export default ArticleCard;

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '8px',
        color: '#333',
    },
    content: {
        fontSize: '1rem',
        marginBottom: '16px',
        color: '#555',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};
