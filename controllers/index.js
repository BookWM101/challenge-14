const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path as needed
const Post = require('../models/Post'); // Adjust path as needed

// Home route
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch posts from the database
    res.render('homepage', { 
      title: 'Home',
      posts: posts // Pass posts to the view
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Server Error');
  }
});

// Sign up route
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

// Handle sign up form submission
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/login'); // Redirect to login page after successful signup
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Handle login form submission
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    const user = await User.findOne({ username, password });
    if (user) {
      // You would set a session or token here
      res.redirect('/'); // Redirect to home page after successful login
    } else {
      res.status(401).send('Invalid credentials'); // Send an error if credentials are wrong
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server Error');
  }
});

// Route to display individual posts (if needed)
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.render('post', { title: post.title, post });
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Server Error');
  }
});

// Catch-all route for undefined routes
router.use((req, res) => {
  res.status(404).send('Page Not Found'); // Simple text response for undefined routes
});

module.exports = router;
