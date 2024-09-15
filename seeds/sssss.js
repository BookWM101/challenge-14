const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cms_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedDatabase() {
  // ... Seed logic (same as provided earlier) ...
}

seedDatabase();
