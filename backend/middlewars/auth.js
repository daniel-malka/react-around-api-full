const jwt = require('jsonwebtoken');
const error = require('../errors/Error');
const { JWT_SECRET = 'abrakadabra' } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new error(401, 'Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new error(401, 'Authorization required'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
