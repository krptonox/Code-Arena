import mongoose from 'mongoose';
import dotenv from 'dotenv';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
