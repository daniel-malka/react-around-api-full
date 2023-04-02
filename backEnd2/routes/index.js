const router = require('express').Router();
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');

router.use('/', userRouter);
router.use('/', cardRouter);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = { router };
