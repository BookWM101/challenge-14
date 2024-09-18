const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send('Invalid credentials');
    }

    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    req.session.userId = newUser._id;
    res.redirect('/login'); // Redirect to login page after signup
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
