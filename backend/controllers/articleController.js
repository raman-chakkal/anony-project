const Article = require('../models/Article');
const mongoose = require('mongoose');

// Create a new article
const createArticle = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Get user ID from JWT token (from auth middleware)

    try {
        // Validation
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Create new article
        const newArticle = new Article({
            title,
            content,
            author: userId, // Associate article with the logged-in user
        });

        await newArticle.save(); // Save the article to the database
        res.status(201).json(newArticle); // Send the newly created article as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating article', error });
    }
};

// Get all articles for the global article page
const getAllArticles = async (req, res) => {
    try {
        // Fetch all articles that are not deleted
        const articles = await Article.find({ deleted: false }).populate('author', 'name');
        res.json(articles); // Return all articles
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

// Get articles for the logged-in user (for My Articles page)
const getUserArticles = async (req, res) => {
    try {
        // Fetch articles that belong to the logged-in user (filtered by user ID)
        const articles = await Article.find({ author: req.user.id, deleted: false }).populate('author', 'name');
        res.json(articles); // Return only the user's articles
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user articles', error });
    }
};

// Get a single article by its ID
const getArticleById = async (req, res) => {
    const { id } = req.params;

    // Validate that the ID is correct
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(id).populate('author', 'name');
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article); // Return the article if found
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching article', error });
    }
};

// Search for articles by title or content
const searchArticles = async (req, res) => {
    const { query } = req.query; // Get the search query

    try {
        // Ensure the query is provided
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Search articles in both title and content fields, ignoring case
        const articles = await Article.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }).populate('author', 'name'); // Populate the author's name field

        if (articles.length === 0) {
            return res.status(404).json({ message: `No articles found for "${query}"` });
        }

        // Return search results
        res.json(articles);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Error searching articles', error });
    }
};


// Edit an article
const editArticle = async (req, res) => {
    const { title, content } = req.body;
    const articleId = req.params.id;

    // Check if the article ID is valid
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(articleId);
        if (!article || article.deleted) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Ensure that only the author can edit the article
        if (article.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own articles' });
        }

        // Update article fields
        article.title = title || article.title;
        article.content = content || article.content;

        await article.save(); // Save the updated article
        res.json({ message: 'Article updated successfully', article });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating article', error });
    }
};

// Delete an article (Soft Delete)
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(id);
        if (!article || article.deleted) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Ensure that only the author can delete the article
        if (article.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own articles' });
        }

        // Soft delete the article
        article.deleted = true; // Mark the article as deleted
        await article.save();

        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Error deleting article', error: error.message });
    }
};

module.exports = { createArticle, getAllArticles, getUserArticles, getArticleById, searchArticles, editArticle, deleteArticle };