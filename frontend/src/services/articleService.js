import axios from 'axios';

// Handle token-related errors
const handleTokenError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Token is invalid or expired. Redirecting to login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to the login page
    }
};

// Fetch all articles
export const getAllArticles = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/articles', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all articles:', error.response?.data || error.message);
        handleTokenError(error);
        throw error;
    }
};

// Fetch articles written by a specific user
export const getUserArticles = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/articles/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user articles:', error.response?.data || error.message);
        handleTokenError(error);
        throw error;
    }
};

// Fetch a single article by its ID
export const getArticleById = async (articleId) => {
    if (!articleId) {
        throw new Error('Article ID is required');
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/articles/${articleId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching article by ID:', error.response?.data || error.message);
        handleTokenError(error);
        throw error;
    }
};

// Create a new article
export const createArticle = async (article) => {
    try {
        const { data } = await axios.post(`http://localhost:5000/api/articles`, article, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data;
    } catch (error) {
        console.error('Error creating article:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to create article');
    }
};

// Update an article by ID
export const updateArticle = async (articleId, articleData) => {
    if (!articleId) {
        throw new Error('Article ID is required');
    }

    try {
        const response = await axios.put(`http://localhost:5000/api/articles/${articleId}`, articleData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating article:', error.response?.data || error.message);
        handleTokenError(error);
        throw error;
    }
};

// Delete an article by ID
export const deleteArticle = async (articleId) => {
    if (!articleId) {
        throw new Error('Article ID is required');
    }

    try {
        const response = await axios.delete(`http://localhost:5000/api/articles/${articleId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting article:', error.response?.data || error.message);
        handleTokenError(error);
        throw error;
    }
};
