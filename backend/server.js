// server.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); 
dotenv.config();

connectDB();  // Connect to MongoDB

app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend from localhost:3000 only
    credentials: true 
}));
app.use(express.json());  // Middleware to parse JSON requests
app.use('/api', authRoutes);  // Authentication routes
app.use('/api', articleRoutes);  // Article routes

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
