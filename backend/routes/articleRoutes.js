// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new article
router.post('/articles', authenticateJWT, articleController.createArticle);

// For global articles page, get all articles
router.get('/articles', articleController.getAllArticles);

// For My Articles page, get only articles for logged-in user
router.get('/my-articles', authenticateJWT, articleController.getUserArticles);

// Get a single article by its ID
router.get('/articles/:id', articleController.getArticleById);

// Search Articles
router.get('/search', articleController.searchArticles);

// Edit an existing article
router.put('/articles/:id', authenticateJWT, articleController.editArticle);

// Delete an article
router.delete('/articles/:id', authenticateJWT, articleController.deleteArticle);

module.exports = router;
