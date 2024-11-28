const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach user to request object
        req.user = user;
        next();  // Continue to the next middleware or route handler
    });
};

module.exports = authenticateJWT;
