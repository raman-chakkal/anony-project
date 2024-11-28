const Article = require('../models/Article');

// Create a new article
const createArticle = async (req, res) => {
    const { title, content } = req.body;

    const article = new Article({
        title,
        content,
        author: req.user.id, // Get the user ID from JWT token
    });

    await article.save();
    res.status(201).json(article);
};

// Get all articles
const getArticles = async (req, res) => {
    const articles = await Article.find().populate('author', 'name');
    res.json(articles);
};

module.exports = { createArticle, getArticles };
