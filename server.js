import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import handler from './api/contact.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = express();

// Standard middleware
app.use(cors());
app.use(express.json());

// Mount the serverless contact handler onto the Express /api/contact route
app.post('/api/contact', async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Local server error executing handler:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local API development server running on http://localhost:${PORT}`);
  console.log(`Configured destination contact email: ${process.env.CONTACT_EMAIL || 'strenovix@gmail.com'}`);
});
