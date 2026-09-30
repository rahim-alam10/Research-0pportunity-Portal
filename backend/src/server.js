import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import opportunityRoutes from '../routes/opportunities.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
	res.status(200).json({
		success: true,
		database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
	});
});

// Mount routes
app.use('/api/opportunities', opportunityRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/research_db';

const startServer = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error.message);
		process.exitCode = 1;
	}
};

startServer();