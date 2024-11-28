import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

// ArticleCard component to display an individual article
const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            <h3>
                <Link to={`/article/${article._id}`}>{article.title}</Link>
            </h3>
            <p>{article.content.slice(0, 100)}...</p> {/* Display first 100 chars */}
            <p><strong>Author:</strong> {article.author ? article.author.name : 'Unknown'}</p>
        </div>
    );
};

export default ArticleCard;
