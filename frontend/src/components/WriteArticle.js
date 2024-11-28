import React, { useState } from 'react';
import axios from 'axios'; // Add axios import

const WriteArticle = ({ createArticle }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/api/articles', {
                title: formData.title, // Use formData for title and content
                content: formData.content,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            // Add the new article using the createArticle prop if needed in parent
            createArticle(response.data);  // Passing new article to parent component

            // Optionally, you could reset the form after submission
            setFormData({
                title: '',
                content: ''
            });

        } catch (err) {
            console.error('Error submitting article:', err);
        }
    };

    return (
        <div>
            <h2>Write Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Article</button>
            </form>
        </div>
    );
};

export default WriteArticle;