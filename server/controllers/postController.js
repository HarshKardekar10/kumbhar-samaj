const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
exports.createPost = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  try {
    const newPost = await Post.create({ title, content, imageUrl });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const updatedPost = await post.update(req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error: error.message });
  }
};

// @desc    Upload a post image
// @route   POST /api/posts/upload
// @access  Private/Admin
exports.uploadPostImage = (req, res) => {
  if (req.file) {
    // Send back the public URL path to the uploaded file
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: 'Image uploaded successfully',
      filePath: filePath,
    });
  } else {
    res.status(400).json({ message: 'Please upload a file' });
  }
};