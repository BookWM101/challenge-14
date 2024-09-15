// models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true, // The title is required
    trim: true // Remove any extra whitespace around the title
  },
  content: {
    type: String,
    required: true, // The content is required
    trim: true // Remove any extra whitespace around the content
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true // The author is required and must reference a User
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the current date and time
  }
});

// Create the Post model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
