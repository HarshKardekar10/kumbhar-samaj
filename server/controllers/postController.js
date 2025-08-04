const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    // Get the most recent posts first
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private (Only admins should do this - we'll add admin role later)
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};