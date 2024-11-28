const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const { createArticle, getArticles } = require('../controllers/articleController');

// Protected routes with JWT authentication
router.post('/articles', authenticateJWT, createArticle);
router.get('/articles', getArticles);

module.exports = router;
