import React, { useState } from 'react';
import { createArticle } from '../services/articleService';
import { useNavigate } from 'react-router-dom';

const WriteArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !content) {
            setError('Both title and content are required.');
            return;
        }

        try {
            await createArticle({ title, content });
            setSuccess('Article created successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // Redirect after success
        } catch (error) {
            console.error('Failed to create article:', error);
            setError('Failed to create article. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Write a New Article</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article here..."
                        style={styles.textarea}
                        rows="10"
                    ></textarea>
                </div>
                <button type="submit" style={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default WriteArticle;

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        fontSize: '1rem',
        color: '#333',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        resize: 'vertical',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '0.9rem',
    },
    success: {
        color: 'green',
        textAlign: 'center',
        fontSize: '0.9rem',
    },
};
