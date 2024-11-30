import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

// ArticleCard component to display an individual article
const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            <Link to={`/article/${article._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{article.title}</h3>
                <p>{article.content.slice(0, 100)}...</p> {/* Display first 100 chars */}
                <p><strong>Author:</strong> {article.author ? article.author.name : 'Unknown'}</p>
            </Link>
        </div>
    );
};

export default ArticleCard;