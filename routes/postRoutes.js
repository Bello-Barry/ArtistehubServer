const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/get-all', async (req, res) => {
  try {
    const posts = await Post.find().populate('posterId').populate('comments.commenterId');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/create', async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a post
router.post('/like', async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (post.likers.includes(req.body.userId)) {
      post.likers = post.likers.filter(id => id.toString() !== req.body.userId);
    } else {
      post.likers.push(req.body.userId);
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Comment on a post
router.post('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push(req.body);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
