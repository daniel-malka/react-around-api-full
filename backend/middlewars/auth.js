const jwt = require('jsonwebtoken');
const ErrorHandler = require('../errors/Error');
const { JWT_SECRET = 'abrakadabra' } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorHandler(401, 'Authorization required'));
  }
  const token = authorization.replace('Bearer ', '');

  const payload = jwt.verify(token, JWT_SECRET);

  if (!payload) {
    next(new ErrorHandler(401, 'Authorization required'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
