const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Set up mongoose connection with strictQuery option
mongoose.set('strictQuery', false); // Adjust this setting based on your needs
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Set up session storage with MongoStore
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/yourDatabaseName',
        collectionName: 'sessions'
    })
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Ensure 'public' contains your CSS

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs.create({ /* options */ }).engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Define routes and middleware here
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

// Use appropriate route prefixes
app.use('/api', authRoutes); // Match the prefix used in your forms

app.use('/api/users', userRoutes);
app.use('/posts', postRoutes);

// Define specific routes
app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


