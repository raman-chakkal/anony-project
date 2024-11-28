const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, editProfile, deleteUserAccount } = require('../controllers/authController');
const authenticateJWT = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get profile - Protected route
router.get('/profile', authenticateJWT, getProfile);  // Use getProfile controller function

// Edit profile - Protected route
router.put('/profile', authenticateJWT, editProfile);  // Use editProfile controller function

// Delete account - Protected route
router.delete('/profile', authenticateJWT, deleteUserAccount);  // Use deleteUserAccount controller function

module.exports = router;
