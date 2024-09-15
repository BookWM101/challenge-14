const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Create new post
router.post('/new', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    user: req.session.userId
  });

  await newPost.save();
  res.redirect('/dashboard');
});

// Get single post with comments
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user comments');
  res.render('post', { post });
});

// Add comment to post
router.post('/:id/comment', async (req, res) => {
  const { content } = req.body;
  const comment = new Comment({
    content,
    user: req.session.userId,
    post: req.params.id
  });

  await comment.save();
  res.redirect(`/post/${req.params.id}`);
});

module.exports = router;
