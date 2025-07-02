const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
require('dotenv').config();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/books', authMiddleware, bookRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
