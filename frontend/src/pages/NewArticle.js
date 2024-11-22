import React, { useState } from 'react';
import { createArticle } from '../services/articleService';

const NewArticle = () => {
  const [articleData, setArticleData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(articleData);
      alert('Article created successfully!');
    } catch (error) {
      console.error(error.message);
      alert('Error creating article');
    }
  };

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={articleData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={articleData.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Article</button>
    </form>
  );
};

export default NewArticle;
