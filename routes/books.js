const express = require('express');
const router = express.Router();
const { readJSON, writeJSON } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

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
