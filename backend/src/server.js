import express from 'express';
import mongoose from 'mongoose';
import opportunityRoutes from './routes/opportunities.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017/research_db');

// Mount routes
app.use('/api/opportunities', opportunityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));