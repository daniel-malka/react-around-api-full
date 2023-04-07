const router = require('express').Router();
// const NotFoundError = require('../errors/NotFound-err');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

//module.exports = NotFoundError;

router.use((req, res, next) => {
  next(new NotFoundError('The requested resource was not found'));
});

module.exports = router;
