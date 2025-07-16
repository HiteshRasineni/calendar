const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
}

module.exports = authenticateToken;

