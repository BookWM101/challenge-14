// seeds/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('../models/Post'); // Adjust the path based on your structure
const User = require('../models/User'); // Adjust the path based on your structure

dotenv.config();

// Set the strictQuery option
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cms_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});

    // Seed data
    const users = await User.create([
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' }
    ]);

    // Create posts with correct field name
    const posts = await Post.create([
      { title: 'Post 1', content: 'Content for post 1', author: users[0]._id },
      { title: 'Post 2', content: 'Content for post 2', author: users[1]._id }
    ]);

    console.log('Data seeded successfully');

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
