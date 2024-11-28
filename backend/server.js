const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

// Initialize dotenv for environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes
app.use('/api', authRoutes);
app.use('/api', articleRoutes);

// Define the server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
