const Article = require('../models/Article');
const User = require('../models/User'); // Assuming users are referenced by their IDs

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private
exports.createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = new Article({
            title,
            content,
            author: req.user.id, // Assuming the user is authenticated
        });

        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Failed to create article' });
    }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private
exports.updateArticle = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if the logged-in user is the author
        if (article.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this article' });
        }

        article.title = title || article.title;
        article.content = content || article.content;
        article.tags = tags || article.tags;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Failed to update article' });
    }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if the logged-in user is the author
        if (article.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this article' });
        }

        await article.remove();
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Failed to delete article' });
    }
};

// @desc    Fetch a single article by ID
// @route   GET /api/articles/:id
// @access  Public
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'name'); // Populate author name
        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });
    }
};


const mongoose = require('mongoose');

exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    console.log('Received article ID:', id); // Log the received ID

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid article ID format'); // Debug log
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(id).populate('author', 'name'); // Fetch the article
        if (!article) {
            console.log('Article not found'); // Debug log
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error); // Debug log
        res.status(500).json({ message: 'Failed to fetch article' });
    }
};
