const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Access Denied' }); // No token provided
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;
