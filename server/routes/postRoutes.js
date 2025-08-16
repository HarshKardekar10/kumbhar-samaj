const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const { 
  getPosts, 
  createPost, 
  getPostById,
  updatePost,
  deletePost,
  uploadPostImage // Import the new function
} = require('../controllers/postController');

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `post-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// --- Define Routes ---

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Admin routes
router.post('/', protect, admin, createPost);
router.put('/:id', protect, admin, updatePost);
router.delete('/:id', protect, admin, deletePost);

// --- New route for post image upload ---
router.post('/upload', protect, admin, upload.single('postImage'), uploadPostImage);

module.exports = router;