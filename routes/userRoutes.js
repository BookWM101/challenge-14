const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Dashboard (user's posts)
router.get('/', async (req, res) => {
  const posts = await Post.find({ user: req.session.userId });
  res.render('dashboard', { posts });
});

module.exports = router;
