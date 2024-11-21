const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");

dotenv.config();

// Initialize the express app
const app = express();

// Middleware setup
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable CORS for cross-origin requests

// Database connection
connectDB(); // Connect to MongoDB

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (login, register)
app.use("/api/articles", articleRoutes); // Article-related routes (create, read, update, delete)

// Set the server port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});