const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate the user (pseudo code)
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key', { expiresIn: '7d' });

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    });
};