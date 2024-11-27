import React, { useState } from 'react';

const ArticleForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Article Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ArticleForm;
