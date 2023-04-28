const router = require('express').Router();

// const {
//   validateAuthentication,
//   validateUserBody,
// } = require('../middlewars/validation');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const nonRoute = require('./nonRoute');
const auth = require('../middlewars/auth');
const {
  validateAuthentication,
  validateUserBody,
} = require('../middlewars/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateAuthentication, createUser);
router.post('/signin', validateUserBody, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', nonRoute);

module.exports = { router };
