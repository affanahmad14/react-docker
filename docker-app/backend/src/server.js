import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import logger from './config/logger.js';
import { testDbConnection } from './db.js';
import notesRouter from './routes/notes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRouter);
app.use("/notes", notesRouter);

// Start server
app.listen(port, async () => {
  logger.info('Starting backend API...');
  logger.info('Database Configuration (received via ENV):', {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD ? '[REDACTED]' : 'N/A'
  });
  logger.info('-------------------------------------------');
  try {
    await testDbConnection();
    logger.info('Initial DB connection successful.');
  } catch (err) {
    logger.error('Initial DB connection failed. Exiting...');
    process.exit(1);
  }
  logger.info(`Server läuft auf http://localhost:${port}`);
});




