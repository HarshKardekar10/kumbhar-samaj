const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// --- Import all necessary functions from the controller ---
const { 
  getPosts, 
  createPost, 
  getPostById // Make sure this is included
} = require('../controllers/postController');


// --- Define Routes ---

// Public route to get all posts
router.get('/', getPosts);

// Public route to get a single post by its ID
router.get('/:id', getPostById);

// Private route for admins to create a new post
router.post('/', protect, admin, createPost);


module.exports = router;