const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Authorization required');
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error('Authorization required');
    error.status = 401;
    return next(error);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
