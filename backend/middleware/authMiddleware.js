const { verifyToken } = require("../config/jwtConfig");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  const decoded = verifyToken(token, process.env.JWT_SECRET);
  if (!decoded) return res.status(401).json({ message: "Token is not valid" });

  req.user = decoded.user;
  next();
};

module.exports = authMiddleware;
