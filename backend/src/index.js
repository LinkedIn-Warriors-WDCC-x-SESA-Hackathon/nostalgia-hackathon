import express from 'express'
const app = express();
const PORT = process.env.PORT || 3000;

import lunchboxRouter from './routes/lunchbox.js'
import offerRouter from './routes/offer.js'

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/lunchboxes', lunchboxRouter)
app.use('/offers', offerRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
