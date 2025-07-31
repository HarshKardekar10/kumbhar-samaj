const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware'); // To protect post creation

// Public route to get all posts
router.get('/', getPosts);

// Private route to create a post (we'll assume only logged-in users can for now)
router.post('/', protect, createPost);

module.exports = router;