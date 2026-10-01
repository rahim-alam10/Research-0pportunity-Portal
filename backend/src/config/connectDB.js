import mongoose from 'mongoose';

const connectDB = async (uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/research_db') => {
  await mongoose.connect(uri);
  console.log('MongoDB connected successfully');
  return mongoose.connection;
};

export default connectDB;
