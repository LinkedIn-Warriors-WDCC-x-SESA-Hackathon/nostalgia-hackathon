import express from 'express'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

import lunchboxRouter from './routes/lunchbox.js'
import offerRouter from './routes/offer.js'

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use('/lunchboxes', lunchboxRouter)
app.use('/offers', offerRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
