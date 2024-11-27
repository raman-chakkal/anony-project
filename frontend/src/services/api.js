import axios from 'axios';

const BASE_URL = '/api';

// Utility function to set headers
const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// Fetch all articles (with optional search query)
export const getArticles = async (query = '') => {
    try {
        const { data } = await axios.get(`${BASE_URL}/articles?search=${query}`);
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch a single article by ID
export const getArticleById = async (id) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching article with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Create a new article
export const createArticle = async (article) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/articles`, article, {
            headers: getHeaders(),
        });
        return data;
    } catch (error) {
        console.error('Error creating article:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing article by ID
export const updateArticle = async (id, article) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/articles/${id}`, article, {
            headers: getHeaders(),
        });
        return data;
    } catch (error) {
        console.error(`Error updating article with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete an article by ID
export const deleteArticle = async (id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/articles/${id}`, {
            headers: getHeaders(),
        });
        return data;
    } catch (error) {
        console.error(`Error deleting article with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};