import React from 'react';
import '../styles/ArticleCard.css';

const MyArticleCard = ({ article, onEdit, onDelete }) => {
    return (
        <div className="article-card">
            <h3 onClick={onEdit} style={{ cursor: 'pointer' }}>{article.title}</h3>
            <p>{article.previewContent}</p> {/* Adjust to show a preview */}
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default MyArticleCard;