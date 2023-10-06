const jwt = require('jsonwebtoken');
// const cookies = require('cookie')
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.userId = decoded.userId; // Attach the user ID to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = verifyToken