const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach the decoded user info to the request object
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;