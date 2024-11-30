import React from 'react';
import '../styles/ArticleCard.css';

const MyArticleCard = ({ article, onEdit, onDelete, onView }) => {
    return (
        <div className="article-card" onClick={onView} style={{ cursor: 'pointer' }}>
            <h3>{article.title}</h3>
            <p>{article.previewContent}</p> {/* Adjust to show a preview */}
            <button onClick={(e) => { e.stopPropagation(); onEdit(); }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
        </div>
    );
};

export default MyArticleCard;