import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import seedDatabase from './utils/seedData';
import quoteRoutes from './routes/quoteRoutes';
import projectRoutes from './routes/projectRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logger for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/projects', projectRoutes);

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Default route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to EnKoat Quote Vision API',
    version: '1.0.0',
  });
});

// Error handler for 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Initialize database and start server
const init = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed the database with initial data
    await seedDatabase();
    
    // Set PORT and start server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`Visit http://localhost:${PORT} to access the API`);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      console.log(`Error: ${err.message}`);
      // Close server & exit process
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

// Start the server
init();

export default app;