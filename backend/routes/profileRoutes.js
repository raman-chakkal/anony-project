const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getUserProfile);
router.put('/', authMiddleware, updateUserProfile);

module.exports = router;