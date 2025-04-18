import mongoose from 'mongoose';

// Connection function for MongoDB
const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    // Get MongoDB URI from environment variables or use a default for development
    const mongoURI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/enkoat-quote-vision';
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export default connectDB;