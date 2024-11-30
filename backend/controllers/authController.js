const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Article = require('../models/Article'); // Ensure this import is present
const User = require('../models/User');


// Helper function for validating email format
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

// Helper function for validating password strength
const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user without manually hashing the password
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration', error });
    }
};



// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials: User not found' });
        }

        // Compare the entered password with the hashed password
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login', error });
    }
};

// Get user profile - Protected route
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // The user ID is stored in req.user by the JWT middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the profile data back
        res.json({
            name: user.name,
            email: user.email,
            // Add any additional fields here
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching profile', error: err.message });
    }
};

// Edit user
const editProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if the new email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.user.id) {
                return res.status(400).json({ message: 'Email is already in use by another user' });
            }
        }

        // Find user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's information
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save(); // Save the updated user

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};


// Delete user account
const deleteUserAccount = async (req, res) => {
    try {
        // Find the user by ID (from the JWT token)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Optionally, delete all articles associated with the user
        await Article.deleteMany({ author: req.user.id });

        // Delete the user account from the database
        await User.deleteOne({ _id: req.user.id }); // Use deleteOne instead of remove

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Error deleting account', error: error.message });
    }
};

module.exports = { registerUser, loginUser, editProfile, getProfile, deleteUserAccount };