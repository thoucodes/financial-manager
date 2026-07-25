import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authroutes from './routes/authroutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import authMiddleware from './middleware/authmiddleware.js';
import transactionroutes from './routes/transactionroutes.js';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))

.catch((err) => console.error('MongoDB Error:', err));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Financial Management API',
    success: true
  });
});

app.use('/api/auth', authroutes);
app.use('/api/transactions', transactionroutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});