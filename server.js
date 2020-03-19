const express = require('express');
const app = express();
const port = 3000;
const { Pool, Client } = require('pg');
const books = require('./controller/books');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setting up our database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore',
  password: 'postgres305',
  port: 5432,
});

// Serving static file in public directory
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

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
app.listen(port, () => console.log(`App listening on port ${port}!`));
