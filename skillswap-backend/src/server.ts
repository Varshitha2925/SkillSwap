import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import skillRoutes from './routes/skillRoutes';
import matchRoutes from './routes/matchRoutes';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/matches', matchRoutes);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
