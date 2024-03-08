const jwt = require("jsonwebtoken")

 const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'jwtsecret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    console.log('User:', user.id);
    req.user = user;
    next();
  });
};
const verifyRole = (roles) => (req, res, next) => {
  verifyToken(req, res, () => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: 'You do not have permission to perform this action' });
    }
  });
};

module.exports =  {verifyToken,verifyRole};
