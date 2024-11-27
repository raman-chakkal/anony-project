const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Enforce a minimum password length
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
