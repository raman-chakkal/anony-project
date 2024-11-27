import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api'; // Change if your backend runs on a different URL

/**
 * Register a new user
 * @param {Object} userData - User data (name, email, password)
 * @returns {Object} - The registered user's details and token
 */
export const register = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        throw error.response?.data || new Error('Registration failed');
    }
};

/**
 * Log in a user
 * @param {Object} credentials - User credentials (email, password)
 * @returns {Object} - The logged-in user's details and token
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
        const { user, token } = response.data;

        if (user && token) {
            saveAuthData(user, token); // Save to localStorage
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error.response?.data || new Error('Login failed');
    }
};

/**
 * Log out the user by clearing localStorage
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Get the stored token from localStorage
 * @returns {string|null} - The authentication token
 */
export const getToken = () => localStorage.getItem('token');

/**
 * Get the logged-in user from localStorage
 * @returns {Object|null} - The user object
 */
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Save user and token to localStorage
 * @param {Object} user - User details
 * @param {string} token - Authentication token
 */
export const saveAuthData = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

/**
 * Fetch the current user's profile
 * @returns {Object} - The user's profile details
 */
export const getProfile = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to fetch profile');
    }
};

/**
 * Update the current user's profile
 * @param {Object} profileData - Updated profile data (e.g., name, bio)
 * @returns {Object} - The updated profile details
 */
export const updateProfile = async (profileData) => {
    try {
        const response = await axios.put(`${BASE_URL}/profile`, profileData, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to update profile');
    }
};
