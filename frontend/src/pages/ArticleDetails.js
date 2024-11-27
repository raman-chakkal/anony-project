import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/articleService';

const ArticleDetails = () => {
    const { id } = useParams(); // Extract article ID from the route
    const [article, setArticle] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Article ID:', id); // Log the received ID
        const fetchArticle = async () => {
            try {
                const article = await getArticleById(id);
                console.log('Fetched article:', article); // Log the response
                setArticle(article);
            } catch (error) {
                console.error('Error fetching article:', error);
                setError('Failed to load the article. Please try again later.');
            }
        };
        fetchArticle();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!article) {
        return <p>Loading article...</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{article.title}</h1>
            <p style={styles.content}>{article.content}</p>
            <p style={styles.author}>
                <strong>Author:</strong> {article.author?.name || 'Unknown'}
            </p>
        </div>
    );
};

export default ArticleDetails;

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '16px',
        color: '#333',
    },
    content: {
        fontSize: '1.2rem',
        marginBottom: '16px',
        color: '#555',
    },
    author: {
        fontSize: '1rem',
        marginTop: '16px',
        color: '#777',
    },
};
