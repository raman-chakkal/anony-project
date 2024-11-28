const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI; // Ensure MONGODB_URI is defined in your .env file

        if (!mongoURI) {
            console.error("MongoDB URI not found in environment variables!");
            return;
        }

        // Remove deprecated options
        await mongoose.connect(mongoURI);

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
