const express = require('express');
const app = express();
const port = 3000;
const { Pool, Client } = require('pg');
const books = require('./controller/books');
const login = require('./controller/login');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Setting up our database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore',
  password: 'postgres305',
  port: 5432,
});

//session
app.use(
  session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

// Serving static file in public directory
app.use(express.static('public'));
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    next();
  }
};

app.get('/', (req, res, pool) => {
  // res.sendFile(path.join(__dirname + '/login.html'));
  res.redirect('/login');
});

app.get('/admin', (req, res, pool) => {
  if (req.session.loggedin) {
    res.sendFile(__dirname + '/public/admin.html');
  } else {
    res.redirect('/login');
    req.session.destroy();
  }
});

// middleware function to check for logged-in users

// ALL API for login
app.get('/login', [sessionChecker], (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.post('/login', (req, res) => {
  login.handleLoginPost(req, res, pool);
});

//  API for logout
app.get('/logout', (req, res) => {
  if (req.session.loggedin) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});
// All API for handling books
app.get('/api/books', (req, res) => {
  books.handleBooksGet(req, res, pool);
});

app.get('/api/books/:bookId', (req, res) => {
  books.handleBookGetById(req, res, pool, req.params.bookId);
});
app.post('/api/books', (req, res) => {
  books.handleBooksPost(req, res, pool);
});

app.put('/api/books', (req, res) => {
  books.handleBooksPut(req, res, pool);
});

app.delete('/api/books', (req, res) => {
  books.handleBooksDelete(req, res, pool);
});

// listening to port
app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${process.env.PORT}!`)
);
