import mongoose from 'mongoose';

const connectDB = async (uri = process.env.MONGODB_URI) => {
  await mongoose.connect(uri);
  console.log('MongoDB connected successfully');
  return mongoose.connection;
};

export default connectDB;
