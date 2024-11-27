export const handleTokenError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Token is invalid or expired. Redirecting to login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to the login page
    }
};
