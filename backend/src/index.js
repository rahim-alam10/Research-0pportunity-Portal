import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import './models/index.js';
import opportunityRoutes from './routes/opportunities.js';

const app = express();
app.use(cors());
app.use(express.json());


// Mount routes
app.use('/api/opportunities', opportunityRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const startServer = async () => {
	try {
		await connectDB(MONGODB_URI);
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error.message);
		process.exitCode = 1;
	}
};

startServer();