import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>by {article.author}</p>
      <p>{article.summary}</p>
      <div className="likes">
        <span>👍 {article.likes}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
