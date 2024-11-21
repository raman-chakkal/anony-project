const Article = require("../models/Article");

// Create a new article
exports.createArticle = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = new Article({
      title,
      content,
      author: req.user.id, // The user ID is available in `req.user` from authMiddleware
    });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name").sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", "name");
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    // Check if the logged-in user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    article.title = title || article.title;
    article.content = content || article.content;

    await article.save();
    res.status(200).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    // Check if the logged-in user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await article.deleteOne();
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Like an article
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "You already liked this article" });
    }

    article.likes.push(req.user.id);
    await article.save();
    res.status(200).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Comment on an article
exports.commentOnArticle = async (req, res) => {
  const { text } = req.body;
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    const comment = {
      user: req.user.id,
      text,
    };

    article.comments.push(comment);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
