const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');


// GET /books?genre=Fantasy&page=1&limit=5
router.get('/', async (req, res) => {
  const { genre, page = 1, limit = 10 } = req.query;
  let books = await readJSON('books.json');

  // Filter by genre (case-insensitive)
  if (genre) {
    books = books.filter(book =>
      book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedBooks = books.slice(startIndex, endIndex);

  res.json({
    total: books.length,
    page: parseInt(page),
    limit: parseInt(limit),
    results: paginatedBooks
  });
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  const books = await readJSON('books.json');
  const book = books.find(b => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ error: 'Book not found' });
});

// POST /books
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await readJSON('books.json');
  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id
  };
  books.push(newBook);
  await writeJSON('books.json', books);
  res.status(201).json(newBook);
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  const books = await readJSON('books.json');
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  if (books[index].userId !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });

  books[index] = { ...books[index], ...req.body };
  await writeJSON('books.json', books);
  res.json(books[index]);
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  let books = await readJSON('books.json');
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (book.userId !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });

  books = books.filter(b => b.id !== req.params.id);
  await writeJSON('books.json', books);
  res.status(204).send();
});

module.exports = router;
