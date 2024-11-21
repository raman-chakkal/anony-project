const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  likeArticle,
  commentOnArticle,
} = require("../controllers/articleController");

const router = express.Router();

// Public Routes
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Protected Routes (require authentication)
router.post("/", authMiddleware, createArticle);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);
router.post("/:id/like", authMiddleware, likeArticle);
router.post("/:id/comment", authMiddleware, commentOnArticle);

module.exports = router;